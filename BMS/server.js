import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/users.json", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.json"));
});

app.post("/users.json", (req, res) => {
  const newUser = req.body;
  const filePath = path.join(__dirname, "public", "user.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user data");
      return;
    }
    const usersData = JSON.parse(data);
    usersData.users.push(newUser);
    fs.writeFile(filePath, JSON.stringify(usersData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating user data");
        return;
      }
      res.status(200).send("User registered successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
