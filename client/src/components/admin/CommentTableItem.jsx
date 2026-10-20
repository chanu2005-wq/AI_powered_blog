import { assets } from "../../assets/assets/assets";
import { useAppContext } from "../../context/app-context";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const handleApprove = async () => {
    try {
      const { data } = await axios.patch(
        `/api/blog/comments/${_id}/approve`,
        {},
      );
      if (data.success) fetchComments();
    } catch (error) {
      console.error("Approve error:", error);
      alert("Failed to approve comment");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const { data } = await axios.delete(`/api/blog/comments/${_id}`);
      if (data.success) fetchComments();
    } catch (error) {
      console.error("Delete comment error:", error);
      alert("Failed to delete comment");
    }
  };

  return (
    <tr className="border-y border-border">
      <td className="px-6 py-4 text-text">
        <b className="font-medium text-muted">Blog</b>:{" "}
        {blog?.title || "Unknown"}
        <br />
        <b className="font-medium text-muted">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-muted">Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden text-muted">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              onClick={handleApprove}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              title="Approve"
              alt="Approve"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt="Delete"
            onClick={handleDelete}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
