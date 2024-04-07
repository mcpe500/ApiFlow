const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/ConnectionRelated");

const app = express();

// Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
