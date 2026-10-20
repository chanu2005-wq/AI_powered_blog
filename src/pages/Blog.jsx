import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets/assets.js";
import Navbar from "../components/Navbar.jsx";
import moment from "moment";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch blog details
  const fetchBlogData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/blog/${id}`);

      if (response.data.success) {
        setData(response.data.blog);
      } else {
        setData(null);
        toast.error(response.data.message || "Failed to load blog.");
      }
    } catch (error) {
      setData(null);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load blog.",
      );
    } finally {
      setLoading(false);
    }
  }, [axios, id]);

  // Fetch blog comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/blog/comments/${id}`);

      if (response.data.success) {
        setComments(response.data.comments || []);
      } else {
        setComments([]);
        toast.error(response.data.message || "Failed to load comments.");
      }
    } catch (error) {
      setComments([]);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load comments.",
      );
    }
  }, [axios, id]);

  // Add a new comment
  const addComment = async (e) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      toast.error("Please enter your name and comment.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post("/api/blog/add-comment", {
        blogId: id,
        name: name.trim(),
        content: content.trim(),
      });

      const result = response.data;

      if (result.success) {
        toast.success(result.message || "Comment added successfully!");

        setName("");
        setContent("");

        await fetchComments();
      } else {
        toast.error(result.message || "Failed to add comment.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit comment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Load blog and comments when the blog ID changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setData(null);
    setComments([]);

    fetchBlogData();
    fetchComments();
  }, [fetchBlogData, fetchComments]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="py-20 text-center text-muted">
          Blog not found or failed to load.
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground || assets.gradentBackground}
        className="absolute -top-50 -z-10 opacity-50"
        alt=""
      />

      <Navbar />

      {/* Blog Header */}
      <div className="mt-20 text-center text-muted">
        <p>
          Published on{" "}
          {data.createdAt
            ? moment(data.createdAt).format("MMMM Do YYYY")
            : "Date unavailable"}
        </p>

        <h1 className="mx-auto max-w-2xl text-2xl font-semibold text-text sm:text-5xl">
          {data.title}
        </h1>

        <h2 className="mx-auto my-5 max-w-lg">{data.subTitle}</h2>

        <p className="mb-6 inline-block rounded-full border border-primary/10 bg-lavender px-4 py-1 text-sm font-medium text-primary">
          Michael Brown
        </p>
      </div>

      <div className="mx-5 my-10 mt-6 max-w-5xl sm:mx-auto">
        {/* Blog Image */}
        <img
          src={data.image}
          alt={data.title || "Blog image"}
          className="mb-5 w-full rounded-3xl"
        />

        {/* Blog Content */}
        <div
          className="rich-text mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: data.description || "",
          }}
        />

        {/* Comments Section */}
        <div className="mx-auto mb-10 mt-14 max-w-3xl">
          <p className="mb-4 font-semibold">Comments ({comments.length})</p>

          {comments.length === 0 ? (
            <p className="text-sm text-muted">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => (
                <div
                  key={item._id || index}
                  className="relative max-w-xl rounded border border-primary/10 bg-lavender p-4 text-muted"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <img src={assets.user_icon} className="w-6" alt="" />
                    <p className="font-medium">{item.name}</p>
                  </div>

                  <p className="ml-8 max-w-md text-sm">{item.content}</p>

                  <div className="absolute bottom-3 right-4 flex items-center gap-2 text-xs">
                    {item.createdAt ? moment(item.createdAt).fromNow() : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Section */}
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-semibold">Add your Comment</p>

          <form
            onSubmit={addComment}
            className="flex max-w-lg flex-col items-start gap-4"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              maxLength={100}
              className="w-full rounded border border-border p-2 outline-none"
            />

            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              required
              maxLength={2000}
              className="h-48 w-full rounded border border-border p-2 outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded bg-primary px-8 py-2 text-white transition-all hover:bg-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Social Media Section */}
        <div className="mx-auto my-24 max-w-3xl">
          <p className="my-4 font-semibold">
            Share this article on social media
          </p>

          <div className="flex gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on Facebook"
            >
              <img src={assets.facebook_icon} width={50} alt="Facebook" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data.title || "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on Twitter"
            >
              <img src={assets.twitter_icon} width={50} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
