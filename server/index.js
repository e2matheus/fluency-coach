require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const ttsRoutes = require('./routes/tts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/audio', express.static(path.join(__dirname, 'audio')));
app.use('/api/tts', ttsRoutes);

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('OpenAI TTS Enabled:', process.env.ENABLE_OPENAI_TTS);
console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY); 