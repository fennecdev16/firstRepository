

module.exports = (_db) => {
  db = _db;
  return MessageModel;
};

class MessageModel {
  //save a new conversation
  static saveOneMessage(req) {
    return db
      .query(
        "INSERT INTO Messages (title, message, product_id, user_id) VALUES (?,?, ?,?)",
        [req.body.title, req.body.message, req.body.product_id, req.body.user_id]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
   
//modification d'un utilisateur
static updateMessage(req,  msgId) {
  return db
    .query(
      "UPDATE messages SET title= ? , message =  ? WHERE msg_id = ?",
      [
        req.body.title,
        req.body.message,
        msgId
      ]
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}
  // messages of user
  static getMessagesOfPost(productId) {
    return db
      .query(
        `SELECT messages.msg_id, messages.user_id, messages.title, messages.message, messages.creationTimestamp,users.firstName, users.lastName FROM
        messages inner join  users ON  users.key_id =  messages.user_id
        WHERE messages.product_id = ? order by messages.creationTimestamp  desc`,
        [productId]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

   //delete one message 
   static deleteOneMessage(id) {
    return db
      .query("DELETE FROM messages WHERE msg_id = ?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
