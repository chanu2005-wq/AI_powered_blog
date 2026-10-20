import Comment from "../models/Comment.js";

// POST /api/blog/comments  (public)
export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const comment = await Comment.create({ blog: blogId, name, content });
    return res.status(201).json({
      success: true,
      message: "Comment submitted for review",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blog/comments  (admin, auth)
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog", "title")
      .sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blog/comments/:blogId  (public — only approved)
export const getApprovedComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/blog/comments/:id/approve  (auth)
export const approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true },
    );
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.json({ success: true, message: "Comment approved", comment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/blog/comments/:id  (auth)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
