const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const reviewSchema = require("./review");

const tvshowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
  },
  seasons: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // reviews: [reviewSchema],
});

const tvShow = model("tvshow", tvshowSchema);
module.exports = tvShow;
