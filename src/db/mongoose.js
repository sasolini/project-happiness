const mongoose = require("mongoose");

const dbUrl =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/project-happiness-api";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
