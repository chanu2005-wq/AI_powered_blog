import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { toast } from "react-toastify";

const Comments = () => {
  const { axios, token } = useAppContext();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  // Fetch all comments
  const fetchComments = useCallback(async () => {
    if (!token) {
      setComments([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get("/api/blog/admin/comments");

      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message || "Failed to fetch comments");
      }
    } catch (error) {
      console.error("Fetch comments error:", error);

      toast.error(error.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, [axios, token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, [fetchComments]);

  // Approve a comment
  const approveComment = async (commentId) => {
    if (!commentId) {
      toast.error("Comment ID is missing");
      return;
    }

    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: commentId,
      });

      if (data.success) {
        toast.success(data.message || "Comment approved successfully");
        await fetchComments();
      } else {
        toast.error(data.message || "Failed to approve comment");
      }
    } catch (error) {
      console.error("Approve comment error:", error);

      toast.error(error.response?.data?.message || "Failed to approve comment");
    }
  };

  // Delete a comment
  const deleteComment = async (commentId) => {
    if (!commentId) {
      toast.error("Comment ID is missing");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) return;

    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: commentId,
      });

      if (data.success) {
        toast.success(data.message || "Comment deleted successfully");

        // Update the list immediately after deletion
        setComments((previousComments) =>
          previousComments.filter((comment) => comment._id !== commentId),
        );
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Delete comment error:", error);

      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  // Filter approved and unapproved comments
  const filtered = comments.filter((comment) => {
    if (filter === "Approved") {
      return comment.isApproved === true;
    }

    return comment.isApproved === false;
  });

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-bg">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-text">Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-muted"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-muted"
            }`}
          >
            Not approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide border border-border">
        <table className="w-full text-sm text-muted">
          <thead className="text-xs text-muted text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>

              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-muted">
                  Loading comments...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-muted">
                  No comments in this category.
                </td>
              </tr>
            ) : (
              filtered.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                  approveComment={() => approveComment(comment._id)}
                  deleteComment={() => deleteComment(comment._id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;