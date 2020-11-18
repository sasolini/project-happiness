const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const diaryRouter = require("./routers/diary");

const port = 9000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(diaryRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
