import { useState, useRef, useEffect, forwardRef, useImperativeHandle, memo } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  poster?: string;
  onLoadedData?: () => void;
}

const LazyVideo = memo(forwardRef<HTMLVideoElement, LazyVideoProps>(({ 
  src, 
  className = "",
  loop = false,
  muted = true,
  playsInline = true,
  autoPlay = false,
  poster,
  onLoadedData
}, ref) => {
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoad(true);
        } else {
          setIsInView(false);
          // Pause video when out of view to save resources
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { 
        rootMargin: "50px",
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play when in view
  useEffect(() => {
    if (isInView && autoPlay && videoRef.current && shouldLoad) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView, autoPlay, shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          preload="metadata"
          onLoadedData={onLoadedData}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}));

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;