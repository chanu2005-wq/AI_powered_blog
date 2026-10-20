import { useEffect, useState, useCallback } from "react";
import { assets } from "../../assets/assets/assets.js";
import Blogtableitem from "../../components/admin/BlogTableItem.jsx";
import { useAppContext } from "../../context/app-context";

const Dashboard = () => {
  const { axios, token } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  }, [axios]);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const loadDashboard = async () => {
      try {
        const { data } = await axios.get("/api/admin/dashboard");
        if (!cancelled && data.success) {
          setDashboardData(data.dashboardData);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Dashboard fetch error:", error);
        }
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [token, axios]);

  return (
    <div className="flex-1 p-4 md:p-10 bg-bg">
      <div className="flex flex-wrap gap-4">
        {/* Blogs */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all border border-border">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.blogs}
            </p>
            <p className="text-muted font-light">Blogs</p>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all border border-border">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.comments}
            </p>
            <p className="text-muted font-light">Comments</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all border border-border">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.drafts}
            </p>
            <p className="text-muted font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-muted">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <Blogtableitem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
