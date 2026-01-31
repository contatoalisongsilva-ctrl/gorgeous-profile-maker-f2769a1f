import { Check, Zap, Droplets, ShieldCheck } from "lucide-react";
import productWoman from "@/assets/product-woman.jpg";
import logoVerisol from "@/assets/logo-verisol.png";
import logoHaplex from "@/assets/logo-haplex-plus.webp";

const benefits = [
  "Estímulo real de produção de colágeno próprio",
  "Preenchimento profundo das rugas (Ácido Hialurônico)",
  "Textura agradável — parece suco, age como tratamento",
  "Zero açúcar | Zero glúten | Baixa caloria",
  "Aplicação prática: uma vez ao dia",
];

const tripleAction = [
  {
    Icon: Zap,
    title: "ESTIMULA COLÁGENO PRÓPRIO",
    description: "A tecnologia Verisol® é a única que leva o colágeno diretamente até a derme — onde as rugas nascem. Seu corpo passa a produzir mais colágeno de volta.",
  },
  {
    Icon: Droplets,
    title: "PREENCHE AS RUGAS DE DENTRO",
    description: "O Ácido Hialurônico retém água em profundidade, preenchendo as linhas finas e devolvendo volume ao rosto.",
  },
  {
    Icon: ShieldCheck,
    title: "PROTEGE E DESACELERA O ENVELHECIMENTO",
    description: "Antioxidantes potentes combatem os radicais livres que aceleram a degradação da pele, freando a aparição de novas rugas.",
  },
];

const SolutionSectionB = () => {
  return (
    <section id="solucao" className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              A Solução
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Colágeno Verisol® + Ácido Hialurônico
            </h2>
            <p className="text-primary font-semibold">
              O tratamento que combate rugas pela origem — não pela superfície.
            </p>
          </div>

          {/* Product Image */}
          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg max-w-md mx-auto">
              <img 
                src={productWoman} 
                alt="Mulher usando Colágeno Verisol Renova Be"
                className="w-full h-auto object-cover scale-110 origin-top"
                loading="lazy"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
              Desenvolvido para <strong className="text-foreground">mulheres acima de 35 anos</strong> que querem ver uma transformação real nas rugas, sem depender de cremes que só hidratam por cima.
            </p>
            <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
              <strong className="text-foreground">Não é um suplemento comum.</strong> É uma fórmula com tecnologia Verisol® — a única forma de colágeno que vai diretamente até a pele e estimula a sua própria produção:
            </p>
            
            {/* Benefits List */}
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Triple Action */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              Como o Colágeno Verisol® age:
            </h3>
            
            <div className="space-y-4">
              {tripleAction.map((action, index) => (
                <div 
                  key={index}
                  className="bg-white border border-border rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <action.Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wide">
                        {action.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSectionB;
