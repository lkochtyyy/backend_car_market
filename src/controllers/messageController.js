const MessageModel = require('../models/message');

class MessageController {
  static async createMessage(req) {
    try {
      const { senderId, receiverId, content } = req;
      if (!senderId || !receiverId || !content) {
        throw new Error('Missing required fields');
      }
      const message = await MessageModel.createMessage({ senderId, receiverId, content });
      return message;
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  static async getMessages(req, res) {
    try {
      const { senderId, receiverId } = req.query;
      if (!senderId || !receiverId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      const messages = await MessageModel.getMessagesBetweenUsers(senderId, receiverId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: `Error fetching messages: ${error.message}` });
    }
  }
}

module.exports = MessageController;