

module.exports = (_db) => {
  db = _db;
  return ConversationModel;
};

class ConversationModel {


  // conversation of user
  static getConversationsOfUser(userId) {
    return db
      .query("SELECT * FROM Conversations WHERE senderId = ? OR receiverId = ?", [userId, userId])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
  // conversation of two users
  static getConversationsOfTwoUser(userId1, userId2) {
    return db
      .query("SELECT * FROM Conversations WHERE senderId = ? OR receiverId = ? OR senderId = ? OR receiverId = ?", [userId1, userId2, userId2, userId1])

      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
