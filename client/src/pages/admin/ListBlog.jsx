import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import BlogTableItem from "../../components/admin/BlogTableItem";

const ListBlog = () => {
  const { axios, token } = useAppContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/blog/admin/all");
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (token) fetchBlogs();
  }, [token, fetchBlogs]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-bg">
      <h1 className="text-text">All Blogs</h1>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-muted">
          <thead className="text-xs text-muted text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted">
                  Loading...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted">
                  No blogs found. Add your first blog!
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
