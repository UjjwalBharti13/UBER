import express from "express";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
 
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Uber  Backend Running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});

connectDB();

