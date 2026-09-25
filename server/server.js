import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/Blogroutes.js";

const app = express();

await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

export default app;
