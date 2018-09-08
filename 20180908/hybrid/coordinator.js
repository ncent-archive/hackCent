const TelegramBot = require('node-telegram-bot-api');
const TOKEN = require('./secret');
const CHAT_ID = -1001318821764;
const bot = new TelegramBot(TOKEN, {polling: true});

class Player {
  constructor(ref) {
    this.ref = ref; // player object or id
    this.points = 0;
    this.submission = {};
  }

  addSubmission(submission) {
    this.submission = submission;
  }

  addPoints(points) {
    this.points += points;
  }
}

async function isAdmin(authorId) {
  const sender = await bot.getChatMember(CHAT_ID, authorId);
  const status = sender.status
  return (status === 'creator' || status === 'administrator');
}

class Coordinator {
  constructor(coordinatorOpt) {
    this.options = coordinatorOpt; // stores steps data, reward amount, etc.
    // Store reward amount from options
    this.players = {}; // id -> player
    this.submissions = {}; // id -> submission
    this.playerSubmissions = {}; // joins table between player and submissions
    this.active_steps = [];
    this.active_poll_id = 0;
  }

  // renderPoll(pollOpt) {
  //   // renders poll of options
  //   /*
  //     var option = {
  //                   "parse_mode": "Markdown",
  //                   "reply_markup":
  //                 };
  //     bot.sendMessage(msg.chat.id, "*Some* message here.", option);
  //   */
  //   const replyMarkup = { "keyboard": [["Yes"],["No"]] };
  //   const text = "Do you want to answer my question?";
  //   bot.sendMessage(CHAT_ID, text, {
  //                                     "parse_mode": 'Markdown',
  //                                     "reply_markup": replyMarkup
  //                                   })
  //   .then((msg)=>{
  //     this.active_poll_id = msg.message_id;
  //   });
  // }

  // schedulePoll(timeFromNow, pollOpt) {
  //   setTimeout(()=>{
  //     this.renderPoll(pollOpt);
  //   }, timeFromNow);
  // }

  updatePointsOfReferralChain(player) {
    let currentPlayer = player;
    while (player.ref !== -1) {
      // do some point action
      currentPlayer = this.players[currentPlayer.ref];
    }
  }

  onSubmittedResponse(response) {
    // this is already verified as a response to one of the active_steps
  }

  requestSubmissions(submissionDetails) {
    const title = submissionDetails['title'];
    this.active_steps.push(title);
    // TODO change submissionRequestText to correct param
    bot.sendMessage(CHAT_ID, submissionDetails['submissionRequestText']);
  }

  endSubmissions(submissionDetails) {
    const title = submissionDetails['title'];
    const index = this.active_steps.indexOf(title);
    this.active_steps.splice(index, 1);
    bot.sendMessage(CHAT_ID, `We have completed accepting submissions for ${title}`)
  }

  scheduleRequestForSubmissions(timeFromNow, requestOpt) {
    setTimeout(()=>{
      this.requestSubmissions(requestOpt);
      setTimeout(()=>{
        this.endSubmissions(requestOpt);
      }, 6000);
    }, timeFromNow);
  }

  onMemberAdded(msg) {
    if (msg.from.id === msg.new_chat_members[0].id) {// Player joined without invite
      const plr = new Player(-1);
      const id = msg.from.id;
      this.players[id] = plr;
    } else {
      const referrer = msg.from.id;
      for (let i = 0; i < msg.new_chat_members.length; i++) {
        const plr = new Player(referrer);
        const id = msg.new_chat_members[i].id;
        this.players[id] = plr;
      }
    }
  }

  hookMessage() {
    bot.on('message', (msg)=>{
      console.log(msg);
      if ('new_chat_members' in msg) {
        this.onMemberAdded(msg);
      } else if ('text' in msg) {
        for (let i = 0; i < this.active_steps.length; i++) {
          const title = this.active_steps[i];
          if (msg.text[0] === '#' && (msg.substr(1, title.length) === title)) {
            this.onSubmittedResponse(msg);
          }
        }
        if (isAdmin(msg.from.id)) {
          if (msg.text.slice(0, 14) == '/choose_winner') {
            const username = msg.text.slice(15);

          }
        }
        // POLL CODE
        // if ('reply_to_message' in msg && ) {
        //   bot.sendMessage(CHAT_ID, 'thanks');
        //   // check if message is a reply to the poll
        // }
      }
    });
  }

  beginProject() {
    this.hookMessage();
    // schedules all request for submissions
    // schedule polls
  }
}


const coord = new Coordinator({});
coord.renderPoll();
coord.beginProject();
