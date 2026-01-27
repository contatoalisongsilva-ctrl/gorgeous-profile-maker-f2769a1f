import {
  Droplets,
  Sparkles,
  Heart,
  Waves,
  Clock,
} from "lucide-react";
import { useState } from "react";
import ReviewsPopup from "./ReviewsPopup";
import heroBanner from "@/assets/hero-banner-new.jpeg";
import renovaBeLogo from "@/assets/renova-be-logo-white.png";

const features = [
  { label: "Colágeno Verisol®", icon: Sparkles },
  { label: "Ácido Hialurônico", icon: Droplets },
  { label: "Reduz Rugas", icon: Heart },
  { label: "Aumenta Firmeza", icon: Waves },
  { label: "Hidrata Profundamente", icon: Droplets },
  { label: "Resultado em 4 Semanas", icon: Clock },
];

const HeroSectionSimple = () => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <section className="overflow-x-hidden">
      {/* Logo Header */}
      <div className="bg-primary py-3 w-full">
        <div className="container mx-auto px-4 flex justify-center">
          <img 
            src={renovaBeLogo} 
            alt="Renova Be" 
            className="h-6 md:h-8 w-auto"
          />
        </div>
      </div>


      {/* Hero Banner - Image */}
      <div className="relative w-full">
        <img 
          src={heroBanner} 
          alt="Colágeno Renova Be - Sonha com uma pele mais firme e saudável?" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="hero-gradient py-3 md:py-4 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">

            {/* Feature Pills Carousel */}
            <div className="relative overflow-hidden w-full py-2">
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
          </div>
        </div>
      </div>

      <ReviewsPopup open={showReviews} onOpenChange={setShowReviews} />
    </section>
  );
};

export default HeroSectionSimple;
