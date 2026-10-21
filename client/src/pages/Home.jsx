import { useEffect, useRef } from "react";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

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
      } catch (error) {
        console.error("Vanta Birds initialization failed:", error);
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

  return (
    <div ref={vantaRef} className="relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <Header />
        <BlogList />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
