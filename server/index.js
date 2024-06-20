const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();

connectDB().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
