import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import { toast } from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);

        if (existing?.dataset.loaded === "true") {
          resolve();
          return;
        }

        if (existing) {
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener(
            "error",
            () => reject(new Error(`Failed to load ${src}`)),
            { once: true },
          );
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };

        script.onerror = () => reject(new Error(`Failed to load ${src}`));

        document.head.appendChild(script);
      });

    const initializeVanta = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
        );

        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js",
        );

        if (
          cancelled ||
          !vantaRef.current ||
          !window.VANTA?.BIRDS ||
          !window.THREE
        ) {
          return;
        }

        vantaEffect.current = window.VANTA.BIRDS({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xfafafa,
          color1: 0xae5aeb,
          color2: 0xb1d6de,
        });
      } catch (err) {
        console.error("Vanta Birds initialization failed:", err);
      }
    };

    initializeVanta();

    return () => {
      cancelled = true;

      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

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
    <div
      ref={vantaRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-4"
    >
      <div className="relative z-10 w-full max-w-sm rounded-lg border border-white/40 bg-white/90 p-6 shadow-xl shadow-primary/10 backdrop-blur-md max-md:m-2">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>

            <p className="mt-2 font-light text-muted">
              Enter your credentials to access your admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full text-muted">
            {error && (
              <p
                role="alert"
                className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col">
              <label htmlFor="email" className="text-text">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your email id"
                className="mb-6 rounded border-b-2 border-border bg-white/70 p-3 outline-none transition focus:border-primary"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-text">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="your password"
                className="mb-6 rounded border-b-2 border-border bg-white/70 p-3 outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-primary py-3 font-medium text-white transition-all hover:bg-hover disabled:cursor-not-allowed disabled:opacity-60"
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
