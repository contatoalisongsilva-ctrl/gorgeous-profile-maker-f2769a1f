import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ArrowLeft } from "lucide-react";
import jewelryModel from "@/assets/jewelry-model.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JewelryPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JewelryPopup = ({ open, onOpenChange }: JewelryPopupProps) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const handleClose = () => {
    setExpandedImage(null);
    onOpenChange(false);
  };

  const toggleImage = (imageSrc: string) => {
    if (expandedImage === imageSrc) {
      setExpandedImage(null);
    } else {
      setExpandedImage(imageSrc);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[calc(100%-3rem)] sm:max-w-md p-0 overflow-hidden border-0 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 [&>button]:hidden">
        {/* Expanded Image Overlay */}
        {expandedImage && (
          <div 
            className="absolute inset-0 z-20 bg-white/95 flex items-center justify-center p-4 animate-fade-in cursor-pointer"
            onClick={() => setExpandedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
              className="absolute top-4 right-4 z-30 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
            <img
              src={expandedImage}
              alt="Joia 18K"
              className="max-w-full max-h-full object-contain rounded-xl shadow-xl animate-scale-in"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
            />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white hover:shadow-lg transition-all border border-primary/10"
        >
          <X className="w-4 h-4 text-foreground/70" />
        </button>

        {/* Content */}
        <div className="px-5 py-5 space-y-4">
          {/* Logo Text */}
          <p className="text-center text-lg font-bold text-primary tracking-wide">
            New Hair Vitamin
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Comprando o kit de 6 unidades, você ganha este lindo conjunto de <span className="text-primary font-semibold">Colar + Brincos</span> banhados a ouro 18K!
          </p>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggleImage(jewelryBox)}
              className="relative rounded-xl overflow-hidden shadow-lg border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={jewelryBox}
                alt="Conjunto Joia 18K na caixa"
                className="w-full aspect-square object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs font-medium text-center">Conjunto Completo</p>
              </div>
            </button>
            <button
              onClick={() => toggleImage(jewelryModel)}
              className="relative rounded-xl overflow-hidden shadow-lg border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <img
                src={jewelryModel}
                alt="Modelo usando a Joia 18K"
                className="w-full aspect-square object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs font-medium text-center">Elegância Garantida</p>
              </div>
            </button>
          </div>

          {/* Description */}
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <p className="text-xs text-primary text-center leading-relaxed font-medium">
              ✨ Banhado a ouro 18K • Design exclusivo • Hipoalergênico
            </p>
          </div>

          {/* Back Button */}
          <Button
            onClick={handleClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JewelryPopup;
