const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 