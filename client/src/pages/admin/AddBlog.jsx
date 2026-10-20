import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets/assets.js";
import Quill from "quill";
import { useAppContext } from "../../context/app-context";

const AddBlog = () => {
  const { axios } = useAppContext();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [published, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const generateContent = async () => {
    if (!title.trim()) {
      setMessage({
        text: "Enter a blog title/topic first to generate content.",
        type: "error",
      });
      return;
    }

    setMessage({ text: "", type: "" });

    try {
      setLoading(true);
      const { data } = await axios.post("/api/ai/generate", { topic: title });

      if (data.success) {
        setTitle(data.title);
        setSubtitle(data.subTitle || "");
        setCategory(data.category || "Technology");
        if (quillRef.current) {
          quillRef.current.root.innerHTML = data.description;
        }
        setMessage({
          text: "Content generated! Review and edit before publishing.",
          type: "success",
        });
      } else {
        setMessage({
          text: data.message || "AI generation failed.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "AI generation failed. Check your GEMINI_API_KEY.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const description = quillRef.current ? quillRef.current.root.innerHTML : "";

    if (!image) {
      setMessage({ text: "Please upload a thumbnail image.", type: "error" });
      return;
    }

    setIsAdding(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "blog",
        JSON.stringify({
          title,
          subTitle,
          description,
          category,
          isPublished: published,
        }),
      );

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        setMessage({ text: "Blog published successfully!", type: "success" });
        // Reset form
        setTitle("");
        setSubtitle("");
        setCategory("Startup");
        setIsPublished(false);
        setImage(false);
        if (quillRef.current) quillRef.current.root.innerHTML = "";
      } else {
        setMessage({
          text: data.message || "Failed to add blog.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Server error. Please try again.",
        type: "error",
      });
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-bg text-muted h-full overflow-y-auto"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded border border-border">
        {/* Feedback message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Upload Thumbnail */}
        <p className="text-text">Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload thumbnail"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4 text-text">Blog Title / Topic</p>
        <input
          type="text"
          placeholder="Enter title or topic for AI generation"
          required
          className="w-full max-w-lg mt-2 p-2 border border-border outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-4 text-text">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-border outline-none rounded"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subTitle}
        />

        {/* Blog Description */}
        <p className="mt-4 text-text">Blog Description</p>
        <div className="max-w-lg h-[300px] pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>

          {/* AI Button */}
          <button
            type="button"
            onClick={generateContent}
            disabled={loading}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-primary-dark px-4 py-1.5 rounded hover:bg-hover cursor-pointer disabled:opacity-60 transition-colors"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        {/* Category */}
        <p className="mt-4 text-text">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-border outline-none rounded"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        {/* Published */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="text-text">Publish this blog</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-6 bg-primary text-white px-6 py-2 rounded cursor-pointer disabled:opacity-60 hover:bg-hover transition-colors"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
