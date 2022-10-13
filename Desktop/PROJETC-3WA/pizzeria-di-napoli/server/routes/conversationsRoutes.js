
const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const conversationModel = require("../models/ConversationModel")(db);

  //route to save one conversation ---OK
  app.post("/api/v1/conversation/save", async (req, res, next) => {
    let newConversation = await conversationModel.saveOneConversation(req);
    if (newConversation.code) {
      res.json({
        status: 500,
        msg: `Something wrong with saving ${newConversation}`,
        err: newConversation,
      });
    }
    res.json({
      status: 200,
      msg: `a new Conversation successfully created `,
      result: newConversation,
    }); 
  });

  //route to get conversations of userId 

  app.get("/api/v1/conversations/all/:userId", withAuth,async (req, res, next) => {
    let userId = req.params.userId;
    
    let conversationOfUser = await conversationModel.getConversationsOfUser(userId);
    if (conversationOfUser.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting conversationOfUser`,
        err: conversationOfUser,
      });
    }
    if (conversationOfUser.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "conversation of this user does not exist" });
    } else {
      res.json({ status: 200, result: conversationOfUser });
    }
  });

   //route to get conversations of two userId 

   app.get("/api/v1/conversations/find/:userId1/:userId2", withAuth, async (req, res, next) => {
    let userId1 = req.params.userId1;
    let userId2 = req.params.userId2;

     
    let conversationOfUser = await conversationModel.getConversationsOfTwoUser(userId1, userId2);
    if (conversationOfUser.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting conversationOfUser`,
        err: conversationOfUser,
      });
    }
    if (conversationOfUser.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "conversation of this user does not exist" });
    } else {
      res.json({ status: 200, result: conversationOfUser });
    }
  });
};
 