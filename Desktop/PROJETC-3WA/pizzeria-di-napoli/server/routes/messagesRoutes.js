
const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const messageModel = require("../models/MessageModel")(db);

  //route to save one message ---OK
  app.post("/api/v1/message/save",withAuth, async (req, res, next) => {
    let newMessage = await messageModel.saveOneMessage(req);
    if (newMessage.code) {
      res.json({
        status: 500,
        msg: `Something wrong with saving new message`,
        err: newMessage,
      });
    }else{
      res.json({
        status: 200,
        msg: `a new message successfully created `,
        result: newMessage,
        text: req.body.text
      }); 
    }
  });

  //route to get messages of userId 

  app.get("/api/v1/messages/one/:conversationId", async (req, res, next) => {
    let conversationId = req.params.conversationId;
    let messagesOfConversation = await messageModel.getMessagesOfConversation(conversationId);
    if (messagesOfConversation.code) {
      res.json({
        status: 500,
        msg: `Something wrong with getting messages of conversation`,
        err: messagesOfConversation,
      });
    }
    if (messagesOfConversation.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "messages of this conversation does not exist" });
    } else {
      res.json({ status: 200, result: messagesOfConversation });
    }
  });

};
 