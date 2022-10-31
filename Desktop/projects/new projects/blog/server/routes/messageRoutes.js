const withAuth = require("../middleware/withAuth");

module.exports = (app, db) => {
  const messageModel = require("../models/MessageModel")(db);

  //route to save one message ---OK
  app.post("/api/v1/message/save", async (req, res, next) => {
    let newMessage = await messageModel.saveOneMessage(req);
    if (newMessage.code) {
      res.json({
        status: 500,
        msg: `Something wrong with saving new message`,
        err: newMessage,
      });
    } else {
      res.json({
        status: 200,
        msg: `a new message successfully created `,
        result: newMessage,
        text: req.body.text,
      });
    }
  });

  //route update one message
  app.put("/api/v1/message/update/:id", async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!req.body) throw createError.BadRequest();
    let updateMsg = await messageModel.updateMessage(req, id);
    if (updateMsg.code) {
      res.json({ status: 500, msg: "error", err: updateMsg });
    } else if (updateMsg.affectedRows === 0) {
      res.json({ status: 404, msg: "message not exist" });
    } else {
      res.json({
        status: 200,
        msg: `message successfully updated`,
        result: updateMsg,
      });
    }
  });
  //route to get messages of postId

  app.get("/api/v1/messages/all/:postId", async (req, res, next) => {
    let postId = req.params.postId;
    let messagesOfPost = await messageModel.getMessagesOfPost(postId);
    if (messagesOfPost.code) {
      res.json({
        status: 500,
        msg: `Something wrong whith request`,
        err: messagesOfPost,
      });
    }
    if (messagesOfPost.length === 0) {
      //on retourne un message d'erreur
      res.json({ status: 404, msg: "message does not exist" });
    } else {
      res.json({ status: 200, result: messagesOfPost });
    }
  });

  //route delete one message
  app.delete("/api/v1/message/delete/:id", withAuth, async (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!req.body) throw createError.BadRequest();
    let deleteMsg = await messageModel.deleteOneMessage(id);
    if (deleteMsg.code) {
      res.json({ status: 500, msg: "error", err: deleteMsg });
    } else if (deleteMsg.affectedRows === 0) {
      res.json({ status: 404, msg: "message not exist" });
    } else {
      res.json({
        status: 200,
        msg: `message successfully deleted`,
        result: deleteMsg,
      });
    }
  });
};
