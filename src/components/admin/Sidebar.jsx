import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-border min-h-full pt-6 bg-white">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-lavender border-r-4 border-primary"}`
        }
      >
        <img src={assets.home_icon} alt="" className="min w-4 w-5" />
        <p className="hidden md:inline-block text-text">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-lavender border-r-4 border-primary"}`
        }
      >
        <img src={assets.add_icon} alt="" className="min w-4 w-5" />
        <p className="hidden md:inline-block text-text">Add Blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-lavender border-r-4 border-primary"}`
        }
      >
        <img src={assets.list_icon} alt="" className="min w-4 w-5" />
        <p className="hidden md:inline-block text-text">List Blog</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-lavender border-r-4 border-primary"}`
        }
      >
        <img src={assets.comment_icon} alt="" className="min w-4 w-5" />
        <p className="hidden md:inline-block text-text">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
