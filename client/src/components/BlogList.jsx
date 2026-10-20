import { useState, useEffect, useCallback } from "react";
import { blog_data, blogCategories } from "../assets/assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const Bloglist = () => {
  const { input, axios } = useAppContext();

  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Fallback to static data if the backend is unavailable
      setBlogs(blog_data);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const searchTerm = (input || "").toLowerCase();

    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm) ||
      blog.category?.toLowerCase().includes(searchTerm);

    const matchesCategory = menu === "All" || blog.category === menu;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-muted ${
                menu === item ? "text-white px-4 py-1 rounded-full bg-primary" : ""
              }`}
            >
              {item}

              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-muted py-20">Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center text-muted py-20">
          No blogs found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id || blog.id || blog.title} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bloglist;
