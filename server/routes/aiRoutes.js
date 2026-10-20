import express from "express";
import { generateBlogContent } from "../controllers/aiController.js";
import auth from "../middleware/auth.js";

const aiRouter = express.Router();

aiRouter.post("/generate", auth, generateBlogContent);

export default aiRouter;
