/** @format */

const express = require("express");
const notes = require("./data/notes");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 2000;
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

//CONNETING DB
connectDB();

//ADD EXPRESS PARSER
app.use(express.json());

//LIST OF API
// app.get("/", (req, res) => {
//   res.send("This is get Api");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

//LISTENING SERVER
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
