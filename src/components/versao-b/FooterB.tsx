import { Star, Users, Award, CheckCircle } from "lucide-react";
import logoWhite from "@/assets/renova-be-logo-white.png";

const FooterB = () => {
  return (
    <footer className="bg-foreground text-white py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <img 
            src={logoWhite} 
            alt="Renova Be" 
            className="h-10 mx-auto mb-6"
            loading="lazy"
          />
          
          <p className="text-white/60 text-sm mb-6">
            Cosmecêuticos de alta performance em que você pode confiar.
          </p>

          {/* Authority Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold text-sm">+22.000</span>
              <span className="text-white/50 text-xs">clientes satisfeitas</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold text-sm">4.8⭐</span>
              <span className="text-white/50 text-xs">avaliação média</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold text-sm">Verisol®</span>
              <span className="text-white/50 text-xs">tecnologia certificada</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold text-sm">Aprovada</span>
              <span className="text-white/50 text-xs">fórmula testada</span>
            </div>
          </div>

          {/* Legal */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Renova Be. Todos os direitos reservados.
            </p>
            <p className="text-white/30 text-[10px] mt-2">
              *Resultados podem variar de pessoa para pessoa. Imagens meramente ilustrativas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterB;
