const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Diary = require("./models/diary");

const port = 9000;
const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(() => {});
});

app.post("/diary", (req, res) => {
  const diary = new Diary(req.body);

  diary
    .save()
    .then(() => {
      res.send(diary);
    })
    .catch(() => {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
