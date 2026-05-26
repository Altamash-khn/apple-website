import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo,
  );
  useGSAP(() => {
    gsap.fromTo(
      "#hero",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
    );
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title" id="hero">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            src={videoSrc}
            typeof="video/mp4"
            autoPlay
            loop
            muted
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
