import { lazy, Suspense, useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

const Model = lazy(() => import("./components/Model"));

export default function App() {
  const modelRef = useRef<HTMLDivElement>(null);

  const [shouldLoadModel, setShouldLoadModel] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadModel(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.5,
      },
    );

    if (modelRef.current) {
      observer.observe(modelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />

      <div ref={modelRef}>
        {shouldLoadModel ? (
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <Model />
          </Suspense>
        ) : (
          <div className="h-screen bg-black" />
        )}
      </div>

      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
