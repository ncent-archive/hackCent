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

class Coordinator {
  constructor() {
    // in-memory tracking of referrals
    // in memory tracking of json
    //
    // stores all players in a hash with id -> player
    // state that stores current step and votes
  }

  renderPoll() {
    // renders poll of options
  }

  schedulePoll() {

  }

  updateReferralChain(player) {
    // updates referral chain of players leading up to
  }

  storeSubmittedResponse() {

  }

  requestSubmissions() {

  }

  scheduleRequestForSubmissions() {

  }
  
  memberAdded() {
    // track
    // invoke updateReferralChain on player
  }


}
