import flavorCranberry from "@/assets/flavor-cranberry.jpg";
import flavorFrutasTropicais from "@/assets/flavor-frutas-tropicais.jpg";
import flavorLimao from "@/assets/flavor-limao.jpg";
import flavorPinkLemonade from "@/assets/flavor-pink-lemonade.jpg";
import flavorTangerina from "@/assets/flavor-tangerina.jpg";

const FlavorSection = () => {
  const flavors = [{
    name: "Cranberry",
    image: flavorCranberry,
    color: "#E91E8C",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  }, {
    name: "Frutas Tropicais",
    image: flavorFrutasTropicais,
    color: "#D4A574",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  }, {
    name: "Limão",
    image: flavorLimao,
    color: "#8BC34A",
    bgColor: "bg-lime-50",
    borderColor: "border-lime-200"
  }, {
    name: "Pink Lemonade",
    image: flavorPinkLemonade,
    color: "#E91E8C",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  }, {
    name: "Tangerina",
    image: flavorTangerina,
    color: "#FF8C00",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  }];
  return <section className="py-10 md:py-12 bg-white" id="sabores">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            5 Sabores Deliciosos
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">Os sabores mais gostosos do Brasil</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Todos os sabores possuem a mesma fórmula premium
          </p>
        </div>

        {/* Flavors List */}
        <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
          {flavors.map(flavor => <div key={flavor.name} className={`flex items-center gap-4 px-4 py-3 ${flavor.bgColor} ${flavor.borderColor} border rounded-full w-full`}>
              <img src={flavor.image} alt={flavor.name} className="w-14 h-14 object-cover rounded-lg" />
              <span className="font-semibold text-sm" style={{
            color: flavor.color
          }}>
                {flavor.name}
              </span>
            </div>)}
        </div>

        {/* Subtle note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Sabor suave e refrescante • Fácil de tomar diariamente
        </p>
      </div>
    </section>;
};
export default FlavorSection;