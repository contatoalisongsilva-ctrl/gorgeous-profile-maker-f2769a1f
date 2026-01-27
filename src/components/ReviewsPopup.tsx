import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, X } from "lucide-react";
import reviewBeforeAfter1 from "@/assets/review-before-after-1.png";
import reviewBeforeAfter2 from "@/assets/review-before-after-2.png";
import reviewBeforeAfter3 from "@/assets/review-before-after-3.png";
import reviewBeforeAfter4 from "@/assets/review-before-after-4.png";

interface ReviewsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reviews = [
  {
    id: 1,
    name: "Camila S.",
    rating: 5,
    text: "Após 3 meses de uso, meus fios cresceram muito e ficaram mais grossos! Recomendo demais.",
    image: reviewBeforeAfter1,
  },
  {
    id: 2,
    name: "Juliana M.",
    rating: 5,
    text: "Minha queda de cabelo parou completamente. Estou muito feliz com o resultado!",
    image: reviewBeforeAfter2,
  },
  {
    id: 3,
    name: "Fernanda L.",
    rating: 5,
    text: "Fios mais fortes e saudáveis. O antes e depois é impressionante!",
    image: reviewBeforeAfter3,
  },
  {
    id: 4,
    name: "Amanda R.",
    rating: 5,
    text: "Meu cabelo estava muito ralo e agora está com muito mais volume. Amei!",
    image: reviewBeforeAfter4,
  },
];

const ReviewsPopup = ({ open, onOpenChange }: ReviewsPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[calc(100%-3rem)] max-h-[85vh] p-0 overflow-hidden bg-white rounded-2xl mx-auto [&>button]:hidden">
        <DialogHeader className="p-4 border-b border-border sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold text-foreground">
              Avaliações dos Clientes
            </DialogTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.9</span>
            <span className="text-sm text-muted-foreground">(8.354 avaliações)</span>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-4 space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-muted/30 rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
              
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={review.image} 
                  alt={`Resultado de ${review.name}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 flex">
                  <div className="flex-1 bg-black/60 text-white text-center py-1 text-xs font-medium">
                    Antes
                  </div>
                  <div className="flex-1 bg-primary/80 text-white text-center py-1 text-xs font-medium">
                    Depois
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewsPopup;
