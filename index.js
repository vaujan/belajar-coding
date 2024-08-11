const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
// Database
let dataComments = [
  {
    id: uuid(),
    username: "Ojan",
    comment: "Hello World!",
  },
  {
    id: uuid(),
    username: "Kacong",
    comment: "Hello World! 2",
  },
  {
    id: uuid(),
    username: "Groot",
    comment: "I am groot!",
  },
  {
    id: uuid(),
    username: "Aldy",
    comment: "I am groot!",
  },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//COMMENT REQUEST LIST:
//get
app.get("/", (req, res) => {
  res.render("comments/index", { dataComments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

//post
app.post("/comments/", (req, res) => {
  const { username, comment } = req.body;
  dataComments.push({ username, comment, id: uuid() });
  res.redirect("/"); //Kembali ke app.get('/', (req, res ...))
});
//---closing---/

//View & Edit COMMENT:

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = dataComments.find((c) => c.id === id);
  if (comment) {
    res.render("comments/show", { comment });
  } else {
    res.status(404).send("404 comment not found");
  }
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = dataComments.find((c) => c.id === id);
  res.render("comments/edit", { comment, id });
});

app.patch("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = dataComments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const updatedDataComments = dataComments.filter((c) => c.id !== id);
  dataComments = updatedDataComments;
  res.redirect("/");
});

//---closing---//

app.listen(port, () => {
  console.log(`Listening to port 3000`);
});

app.get("*", (req, res) => {
  res.send("404 Error Not Found");
});
