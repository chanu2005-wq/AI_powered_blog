import { assets } from "../../assets/assets/assets";
import { useAppContext } from "../../context/app-context";
import { toast } from "react-toastify";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();

  const { title, createdAt, isPublished } = blog;
  const blogDate = createdAt ? new Date(createdAt) : null;

  const deleteBlog = async () => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      const { data } = await axios.delete(`/api/blog/${blog._id}`);

      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message || "Blog status updated successfully");
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to update blog status");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update blog status",
      );
    }
  };

  return (
    <tr className="border-y border-border">
      <th className="px-2 py-4 text-text">{index}</th>

      <td className="px-2 py-4 text-text">{title}</td>

      <td className="px-2 py-4 max-sm:hidden text-muted">
        {blogDate && !Number.isNaN(blogDate.getTime())
          ? blogDate.toDateString()
          : "N/A"}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? "text-green-600" : "text-orange-700"}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          type="button"
          onClick={togglePublish}
          className="border border-border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-lavender transition-colors"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>

        <button
          type="button"
          onClick={deleteBlog}
          className="cursor-pointer"
          aria-label={`Delete ${title}`}
        >
          <img
            src={assets.cross_icon}
            className="w-8 hover:scale-110 transition-all"
            alt=""
          />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
