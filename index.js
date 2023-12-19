const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { urlRouter } = require("./route/url.route.js");
const app = express();

app.use(express.json());
// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
//   Credential: false,
// };
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello I am serer 😊");
});

app.use("/url", urlRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to server at port ${process.env.port}`);
  } catch (error) {
    console.log(error.message);
  }
});
