const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API to get users
app.get("/api/users", (req, res) => {
  fs.readFile("./users.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
