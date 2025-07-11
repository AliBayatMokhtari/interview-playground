import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Hello World! from About page.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
