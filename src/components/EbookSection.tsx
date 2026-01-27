import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";

const EbookSection = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center bg-card p-6 rounded-xl border border-border">
          <div className="w-12 h-12 rounded-full bg-[#DB4987] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            E-Book Gratuito
          </span>
          
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Guia: Cabelos Saudáveis
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            Dicas exclusivas para nutrir seus fios de dentro para fora
          </p>

          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="flex-1 h-10 rounded-lg border-border text-sm"
            />
            <Button className="bg-[#DB4987] hover:bg-[#C43D78] h-10 px-4 rounded-lg font-semibold text-sm text-white border-0">
              Baixar
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground mt-3">
            📄 PDF gratuito • Enviado no seu e-mail
          </p>
        </div>
      </div>
    </section>
  );
};

export default EbookSection;
