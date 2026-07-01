// import { lazy, Suspense } from "react";
// import Features from "./components/Features";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import Highlights from "./components/Highlights";
// import HowItWorks from "./components/HowItWorks";
// import Navbar from "./components/Navbar";

// const Model = lazy(() => import("./components/Model"));

// const App = () => {
//   return (
//     <main className="bg-black">
//       <Navbar />
//       <Hero />
//       <Highlights />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Model />
//       </Suspense>
//       <Features />
//       <HowItWorks />
//       <Footer />
//     </main>
//   );
// };

// export default App;
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
        rootMargin: "100px",
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
