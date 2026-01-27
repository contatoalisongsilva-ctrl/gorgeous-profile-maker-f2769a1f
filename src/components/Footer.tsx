import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logoWhite from "@/assets/renova-be-logo-white.png";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: WhatsAppIcon, href: "#", label: "WhatsApp", isCustom: true },
    { icon: TikTokIcon, href: "#", label: "TikTok", isCustom: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#0d0d0d]">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Cadastre seu e-mail
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
            Digite seu melhor e-mail e fique por dentro de todos os lançamentos, promoções e dicas de saúde
          </p>
          
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-full px-6 py-4 pr-32 text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-white text-[#0d0d0d] text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800/50" />

      {/* Footer Links */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Categorias */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Categorias</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Kits</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Colágeno</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Creatina</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Ômega 3</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Vitaminas</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Skincare</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Todos os produtos</a></li>
            </ul>
          </div>

          {/* Institucionais */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Institucionais</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Onde comprar</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Trabalhe com a gente</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Assinatura</a></li>
            </ul>
          </div>

          {/* Acesso rápido */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Acesso rápido</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Meus pedidos</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Rastreamento</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Perguntas frequentes</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Trocas e devoluções</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Políticas de reembolso</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Políticas de privacidade</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Termos e condições</a></li>
            </ul>
          </div>

          {/* Fale conosco */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Fale conosco</h4>
            <div className="text-sm">
              <p className="text-white font-medium mb-2">Horário de atendimento:</p>
              <p className="text-gray-500">segunda à quinta - 08h às 18h</p>
              <p className="text-gray-500">sexta-feira - 08h às 17h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <img 
              src={logoWhite} 
              alt="Renova Be" 
              className="h-8 md:h-10 w-auto"
            />

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-all"
                  aria-label={social.label}
                >
                  {social.isCustom ? (
                    <social.icon />
                  ) : (
                    <social.icon className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
