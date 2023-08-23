const express = require("express");
const router = express.Router();

// import model into router
const Tvshow = require("../models/tvshow");

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
  const list = await Tvshow.find(filter);
  res.send(list);
});

/* get specific Tvshow by id */
router.get("/:id", async (req, res) => {
  const data = await Tvshow.findOne({ _id: req.params.id });
  res.send(data);
});

/* create new tvshow route */
router.post("/", async (req, res) => {
  const newTvshow = new Tvshow({
    title: req.body.title,
    creator: req.body.creator,
    premiere_year: req.body.premiere_year,
    seasons: req.body.seasons,
    genre: req.body.genre,
    rating: req.body.rating,
  });
  await newTvshow.save();
  res.send(newTvshow);
});

/* update a tvshow */
router.put("/:id", async (req, res) => {
  const tvshow_id = req.params.id;
  const updatedTvshow = await Tvshow.findByIdAndUpdate(tvshow_id, req.body, {
    new: true,
  });
  res.send(updatedTvshow);
});

/* delete a tvshow */
router.delete("/:id", async (req, res) => {
  const tvshow_id = req.params.id;
  const deletedTvshow = await Tvshow.findByIdAndDelete(tvshow_id);
  res.send(deletedTvshow);
});


module.exports = router;
