import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import logo from "../assets/assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
      {/* Logo / Home */}
      <a href="/" className="inline-block" aria-label="Quick Blog - Home">
        <img src={logo} alt="Quick Blog" className="h-10 w-auto" />
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-muted hover:text-primary transition-colors"
        >
          Home
        </button>

        {token ? (
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-hover transition-colors cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-hover transition-colors cursor-pointer"
          >
            Admin Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
