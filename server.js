require('dotenv').config(); 
const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
app.use(fileUpload());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const userRoutes = require('./src/routes/userRoutes');
const carAnnouncementRoutes = require('./src/routes/carAnnouncementRoutes');
const favorisRoutes = require('./src/routes/favorisRoutes'); 


const http = require('http');
const { Server } = require('socket.io');
const chatRoutes = require('./src/routes/messageRoutes');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
    try {
      const messageController = require('./src/controllers/messageController');
      const message = await messageController.createMessage({ senderId, receiverId, content });
      io.to(receiverId).emit('newMessage', message);
      io.to(senderId).emit('newMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// 📦 ROUTES
app.use("/user", userRoutes);
app.use("/carAnnouncement", carAnnouncementRoutes);
app.use("/favoris", favorisRoutes); 
// 📤 Upload d’image de voiture
app.post('/uploadCarImage', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, 'carImage', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ fileName: uploadedFile.name });
  });
});

// 🖼️ Récupération d'images
app.use('/fetchCarImages', express.static(path.join(__dirname, 'carImage')));

// 🚀 Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
