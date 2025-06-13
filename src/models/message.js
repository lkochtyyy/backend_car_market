const { pool } = require('../config/db');

class MessageModel {
  static async createMessage({ senderId, receiverId, content }) {
    const [result] = await pool.execute(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [senderId, receiverId, content]
    );
    return { id: result.insertId, senderId, receiverId, content, created_at: new Date() };
  }

  static async getMessagesBetweenUsers(senderId, receiverId) {
    const [rows] = await pool.execute(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
      [senderId, receiverId, receiverId, senderId]
    );
    return rows;
  }
}
module.exports = MessageModel;