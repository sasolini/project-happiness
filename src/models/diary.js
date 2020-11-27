const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true,
    unique: true,
  },
  workout: {
    type: Boolean,
    default: false,
    required: true,
  },
  meditation: {
    type: Boolean,
    default: false,
    required: true,
  },
  gratitude1: {
    type: String,
    trim: true,
  },
  gratitude2: {
    type: String,
    trim: true,
  },
  gratitude3: {
    type: String,
    trim: true,
  },
  memory: {
    type: String,
    trim: true,
  },
  kindness: {
    type: String,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
