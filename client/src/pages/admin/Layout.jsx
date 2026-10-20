import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/app-context";

const Layout = () => {
  const navigate = useNavigate();

  const { setToken } = useAppContext();

  const logout = () => {
    // Remove the stored authentication token and clear axios headers
    setToken("");

    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-border bg-white">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full hover:bg-hover transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-70px)] bg-bg">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
