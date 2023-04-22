const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
let scoreBoard = require("./scoreBoard");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ scoreBoard: scoreBoard });
});

app.post("/:username/:score", (req, res) => {
  const { username, score } = req.params;

  if (!username || !score) {
    res.status(400).json({ error: "Missing username or score" });
  }

  if (scoreBoard[username] && score > scoreBoard[username]) {
    scoreBoard = { ...scoreBoard, [username]: score };
  }

  res.json({ scoreBoard: scoreBoard });
});

app.listen(PORT, () => console.log("API is running on PORT " + PORT));
