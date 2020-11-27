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

app.use(userRouter);
app.use(diaryRouter);

// Serve React app
app.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } catch (e) {
    res.status(500).send();
  }
});
app.use(express.static("client/build"));

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
