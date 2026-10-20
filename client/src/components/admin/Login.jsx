import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import { toast } from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(data.message || "Login successful!");
        navigate("/admin");
      } else {
        const message = data.message || "Invalid login credentials";
        setError(message);
        toast.error(message);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-bg">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-border/30 shadow-xl shadow-primary/10 rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light text-muted">
              Enter your credentials to access your admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-muted"
          >
            {error && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </p>
            )}

            <div className="flex flex-col">
              <label htmlFor="email" className="text-text">Email</label>
              <input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                autoComplete="username"
                required
                placeholder="your email id"
                className="border-b-2 border-border p-2 outline-none mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-text">Password</label>
              <input
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                autoComplete="current-password"
                required
                placeholder="your password"
                className="border-b-2 border-border p-2 outline-none mb-6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-hover transition-all disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
