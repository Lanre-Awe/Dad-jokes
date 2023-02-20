const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const comment = [
  { id: uuid(), username: "Lanre", comment: "you will be great" },
  { id: uuid(), username: "Lanre", comment: "you will be greater" },
  { id: uuid(), username: "Lanre", comment: "you will be the greatest" },
];

app.get("/comments", (req, res) => {
  res.send(comment);
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const filtered = comment.find((item) => item.id == id);
  res.send(filtered);
});
app.get("/tacos", (req, res) => {
  res.send({ meat: "chicken" });
});

app.post("/comments", (req, res) => {
  const { username, commentText } = req.body;
  console.log(username, commentText);
  comment.push({ username, comment: commentText, id: uuid() });
  res.send(comment);
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const filteredComment = comment.find((item) => item.id === id);
  filteredComment.comment = req.body.comment;
  res.redirect("/comments");
});
app.listen(4000, () => {
  console.log("LISTENING");
});
