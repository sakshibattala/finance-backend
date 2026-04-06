import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
