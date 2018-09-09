const TelegramBot = require('node-telegram-bot-api');
const nCentSDK = require('ncent-sandbox-sdk');
sdk = new nCentSDK();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//may want to store the private key locally in future use
const generate_key_pair = () => {
  return sdk.createWalletAddress()
}

let current_address = null

const sendInitialDialogue = (user, chatId) => {
  bot.sendMessage(chatId, `Hello and Welcome ` + user);
  bot.sendMessage(chatId, `- To create a new Wallet say 'new wallet'`);
  bot.sendMessage(chatId, `- To view an account say 'use x' where x is the public address`)
  bot.sendMessage(chatId, `- To view token balances say 'view balances'`)
  bot.sendMessage(chatId, `- To add jobcent tokens to your account say 'Can I have x jobcents' where x is the number of tokens (REQUIRES ADDRESS BEING SET)`);
  // bot.sendMessage(chatId, `- To transfer your jobcent tokens to another account say 'Transfer x jobcents to y' where x is the number of tokens and y is the address you want to send to(REQUIRES ADDRESS BEING SET)`);
}

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  const user = msg.from.username

  const is_ask = txt.toString().toLowerCase().includes('can i have')
  const includes_jobcent = txt.toString().toLowerCase().includes('jobcent')
  const wants_new_wallet = txt.toString().toLowerCase() === 'new wallet'
  const wants_to_view_balances = txt.toString().toLowerCase() === 'view balances'
  const should_use_wallet = txt.toString().includes('use G')
  const is_ask_of_payment = is_ask && includes_jobcent

  if (current_address && is_ask_of_payment) {
    const numbers = txt.match(/\d+/g).map(Number);
    bot.sendMessage(chatId, 'Sure, sending ' + numbers + ' jobcents')
    new Promise(function(resolve, reject) {
      return sdk.stampToken(current_address, 'jeffjobCents' + Math.random().toString(), numbers[0], '2021', resolve, reject)
    })
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })
  } else if (wants_new_wallet) {
    const wallet = generate_key_pair()
    bot.sendMessage(chatId, 'Sure, your new wallet address is ' + wallet.publicKey()  + ' make sure not to lose it :)')
    current_address = wallet.publicKey()
  } else if (current_address && wants_to_view_balances) {
    new Promise(function(resolve, reject) {
      sdk.getAllBalances(current_address, resolve, reject)
    })
    .then((result) => {
      const balances = result.data
      balances.forEach(balance => {
        bot.sendMessage(chatId, 'You have ' + balance.balance + ' of ' + balance.uuid)
      })
    })
    .catch((err) => {
      console.log('error', err)
    })

  } else if (should_use_wallet) {
    current_address = txt.slice(4)
    bot.sendMessage(chatId, 'Using address ' + current_address)
  } else {
    sendInitialDialogue(user, chatId)
  } 
}); 