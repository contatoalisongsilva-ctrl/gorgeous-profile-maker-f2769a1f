import heroBanner from "@/assets/hero-banner-versao-b.jpg";

const HeroSectionB = () => {
  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full">
      <img 
        src={heroBanner} 
        alt="Renova Be - Reduza os sinais de envelhecimento com apenas 1 dose diária - Resultados a partir de 4 semanas"
        className="w-full h-auto cursor-pointer"
        onClick={scrollToOffer}
      />
    </section>
  );
};

export default HeroSectionB;
