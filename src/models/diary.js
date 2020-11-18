const mongoose = require("mongoose");

const Diary = mongoose.model("Diary", {
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
});

module.exports = Diary;
