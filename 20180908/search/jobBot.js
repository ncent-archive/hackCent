const TelegramBot = require('node-telegram-bot-api');
const nCentSDK = require('ncent-sandbox-sdk');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  const user = msg.from.username
  const is_ask = txt.toString().toLowerCase().includes('can i have')
  const includes_jobcents = txt.toString().toLowerCase().includes('jobcents')
  is_ask_of_payment = is_ask && includes_jobcents
  if (is_ask_of_payment) {
    const numbers = txt.match(/\d+/g).map(Number);
    bot.sendMessage(chatId, 'Sure, ' + user +  ' sending you ' + numbers + ' jobcents')
  } else {
    bot.sendMessage(chatId, `Hello and Welcome ` + user);
    bot.sendMessage(chatId, `Remember to phrase your requests for tokens as follows 'Can I have x jobcents where x is the number of tokens`);
  } 
}); 
