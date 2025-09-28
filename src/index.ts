import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello TypeScript + Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
