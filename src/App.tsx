import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function App() {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from("#logo", {
      scale: 0,
      duration: 1,
      ease: "back.out(2)",
    })

      .from(
        "#title",
        {
          y: 100,
          opacity: 0,
          duration: 1,
        },
        "-=0.4",
      )

      .from("#button", {
        opacity: 0,
        scale: 0,
        duration: 0.6,
      });
  });

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <div id="logo" className="w-32 h-32 rounded-3xl bg-red-600"></div>

      <h1 id="title" className="text-5xl font-bold">
        NETFLIX
      </h1>

      <button id="button" className="px-6 py-3 bg-red-600 rounded-xl">
        Watch Now
      </button>
    </div>
  );
}
