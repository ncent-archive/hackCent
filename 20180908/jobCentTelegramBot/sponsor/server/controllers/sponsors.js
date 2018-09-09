const Sponsor = require("../models").Sponsor;
const nCentSDK = require("ncent-sandbox-sdk");
const nCentSDKInstance = new nCentSDK();

module.exports = {
  create(req, res) {
    let companyName = req.body.company_name;
    let tokenName = req.body.token_name;
    let role = req.body.role;
    let description = req.body.description;
    let link = req.body.link;
    let contact = req.body.contact;
    let rewards = req.body.rewards;
    let numTokens = req.body.num_tokens;
    let expDate = Date.now() + 300000;

    new Promise(function(resolve, reject) {
      nCentSDKInstance.stampToken(
        companyName,
        tokenName,
        numTokens,
        expDate,
        resolve,
        reject
      );
    })
      // .then(response => {
      //   res.status(200).send(response.data);
      // })
      .then(response => {
        console.log("creating sponsor..");     
        Sponsor.create({
          companyName: companyName,
          tokenName: tokenName,
          role: role,
          description: description,
          link: link,
          contact: contact,
          rewards: rewards
        })
          .then(sponsor => {
            console.log("send " + sponsor + " to jobCent DB");
            res.status(200)
          })
          .then(res3 => {
            res.status(200).send(response.data)   
          })
          .catch(err => res.status(400).send(err));
      })
      .then(res.status(200))
      .catch(err => {
        console.log(err);
        res.status(400);
      });
  }
};
