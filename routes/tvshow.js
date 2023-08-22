const express = require("express");
const router = express.Router();

// import model into router
const tvshow = require("../models/tvshow");

/* list all the tvshows */
router.get("/", async (req, res) => {
  const { premiere_year, genre, rating } = req.query;
  let filter = {};
  if (genre || rating || premiere_year) {
    if (genre) {
      filter.genre = { $in: genre.split(",") }; // { genre: { $in: genre } }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year }; // { premiere_year: { $gt: release_year } }
    }
  }
  const list = await tvshow.find(filter);
  res.send(list);
});

/* get specific tvshow by id */
router.get("/:id", async (req, res) => {
  const data = await tvshow.findOne({ _id: req.params.id });
  res.send(data);
});

module.exports = router;
