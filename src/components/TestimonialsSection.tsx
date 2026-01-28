import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Pause } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import depoimento1 from "@/assets/depoimento-1.mp4";
import depoimento2 from "@/assets/depoimento-2.mp4";
import depoimento3 from "@/assets/depoimento-3.mp4";
import depoimento4 from "@/assets/depoimento-4.mp4";
const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set([0, 1, 2, 3]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1
  });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Force load first frame on all videos for mobile preview
  useEffect(() => {
    const loadVideoFrames = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.load();
          video.currentTime = 0.1;
        }
      });
    };
    
    // Small delay to ensure videos are mounted
    const timer = setTimeout(loadVideoFrames, 100);
    return () => clearTimeout(timer);
  }, []);
  const stats = [{
    value: "22.000+",
    label: "Clientes satisfeitos"
  }, {
    value: "4.9/5",
    label: "Avaliação média"
  }, {
    value: "98%",
    label: "Recomendam"
  }];
  const videos = [{
    id: 0,
    src: depoimento1
  }, {
    id: 1,
    src: depoimento2
  }, {
    id: 2,
    src: depoimento3
  }, {
    id: 3,
    src: depoimento4
  }];
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
  return <section className="py-10 md:py-12 bg-secondary" id="depoimentos">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Depoimentos
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            O que nossas embaixadoras dizem
          </h2>
        </div>

        {/* Video Stories Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -ml-2 md:-ml-5">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex">
              {videos.map((video, index) => <div key={video.id} className="flex-[0_0_80%] md:flex-[0_0_33%] min-w-0 px-2">
                  <div className="relative rounded-[2rem] overflow-hidden bg-muted aspect-[9/16] group cursor-pointer shadow-xl" onClick={() => handlePlayPause(index)}>
                    {/* Loading background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted/80" />
                    
                    {/* Video */}
                    <video 
                      ref={el => videoRefs.current[index] = el} 
                      src={video.src} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      loop 
                      muted={mutedVideos.has(index)} 
                      playsInline 
                      preload="auto"
                      onLoadedData={(e) => {
                        // Seek to first frame for preview on mobile
                        const videoEl = e.currentTarget;
                        videoEl.currentTime = 0.1;
                      }}
                      onSeeked={(e) => {
                        // Keep video paused after seeking for preview
                        const videoEl = e.currentTarget;
                        if (playingVideo !== index) {
                          videoEl.pause();
                        }
                      }}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                    {/* Play button - shows when not playing */}
                    {playingVideo !== index && <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-primary ml-1" fill="hsl(var(--primary))" />
                        </div>
                      </div>}

                    {/* Controls overlay - shows when playing */}
                    {playingVideo === index && <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <button onClick={e => {
                    e.stopPropagation();
                    handlePlayPause(index);
                  }} className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors">
                          <Pause className="w-5 h-5 text-white" />
                        </button>

                        <button onClick={e => toggleMute(index, e)} className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors">
                          {mutedVideos.has(index) ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                        </button>
                      </div>}
                  </div>
                </div>)}
            </div>
          </div>

          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -mr-2 md:-mr-5">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {videos.map((_, i) => <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-2 rounded-full transition-all ${i === selectedIndex ? "bg-primary w-8" : "bg-primary/30 w-2"}`} />)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;