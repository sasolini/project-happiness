const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const diaryRouter = require("./routers/diary");
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
