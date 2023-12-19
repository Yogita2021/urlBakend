const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { urlRouter } = require("./route/url.route.js");
const { userRoute } = require("./route/user.route.js");
const { auth } = require("./middleware/auth.js");
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello I am serer 😊");
});

app.use("/user", userRoute);
app.use(auth);
app.use("/url", urlRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to server at port ${process.env.port}`);
  } catch (error) {
    console.log(error.message);
  }
});
