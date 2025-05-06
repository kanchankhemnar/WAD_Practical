const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Song = require("./models/Song");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// connect mongo
mongoose
  .connect("mongodb://localhost:27017/music", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"));

// routes
app.use(express.static(path.join(__dirname, "views")));

// add songs
app.get("/add-songs", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("songs.json"));

  await Song.insertMany(data);
  res.send("songs added");
});

// list all songs

app.get("/songs", async (req, res) => {
  const data = await Song.find();
  res.json(data);
});
// count

app.get("/count", async (req, res) => {
  const count = await Song.countDocuments();
  res.send(`Total songs are : ${count} `);
});

// music director
app.get("/director/:name", async (req, res) => {
  const songs = await Song.find({ music_director: req.params.name });
  res.json(songs);
});

// music director and singer
app.get("/director/:name/singer/:singer", async (req, res) => {
  const songs = await Song.find({
    music_director: req.params.name,
    singer: req.params.singer,
  });
  res.json(songs);
});

// delete
app.get("/delete/:song", async (req, res) => {
  const song = await Song.findOne({ songname: req.params.song });

  if (!song) {
    res.send("No such song available");
  }
  await Song.deleteOne(song);
  res.send("song deleted");
});

// add new song

// singer and film

// update actor and actress
app.get("/update/:song/actor/:actor/actress/:actress", async (req, res) => {
  const song = await Song.findOne({ songname: req.params.song });
  if (!song) {
    res.send("No such song");
  }
  await Song.updateOne(
    { songname: req.params.song },
    {
      actor: req.params.actor,
      actress: req.params.actress,
    }
  );

  res.send("Song updated");
});
app.put("/update/:name", async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },
    {
      actor: req.body.actor,
      actress: req.body.actress,
    }
  );
  res.send("Song updated");
});

//  add a favourite song
// display tabular form

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running at 3000");
});
