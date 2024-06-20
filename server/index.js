const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
