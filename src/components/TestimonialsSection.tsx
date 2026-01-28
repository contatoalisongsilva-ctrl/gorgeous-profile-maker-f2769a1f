import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Pause } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import depoimento2 from "@/assets/depoimento-2.mp4";
import depoimento3 from "@/assets/depoimento-3.mp4";

const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set([0, 1]));
  const [sectionInView, setSectionInView] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const videos = [
    { id: 0, src: depoimento2 },
    { id: 1, src: depoimento3 },
  ];

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.scrollWidth / videos.length;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    setSelectedIndex(index);
  }, [videos.length]);

  const scrollPrev = useCallback(() => {
    const newIndex = selectedIndex === 0 ? videos.length - 1 : selectedIndex - 1;
    scrollTo(newIndex);
  }, [selectedIndex, videos.length, scrollTo]);

  const scrollNext = useCallback(() => {
    const newIndex = selectedIndex === videos.length - 1 ? 0 : selectedIndex + 1;
    scrollTo(newIndex);
  }, [selectedIndex, videos.length, scrollTo]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.scrollWidth / videos.length;
    const newIndex = Math.round(container.scrollLeft / slideWidth);
    if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < videos.length) {
      setSelectedIndex(newIndex);
    }
  }, [videos.length, selectedIndex]);

  // Lazy load section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load first frame when video is loaded
  const handleVideoLoaded = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0.1;
    }
  };

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (playingVideo === index) {
      video.pause();
      setPlayingVideo(null);
    } else {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
          v.currentTime = 0;
        }
      });
      video.play();
      setPlayingVideo(index);
    }
  };

  const toggleMute = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;
    const newMuted = new Set(mutedVideos);
    if (mutedVideos.has(index)) {
      newMuted.delete(index);
      video.muted = false;
    } else {
      newMuted.add(index);
      video.muted = true;
    }
    setMutedVideos(newMuted);
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-12 bg-secondary" id="depoimentos">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Depoimentos
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            O que nossas embaixadoras dizem
          </h2>
        </div>

        {/* Video Stories Carousel with Native Scroll-Snap */}
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={scrollPrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -ml-2 md:-ml-5"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className="flex-shrink-0 w-[80%] md:w-[33%] snap-center"
              >
                <div 
                  className="relative rounded-[2rem] overflow-hidden bg-muted aspect-[9/16] group cursor-pointer shadow-xl" 
                  onClick={() => handlePlayPause(index)}
                >
                  {/* Loading background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted/80" />
                  
                  {/* Video - only load when section is in view */}
                  {sectionInView && (
                    <video 
                      ref={el => videoRefs.current[index] = el} 
                      src={video.src} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      loop 
                      muted={mutedVideos.has(index)} 
                      playsInline 
                      preload="metadata"
                      onLoadedData={() => handleVideoLoaded(index)}
                    />
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                  {/* Play button - shows when not playing */}
                  {playingVideo !== index && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-primary ml-1" fill="hsl(var(--primary))" />
                      </div>
                    </div>
                  )}

                  {/* Controls overlay - shows when playing */}
                  {playingVideo === index && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <button 
                        onClick={e => {
                          e.stopPropagation();
                          handlePlayPause(index);
                        }} 
                        className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <Pause className="w-5 h-5 text-white" />
                      </button>

                      <button 
                        onClick={e => toggleMute(index, e)} 
                        className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        {mutedVideos.has(index) ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -mr-2 md:-mr-5"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {videos.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollTo(i)} 
              className={`h-2 rounded-full transition-all ${i === selectedIndex ? "bg-primary w-8" : "bg-primary/30 w-2"}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
