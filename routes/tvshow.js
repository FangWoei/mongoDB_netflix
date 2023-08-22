const express = require("express");
const router = express.Router();

const tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  const { premiere_year, seasons, genre } = req.query;
let filter = {};
if (premiere_year || seasons || genre) {
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  if (seasons) {
    filter.seasons = { $gt: seasons };
  }
  if (genre) {
    filter.genre = genre;
  }
}
  res.send(await tvshow.find(filter));
});

router.get("/:id", async (req, res) => {
  const tvdata = await tvshow.findOne({ _id: req.params.id });
  res.send(tvdata);
});

module.exports = router;
