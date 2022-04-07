/** @format */

const express = require("express");
const notes = require("./data/notes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2000;

//LIST OF API
app.get("/", (req, res) => {
  res.send("This is get Api");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const single_notes = notes.find((n) => n._id === req.params.id);
  res.json(single_notes);
});

//LISTENING SERVER
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
