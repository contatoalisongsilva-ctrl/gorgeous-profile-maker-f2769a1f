import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logoWhite from "@/assets/renova-be-logo-white.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterB = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    setEmail("");
  };

  const categories = [
    "Kits",
    "Colágeno",
    "Creatina",
    "Ômega 3",
    "Vitaminas",
    "Skincare",
    "Todos os produtos",
  ];

  const institutional = [
    "Sobre nós",
    "Onde comprar",
    "Trabalhe com a gente",
    "Blog",
    "Assinatura",
  ];

  const quickAccess = [
    "Meus pedidos",
    "Rastreamento",
    "Perguntas frequentes",
    "Trocas e devoluções",
    "Políticas de reembolso",
    "Políticas de privacidade",
    "Termos e condições",
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Email Signup Section */}
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-md text-center">
          <h3 className="text-2xl font-bold mb-3">Cadastre seu e-mail</h3>
          <p className="text-white/60 text-sm mb-6">
            Digite seu melhor e-mail e fique por dentro de todos os lançamentos, promoções e dicas de saúde
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-foreground border-0 rounded-full"
            />
            <Button 
              type="submit"
              variant="outline"
              className="bg-white text-foreground hover:bg-white/90 border-0 rounded-full px-6"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Categories */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-4">Categorias</h4>
              <ul className="space-y-2">
                {categories.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-4">Institucionais</h4>
              <ul className="space-y-2">
                {institutional.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Quick Access */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-4">Acesso Rápido</h4>
              <ul className="space-y-2">
                {quickAccess.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-4">Fale Conosco</h4>
              <div className="text-white/60 text-sm space-y-2">
                <p className="text-white font-medium">Horário de atendimento:</p>
                <p>segunda à quinta - 08h às 18h</p>
                <p>sexta-feira - 08h às 17h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto text-center">
          {/* Logo */}
          <img 
            src={logoWhite} 
            alt="Renova Be" 
            className="h-8 mx-auto mb-6"
            loading="lazy"
          />
          
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Renova Be. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterB;