import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

type ProcessType =
  | "video-end"
  | "video-last"
  | "video-reset"
  | "pause"
  | "play";

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<boolean[]>(() =>
    Array(hightlightsSlides.length).fill(false),
  );
  const { isEnd, isLastVideo, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to(".slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(".video", {
      scrollTrigger: {
        trigger: ".video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current[videoId];
    const div = videoDivRef.current[videoId];
    let anim: gsap.core.Tween | null = null;

    if (span && div) {
      anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(anim!.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(div, {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                    ? "10vw"
                    : "4vw",
            });

            gsap.to(span, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(div, {
              width: "12px",
            });
            gsap.to(span, {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      const animUpdate = () => {
        const video = videoRef.current[videoId];
        const duration = hightlightsSlides[videoId]?.videoDuration;

        if (!video || !duration) return;

        anim!.progress(video.currentTime / duration);
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
        anim?.kill();
      };
    }

    return undefined;
  }, [videoId, isPlaying]);

  useEffect(() => {
    if (loadedData.every(Boolean)) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        videoRef.current[videoId]?.play();
      }
    }
  }, [isPlaying, videoId, loadedData]);

  const handleProcess = (type: ProcessType, i: number) => {
    if (type === "video-end") {
      setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
    } else if (type === "video-last") {
      setVideo((pre) => ({ ...pre, isLastVideo: true }));
    } else if (type === "video-reset") {
      videoRef.current.forEach((video) => {
        if (video) {
          video.currentTime = 0;
        }
      });
      setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
    } else if (type === "pause") {
      setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
    } else if (type === "play") {
      setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
    }
  };

  const handleLoadedMetaData = (i: number) =>
    setLoadedData((pre) => {
      const next = [...pre];
      next[i] = true;
      return next;
    });

  function handleSlideChange(i: number) {
    if (i === videoId) return;

    const currentVideo = videoRef.current[videoId];
    const currentDot = videoDivRef.current[videoId];
    const currentSpan = videoSpanRef.current[videoId];

    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    if (currentDot) {
      gsap.to(currentDot, {
        width: "12px",
      });
    }

    if (currentSpan) {
      gsap.to(currentSpan, {
        width: "0%",
        backgroundColor: "#afafaf",
      });
    }

    setVideo((pre) => ({
      ...pre,
      videoId: i,
      isEnd: false,
      isLastVideo: false,
    }));
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} className="sm:pr-20 pr-10 slider">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  playsInline={true}
                  className={`video ${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => {
                    if (el) videoRef.current[i] = el;
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last", i)
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={() => handleLoadedMetaData(i)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => {
                if (el) videoDivRef.current[i] = el;
              }}
              onClick={() => handleSlideChange(i)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  if (el) videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset", 0)
                : !isPlaying
                  ? () => handleProcess("play", 0)
                  : () => handleProcess("pause", 0)
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
