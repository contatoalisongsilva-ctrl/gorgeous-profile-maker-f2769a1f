import {
  Check,
  Star,
  Truck,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Droplets,
  Pill,
  TrendingDown,
  Heart,
  Waves,
  Clock,
  X,
  ChevronLeft,
  Volume2,
  VolumeX,
  ShoppingBag,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import ReviewsPopup from "./ReviewsPopup";
import JewelryPopup from "./JewelryPopup";
import productImage from "@/assets/product-woman.jpg";
import storyVideo1 from "@/assets/story-video-1.mp4";
import storyVideo2 from "@/assets/story-video-2.mp4";
import storyVideo3 from "@/assets/story-video-3.mp4";
import storyVideo4 from "@/assets/story-video-4.mp4";
import storyVideo5 from "@/assets/story-video-5.mp4";
import newhairLogo from "@/assets/newhair-logo.jpeg";
import productCarousel1 from "@/assets/product-carousel-1.jpg";
import productCarousel2 from "@/assets/product-carousel-2.jpg";
import productCarousel3 from "@/assets/product-carousel-3.jpg";
import newHairLogoWhite from "@/assets/new-hair-logo-white.png";
import giftJewelry from "@/assets/gift-jewelry-clean.png";
import { useSelectedKit } from "@/contexts/SelectedKitContext";
import ShopifyKitButton from "./ShopifyKitButton";

// Função para calcular datas de entrega (2 a 7 dias a partir de hoje)
const getDeliveryDates = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 2);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);
  
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    return `${day} de ${months[date.getMonth()]}`;
  };
  
  return {
    start: formatDate(startDate),
    end: formatDate(endDate)
  };
};

interface Story {
  id: number;
  videoUrl: string;
}

const productImages = [
  { src: productCarousel1, alt: "New Hair Vitamina - Mão segurando produto" },
  { src: productCarousel2, alt: "New Hair Vitamina - Lifestyle" },
  { src: productCarousel3, alt: "New Hair Vitamina - Uso diário" },
];

const HeroSection = () => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedKit();
  const [storyQuantity, setStoryQuantity] = useState<1 | 3 | 6>(3);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPurchaseBox, setShowPurchaseBox] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [showJewelry, setShowJewelry] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Swipe states for stories
  const [swipeStartY, setSwipeStartY] = useState<number | null>(null);
  const [swipeCurrentY, setSwipeCurrentY] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Swipe states for product carousel
  const [carouselSwipeStartX, setCarouselSwipeStartX] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const desktopCarouselRef = useRef<HTMLDivElement>(null);

  const stories: Story[] = [
    { id: 1, videoUrl: storyVideo1 },
    { id: 2, videoUrl: storyVideo2 },
    { id: 3, videoUrl: storyVideo3 },
    { id: 4, videoUrl: storyVideo4 },
    { id: 5, videoUrl: storyVideo5 },
  ];

  // Track video watch time
  useEffect(() => {
    if (!selectedStory) {
      setWatchTime(0);
      setShowPurchaseBox(false);
      return;
    }

    const interval = setInterval(() => {
      setWatchTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= 12 && !showPurchaseBox) {
          setShowPurchaseBox(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedStory, showPurchaseBox]);

  // Reset watch time and progress when changing stories
  useEffect(() => {
    setWatchTime(0);
    setShowPurchaseBox(false);
    setVideoProgress(0);
    setIsPaused(false);
  }, [currentIndex]);

  // Play video when story opens or changes
  useEffect(() => {
    if (selectedStory && videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails (browser policy), try muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, [selectedStory, currentIndex]);

  const openStory = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
    setWatchTime(0);
    setShowPurchaseBox(false);
    setVideoProgress(0);
    setIsPaused(false);
    setIsMuted(false);
  };

  const closeStory = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedStory(null);
      setIsMuted(false);
      setWatchTime(0);
      setShowPurchaseBox(false);
      setVideoProgress(0);
      setIsPaused(false);
      setIsClosing(false);
      setSwipeStartY(null);
      setSwipeCurrentY(null);
    }, 200);
  }, []);

  // Swipe handlers for stories
  const handleStoryTouchStart = (e: React.TouchEvent) => {
    setSwipeStartY(e.touches[0].clientY);
    setSwipeCurrentY(e.touches[0].clientY);
  };

  const handleStoryTouchMove = (e: React.TouchEvent) => {
    if (swipeStartY === null) return;
    setSwipeCurrentY(e.touches[0].clientY);
  };

  const handleStoryTouchEnd = () => {
    if (swipeStartY === null || swipeCurrentY === null) return;

    const deltaY = swipeCurrentY - swipeStartY;
    const threshold = 100;

    if (Math.abs(deltaY) > threshold) {
      closeStory();
    }

    setSwipeStartY(null);
    setSwipeCurrentY(null);
  };

  const getSwipeTransform = () => {
    if (swipeStartY === null || swipeCurrentY === null) return 0;
    return swipeCurrentY - swipeStartY;
  };

  // Swipe handlers for product carousel
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    setCarouselSwipeStartX(e.touches[0].clientX);
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    if (carouselSwipeStartX === null) return;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - carouselSwipeStartX;
    const threshold = 50;

    if (deltaX > threshold && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    } else if (deltaX < -threshold && currentImageIndex < productImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }

    setCarouselSwipeStartX(null);
  };

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedStory(stories[currentIndex + 1]);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedStory(stories[currentIndex - 1]);
    }
  };

  const handleStoryPurchase = () => {
    // TODO: Integrate with payment system
    console.log("Purchase from story:", storyQuantity);
    alert(`Compra iniciada: ${storyQuantity === 1 ? "1 Unidade" : storyQuantity === 3 ? "3 Unidades" : "6 Unidades"}`);
  };

  const storyQuantities = [
    { value: 1 as const, label: "30 dias", price: "R$ 97,05" },
    { value: 3 as const, label: "3 meses", price: "R$ 173,05", discount: "15% OFF", popular: true },
    { value: 6 as const, label: "6 meses", price: "R$ 313,22", discount: "25% OFF" },
  ];

  const quantities = [
    {
      value: 1 as const,
      label: "Tratamento 30 dias",
      sublabel: "1 Unidade",
      price: "R$ 97,05",
      originalPrice: null,
      priceEach: "R$ 97,05",
    },
    {
      value: 3 as const,
      label: "Tratamento 3 meses",
      sublabel: "3 Unidades",
      price: "R$ 173,05",
      originalPrice: "R$ 227,70",
      priceEach: "R$ 57,68",
      discount: "15% OFF",
      popular: true,
    },
    {
      value: 6 as const,
      label: "Tratamento 6 meses",
      sublabel: "6 Unidades + Joia",
      price: "R$ 313,22",
      originalPrice: "R$ 627,70",
      priceEach: "R$ 52,20",
      discount: "25% OFF",
      bestValue: true,
    },
  ];

  const features = [
    { label: "Ácido Hialurônico", icon: Droplets },
    { label: "Biotina", icon: Pill },
    { label: "Reduz Queda", icon: TrendingDown },
    { label: "Fortalece Unhas", icon: Heart },
    { label: "Hidrata Pele", icon: Waves },
    { label: "Resultado em 4 Semanas", icon: Clock },
  ];

  return (
    <section className="min-h-screen overflow-x-hidden">
      {/* Logo Header */}
      <div className="bg-[#DB4987] py-3 w-full">
        <div className="container mx-auto px-4 flex justify-center">
          <img src={newHairLogoWhite} alt="New Hair Vitamin" className="h-8 md:h-10 object-contain" />
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-white border-b border-border py-2 text-center text-xs md:text-sm font-medium overflow-hidden w-full">
        <div className="flex animate-scroll-x whitespace-nowrap">
          <div className="flex items-center">
            <span className="text-[#333333]">Frete Grátis acima de R$ 199</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">10% Cashback em todas as compras</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">Vitamina Capilar Completa</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">Resultados em até 4 semanas</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#333333]">Frete Grátis acima de R$ 199</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">10% Cashback em todas as compras</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">Vitamina Capilar Completa</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
            <span className="text-[#333333]">Resultados em até 4 semanas</span>
            <span className="mx-3 md:mx-4 text-[#DB4987]">•</span>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="bg-white py-4 border-b border-border w-full">
        <div className="container mx-auto px-4 max-w-full overflow-hidden">
          <div className="flex justify-start md:justify-center gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story, index) => (
              <button key={story.id} onClick={() => openStory(story, index)} className="flex-shrink-0 group">
                <div className="relative p-[2px] md:p-[3px] rounded-full bg-gradient-to-tr from-primary via-accent to-primary">
                  <div className="p-[2px] bg-white rounded-full overflow-hidden relative">
                    <video
                      src={`${story.videoUrl}#t=1`}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-full">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-primary border-b-[5px] border-b-transparent ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Modal - Full Screen */}
      {selectedStory && (
        <div
          className={`fixed inset-0 z-50 bg-black transition-all duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
          onTouchStart={handleStoryTouchStart}
          onTouchMove={handleStoryTouchMove}
          onTouchEnd={handleStoryTouchEnd}
          style={{
            transform: `translateY(${getSwipeTransform()}px)`,
            transition: swipeStartY === null ? "transform 0.2s ease-out" : "none",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Progress bars */}
            <div className="absolute top-3 left-3 right-3 z-20 flex gap-1 safe-area-inset-top">
              {stories.map((_, idx) => (
                <div key={idx} className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100"
                    style={{
                      width: idx < currentIndex ? "100%" : idx === currentIndex ? `${videoProgress}%` : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between safe-area-inset-top">
              <div className="flex items-center gap-3">
                <img
                  src={newhairLogo}
                  alt="New Hair Vitamin"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <span className="text-white font-medium text-sm">newhairvitamin</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (isPaused) {
                        videoRef.current.play();
                      } else {
                        videoRef.current.pause();
                      }
                      setIsPaused(!isPaused);
                    }
                  }}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={closeStory}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video - Full Screen */}
            <video
              ref={videoRef}
              key={selectedStory.id}
              src={selectedStory.videoUrl}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={nextStory}
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.duration) {
                  setVideoProgress((video.currentTime / video.duration) * 100);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Navigation - Instagram style: left half = prev, right half = next */}
            {currentIndex > 0 && <button onClick={prevStory} className="absolute left-0 top-0 bottom-0 w-1/2 z-10" />}
            {currentIndex === 0 && <div className="absolute left-0 top-0 bottom-0 w-1/2 z-10" />}
            <button onClick={nextStory} className="absolute right-0 top-0 bottom-0 w-1/2 z-10" />

            {/* Purchase Box - appears after 12 seconds */}
            {showPurchaseBox && (
              <div className="absolute bottom-8 left-4 right-4 z-30 animate-fade-in safe-area-inset-bottom">
                <div className="bg-white rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Aproveite a oferta!</span>
                  </div>

                  {/* Kit Selection */}
                  <div className="flex gap-2 mb-3">
                    {storyQuantities.map((qty) => (
                      <button
                        key={qty.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStoryQuantity(qty.value);
                        }}
                        className={`flex-1 p-2 rounded-xl border-2 text-center transition-all relative ${
                          storyQuantity === qty.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {qty.discount && (
                          <span className="absolute -top-2 right-1 bg-accent text-accent-foreground text-[8px] px-1 py-0.5 rounded-full font-semibold">
                            {qty.discount}
                          </span>
                        )}
                        <div className="font-semibold text-foreground text-xs">{qty.label}</div>
                        <div className="text-[10px] text-primary font-medium">{qty.price}</div>
                      </button>
                    ))}
                  </div>

                  {/* Shopify Kit Buy Button */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <ShopifyKitButton 
                      kitType={storyQuantity === 1 ? "1-pote" : storyQuantity === 3 ? "3-potes" : "6-potes"} 
                    />
                  </div>

                  {storyQuantity === 6 && (
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      Frete grátis • Entrega em 3-5 dias
                    </p>
                  )}
                  {storyQuantity !== 6 && (
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      Entrega em 3-5 dias
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="hero-gradient py-4 md:py-6 w-full">
        {/* Mobile Title - Above Image */}
        <div className="lg:hidden px-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-primary text-primary-foreground text-[9px] px-2 py-0.5 rounded font-semibold uppercase shrink-0">
              Mais Vendido
            </span>
            <span className="text-xs text-primary font-medium">Nº1 em Tratamento Contra Queda Capilar</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground leading-tight">New Hair Vitamin</h1>
          <h2 className="font-display text-xl font-bold text-gradient leading-tight">+ Ácido Hialurônico</h2>
        </div>

        {/* Product Image Carousel - With swipe support */}
        <div className="px-4 mb-4 lg:hidden">
          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden rounded-xl touch-pan-y"
            onTouchStart={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {productImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={image.src} alt={image.alt} className="w-full h-[380px] object-cover object-[center_30%]" />
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            {currentImageIndex > 0 && (
              <button
                onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}
            {currentImageIndex < productImages.length - 1 && (
              <button
                onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          {/* Sales and Reviews Bar - Below product image (mobile) */}
          <div className="flex items-center justify-between gap-2 mt-4 mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-primary">+387.690 vendas</span>
            </div>
            <button
              onClick={() => setShowReviews(true)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">(88.354)</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-3 md:px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {/* Desktop Product Image - With swipe support - extends full height */}
            <div
              ref={desktopCarouselRef}
              className="hidden lg:flex relative w-full overflow-hidden rounded-2xl self-stretch"
              onTouchStart={handleCarouselTouchStart}
              onTouchEnd={handleCarouselTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out w-full h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {productImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full min-h-[700px] object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentImageIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              {currentImageIndex > 0 && (
                <button
                  onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}
              {currentImageIndex < productImages.length - 1 && (
                <button
                  onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="space-y-3 md:space-y-4 w-full min-w-0 pt-2 lg:pt-0">
              {/* Mais Vendido Badge - Desktop only */}
              <div className="hidden lg:flex flex-wrap items-center gap-2">
                <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded font-semibold uppercase shrink-0">
                  Mais Vendido
                </span>
                <span className="text-sm text-primary font-medium">Nº1 em Tratamento Contra Queda Capilar</span>
              </div>

              <div className="hidden lg:block">
                <h1 className="font-display text-4xl font-bold text-foreground leading-tight mb-1">New Hair Vitamin</h1>
                <h2 className="font-display text-3xl font-bold text-gradient leading-tight">+ Ácido Hialurônico</h2>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                A primeira fórmula que une a redução da queda com a potência do Ácido Hialurônico. O tratamento que
                nutre e hidrata desde a raiz às pontas.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground">4.8/5</span>
              </div>

              {/* Feature Pills Carousel */}
              <div className="relative overflow-hidden w-full">
                <div className="flex animate-scroll-x gap-2 md:gap-4 w-max">
                  {[...features, ...features].map((feature, index) => (
                    <div
                      key={`${feature.label}-${index}`}
                      className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-4 py-1.5 md:py-2 glass-card rounded-full whitespace-nowrap shrink-0"
                    >
                      <feature.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      <span className="text-xs md:text-sm font-medium text-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Card - Mercado Livre Style */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-border/50 overflow-hidden w-full">
                {/* Price Header */}
                <div className="p-4 md:p-6 border-b border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    {quantities.find((q) => q.value === selectedQuantity)?.originalPrice && (
                      <span className="text-sm md:text-base text-muted-foreground line-through">
                        {quantities.find((q) => q.value === selectedQuantity)?.originalPrice}
                      </span>
                    )}
                    {quantities.find((q) => q.value === selectedQuantity)?.discount && (
                      <span className="bg-black text-white text-[10px] md:text-xs px-2 py-0.5 rounded font-bold">
                        {quantities.find((q) => q.value === selectedQuantity)?.discount}
                      </span>
                    )}
                    {selectedQuantity === 6 && (
                      <span className="bg-accent text-accent-foreground text-[10px] md:text-xs px-2 py-0.5 rounded font-bold">
                        Frete Grátis
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-foreground text-3xl md:text-4xl">
                      {quantities.find((q) => q.value === selectedQuantity)?.price}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    ou 6x de{" "}
                    <strong>
                      R${" "}
                      {(
                        parseFloat(
                          quantities
                            .find((q) => q.value === selectedQuantity)
                            ?.price.replace("R$ ", "")
                            .replace(",", ".") || "0",
                        ) / 6
                      )
                        .toFixed(2)
                        .replace(".", ",")}
                    </strong>{" "}
                    sem juros
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 bg-accent/10 text-accent-foreground px-2 py-1.5 rounded-lg w-fit">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-xs font-medium">Receba de Volta 10% em Cashback</span>
                  </div>
                  
                  {/* Gift Banner for 6 potes */}
                  {selectedQuantity === 6 && (
                    <button
                      onClick={() => setShowJewelry(true)}
                      className="mt-3 w-full bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-3 hover:from-primary/20 hover:to-primary/15 transition-all group cursor-pointer"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-white rounded-lg p-1">
                        <img src={giftJewelry} alt="Joia 18K" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-sm md:text-base text-primary">COMPRE O KIT E GANHE</p>
                        <p className="text-xs md:text-sm text-foreground/80">Uma <span className="text-primary font-semibold">Joia 18K</span> de Brinde!</p>
                      </div>
                      <span className="text-xs text-primary underline group-hover:text-primary/80 shrink-0">clique para ver</span>
                    </button>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="p-4 md:p-6">
                  <p className="text-sm md:text-base font-semibold text-foreground mb-3">Escolha a quantidade:</p>
                  <div className="space-y-2">
                    {quantities.map((qty) => (
                      <button
                        key={qty.value}
                        onClick={() => setSelectedQuantity(qty.value)}
                        className={`relative w-full p-3 md:p-4 rounded-lg border-2 text-left transition-all ${
                          selectedQuantity === qty.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50 bg-white"
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  selectedQuantity === qty.value ? "border-primary bg-primary" : "border-muted-foreground"
                                }`}
                              >
                                {selectedQuantity === qty.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <div>
                                <div className="font-semibold text-foreground text-sm md:text-base">{qty.label}</div>
                                <div className="text-[10px] md:text-xs text-muted-foreground">
                                  {qty.sublabel} • <span className="text-primary font-medium">{qty.priceEach}/pote</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <div className="flex items-center gap-1.5 md:gap-2">
                                {qty.discount && (
                                  <span className="bg-black text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-bold whitespace-nowrap">
                                    {qty.discount}
                                  </span>
                                )}
                                {qty.popular && (
                                  <span className="bg-accent text-accent-foreground text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-bold whitespace-nowrap">
                                    MAIS VENDIDO
                                  </span>
                                )}
                                {qty.bestValue && (
                                  <span className="bg-emerald-500 text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-bold whitespace-nowrap">
                                    MAIS EM CONTA
                                  </span>
                                )}
                              </div>
                              {qty.bestValue && (
                                <span className="bg-primary text-primary-foreground text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded font-bold whitespace-nowrap flex items-center gap-1">
                                  <img src={giftJewelry} alt="" className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full object-cover" />
                                  BRINDE JOIA 18K
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Shopify Kit Buy Button */}
                  <div id="primary-buy-button">
                    <ShopifyKitButton 
                      kitType={selectedQuantity === 1 ? "1-pote" : selectedQuantity === 3 ? "3-potes" : "6-potes"} 
                    />
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span>Compra Segura</span>
                    </div>
                    {selectedQuantity === 6 && (
                      <div className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-primary" />
                        <span>Frete Grátis</span>
                      </div>
                    )}
                  </div>

                  {/* Delivery Info */}
                  {selectedQuantity === 6 && (
                    <div className="flex items-center gap-2 text-xs md:text-sm text-foreground bg-accent/10 p-3 md:p-4 rounded-xl mt-4">
                      <Truck className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                      <span>
                        Chegará <strong className="text-accent">Grátis</strong> entre {getDeliveryDates().start} e {getDeliveryDates().end}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 md:mt-16 max-w-xl mx-auto space-y-2 md:space-y-3">
            {[
              { title: "Descubra se é para você", subtitle: "Veja se o produto atende seu caso", anchor: "#problema" },
              { title: "A ciência por trás", subtitle: "Conheça a fórmula", anchor: "#formula" },
              { title: "Como e quando usar", subtitle: "Modo de uso e resultados", anchor: "#como-usar" },
              { title: "Depoimentos reais", subtitle: "Veja quem já usou", anchor: "#depoimentos" },
              { title: "Porque o New Hair é o Nº1", subtitle: "Descubra os motivos", anchor: "#comparativo" },
            ].map((tab) => (
              <a
                key={tab.title}
                href={tab.anchor}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(tab.anchor);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="flex items-center justify-between p-3 md:p-4 glass-card-hover rounded-lg md:rounded-xl group cursor-pointer"
              >
                <div>
                  <div className="font-medium text-foreground text-xs md:text-sm">{tab.title}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">{tab.subtitle}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <ReviewsPopup open={showReviews} onOpenChange={setShowReviews} />
      <JewelryPopup open={showJewelry} onOpenChange={setShowJewelry} />
    </section>
  );
};

export default HeroSection;
