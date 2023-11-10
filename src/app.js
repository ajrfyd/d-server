const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const tagRoute = require("./routes/tags");

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://k-log3943.netlify.app"],
  method: ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true,
}));

tagRoute.forEach(({ method, path, handler }) => {
  app[method](`/tags${path}`, handler);
});

app.get("/", (req, res) => {
  return res.send("<h1>Welcome!!</h1>")
});

app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});