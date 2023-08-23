const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

app.use(express.json());
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://fangwoei22f:NJCRzIpQAyQmgwm1@cluster0.2j4w95k.mongodb.net/netflix"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");

app.use("/movies", movieRouter);
app.use("/tvshows", tvshowRouter);

app.get("/", (req, res) => {
  res.send(
    "<button><a href='/movies'>Movies</a></button><button><a href='/tvshows'>tvShows</a></button>"
  );
});

// start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
