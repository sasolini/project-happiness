const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const diaryRouter = require("./routers/diary");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Priority serve React app.
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(userRouter);
app.use(diaryRouter);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
