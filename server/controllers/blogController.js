import Blog from "../models/Blog.js";
import imagekit, { toFile } from "../configs/imageKit.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

// POST /api/blog/add
export const addBlog = async (req, res) => {
  try {
    // Validate blog data
    if (!req.body.blog) {
      return res.status(400).json({
        success: false,
        message: "Blog data is required",
      });
    }

    let blogData;

    try {
      blogData = JSON.parse(req.body.blog);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid blog JSON data",
      });
    }

    const { title, subTitle, description, category, isPublished } = blogData;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate uploaded image
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message:
          "Image file is missing. Check Postman form-data and Multer field name.",
      });
    }

    if (!imageFile.buffer || imageFile.buffer.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Image buffer is empty. Check that Multer uses memoryStorage().",
      });
    }

    if (!imageFile.originalname || !imageFile.mimetype) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file metadata",
      });
    }

    // Validate ImageKit configuration
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!urlEndpoint) {
      throw new Error("IMAGEKIT_URL_ENDPOINT is missing from .env");
    }

    // Convert the uploaded buffer into an SDK-compatible file
    const uploadFile = await toFile(imageFile.buffer, imageFile.originalname, {
      type: imageFile.mimetype,
    });

    // Upload image using the installed ImageKit SDK
    const response = await imagekit.beta.v2.files.upload({
      file: uploadFile,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    if (!response.filePath) {
      throw new Error("ImageKit did not return a file path");
    }

    // Generate optimized image URL
    const endpoint = urlEndpoint.replace(/\/+$/, "");
    const optimizedImageUrl = `${endpoint}/tr:q-auto,f-webp,w-1280${response.filePath}`;

    // Save blog in MongoDB
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: isPublished === true || isPublished === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    console.error("ADD BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

// GET /api/blog/all
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      isPublished: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/blog/all-admin
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("GET ADMIN BLOGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/blog/:id
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("GET BLOG BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/blog/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/blog/toggle-publish  (id in req.body)
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog status updated" });
  } catch (error) {
    console.error("TOGGLE PUBLISH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, message: comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format",
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
