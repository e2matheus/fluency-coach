const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  englishText: {
    type: String,
    required: true
  },
  spanishText: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  currentPhase: {
    type: Number,
    default: 1,
    enum: [1, 2, 3]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema); 