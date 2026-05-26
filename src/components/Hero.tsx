import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo,
  );

  function handleResize() {
    if (window.innerWidth < 768) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, y: 0, duration: 1, delay: 2.5 });
    gsap.to("#cta", { opacity: 1, y: 0, duration: 1, delay: 2.5 });
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
            autoPlay
            muted
            playsInline={true}
            className="pointer-events-none"
          />
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
         <a href="#highlights" className="btn">Buy</a>
         <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
