require('dotenv').config(); 

const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const db = require('./src/config/db'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
