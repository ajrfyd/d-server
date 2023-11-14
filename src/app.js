const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const tagRoute = require("./routes/tags");
const postRoute = require("./routes/posts");

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://k-log3943.netlify.app"],
  method: ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.get("/", (req, res) => {
  return res.send("<h1>Welcome!!</h1>")
});

tagRoute.forEach(({ method, path, handler }) => {
  app[method](`/tags${path}`, handler);
});

postRoute.forEach(({ method, path, handler }) => {
  app[method](`/posts${path}`, handler);
});

app.get("/*", (_, res) => {
  return res.send("<h2>Page Not Found!</h2>")
});

app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});