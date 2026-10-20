import express from "express";
import {
  addBlog,
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogById,
  deleteBlog,
  togglePublish,
  generateContent,
} from "../controllers/blogController.js";
import {
  addComment,
  getAllComments,
  getApprovedComments,
  approveComment,
  deleteComment,
} from "../controllers/commentController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// --- Static routes FIRST (before any :param routes) ---

// Public blog list
blogRouter.get("/all", getAllBlogs);

// Admin blog list (includes drafts)
blogRouter.get("/admin/all", auth, getAllBlogsAdmin);

// Admin all comments
blogRouter.get("/admin/comments", auth, getAllComments);

// Add new blog (admin)
blogRouter.post("/add", auth, upload.single("image"), addBlog);

// Comment routes (static paths)
blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments/:blogId", getApprovedComments);
blogRouter.patch("/comments/:id/approve", auth, approveComment);
blogRouter.delete("/comments/:id", auth, deleteComment);

// Toggle publish - POST /toggle-publish (ID in body)
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/generate", auth, generateContent);

// --- Param routes LAST ---

// Get single blog by id (public)
blogRouter.get("/:id", getBlogById);

// Delete blog (admin)
blogRouter.delete("/:id", auth, deleteBlog);

export default blogRouter;
