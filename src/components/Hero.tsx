import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    const tl = gsap.timeline({
      paused: true,
    });

    tl.to("#hero", {
      opacity: 1,
      y: 0,
      duration: 1,
    })
      .to("#hero-video", {
        opacity: 1,
        duration: 0.5,
      })
      .to("#cta", {
        opacity: 1,
        y: 0,
        duration: 1,
      });

    ScrollTrigger.create({
      trigger: "#hero-video",

      onEnter: () => {
        tl.restart();

        if (videoRef.current) {
          if (videoRef.current.ended) {
            videoRef.current.currentTime = 0;
          }
          videoRef.current.play();
        }
      },

      onLeave: () => {
        videoRef.current?.pause();
      },

      onEnterBack: () => {
        tl.restart();

        if (videoRef.current) {
          if (videoRef.current.ended) {
            videoRef.current.currentTime = 0;
          }
          videoRef.current.play();
        }
      },

      onLeaveBack: () => {
        videoRef.current?.pause();
      },
    });
  });
  return (
    <section className="w-full nav-height bg-black relative pb-5">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title" id="hero">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            src={videoSrc}
            ref={videoRef}
            id="hero-video"
            autoPlay
            muted
            playsInline={true}
            className="pointer-events-none"
          />
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
