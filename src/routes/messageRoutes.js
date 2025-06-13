const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();

router.get('/messages', MessageController.getMessages);

module.exports = router;