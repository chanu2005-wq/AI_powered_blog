import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

await connectDB();

// Middlewares
// Build allowed origins from environment variable with fallback
const getAllowedOrigins = () => {
  const origins = new Set();

  // Add production frontend URLs
  origins.add("https://quick-blog-rose-ten.vercel.app");
  origins.add("https://quick-blog-client-zeta.vercel.app");
  origins.add("https://quick-blog-client-delta-two.vercel.app");

  // Add development origins
  origins.add("http://localhost:5173");
  origins.add("http://localhost:5174");

  // Add any additional origins from FRONTEND_URL env var (comma-separated)
  if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(",").forEach((url) => {
      const trimmed = url.trim();
      if (trimmed) origins.add(trimmed);
    });
  }

  return Array.from(origins);
};

const allowedOrigins = getAllowedOrigins();

// Normalize origin for comparison (trim, lowercase, remove trailing slash)
const normalizeOrigin = (origin) => {
  if (!origin) return origin;
  return origin.trim().toLowerCase().replace(/\/$/, "");
};

const normalizedAllowedOrigins = allowedOrigins.map(normalizeOrigin);

const corsOptions = {
  origin: (origin, callback) => {
    try {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);

      // Check if origin is allowed
      if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // Origin not allowed - return false to indicate rejection (cors middleware will send 403)
      return callback(null, false);
    } catch (error) {
      // Prevent any unexpected errors from causing 500 on preflight
      console.error("CORS origin check error:", error);
      return callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests for all routes with same CORS options
app.options("*", cors(corsOptions));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is Working" });
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/ai", aiRouter);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message || err);
  // Don't expose internal error details in production
  const isDev = process.env.NODE_ENV !== "production";
  res.status(err.status || 500).json({
    success: false,
    message: isDev
      ? err.message || "Internal Server Error"
      : "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

// Only listen if not in Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;