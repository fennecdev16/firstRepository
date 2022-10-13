

module.exports = (_db) => {
  db = _db;
  return MessageModel;
};

class MessageModel {
  //save a new conversation
  static saveOneMessage(req) {
    return db
      .query(
        "INSERT INTO Messages (conversationId, senderId, text) VALUES (?,?, ?)",
        [req.body.conversationId, req.body.senderId, req.body.text]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
   //save a new conversation
   static saveOneConversation(req) {
    return db
      .query("INSERT INTO conversations (senderId, receiverId) VALUES (?,?)", [
        req.body.senderId,
        req.body.receiverId,
      ])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // messages of user
  static getMessagesOfConversation(conversationId) {
    return db
      .query("SELECT * FROM Messages WHERE conversationId = ?", [
        conversationId
      ])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
