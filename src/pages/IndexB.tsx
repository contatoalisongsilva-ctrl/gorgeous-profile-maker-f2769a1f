import { lazy, Suspense } from "react";
import HeroSectionSimple from "@/components/HeroSectionSimple";
import { SelectedKitProvider } from "@/contexts/SelectedKitContext";

// Lazy load below-the-fold components
const CollagenDeclineSection = lazy(() => import("@/components/CollagenDeclineSection"));
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const FormulaSection = lazy(() => import("@/components/FormulaSection"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const ResultsSection = lazy(() => import("@/components/ResultsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FlavorSection = lazy(() => import("@/components/FlavorSection"));
const OfferSection = lazy(() => import("@/components/OfferSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const NutritionSection = lazy(() => import("@/components/NutritionSection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyBuyButton = lazy(() => import("@/components/StickyBuyButton"));

// Minimal loading placeholder
const SectionLoader = () => (
  <div className="py-12 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const IndexB = () => {
  return (
    <SelectedKitProvider>
      <main className="overflow-hidden pb-28">
        {/* 1. HERO - Sem preço, CTA âncora - Loaded eagerly */}
        <HeroSectionSimple />
        
        {/* 2. PROBLEMA - Identificação "Entenda se é o seu caso" */}
        <Suspense fallback={<SectionLoader />}>
          <ProblemSection />
        </Suspense>
        
        {/* 3. DECLÍNIO DO COLÁGENO - Educação */}
        <Suspense fallback={<SectionLoader />}>
          <CollagenDeclineSection />
        </Suspense>
        
        {/* 3. SOLUÇÃO - Ciência + Comparativo */}
        <Suspense fallback={<SectionLoader />}>
          <FormulaSection />
          <ComparisonSection />
        </Suspense>
        
        {/* 4. PROVA SOCIAL - Resultados + Depoimentos */}
        <Suspense fallback={<SectionLoader />}>
          <ResultsSection />
          <TestimonialsSection />
        </Suspense>
        
        {/* 5. SABORES + OFERTA - Kits de Preço + Garantias */}
        <Suspense fallback={<SectionLoader />}>
          <FlavorSection />
          <OfferSection />
        </Suspense>
        
        {/* 6. TABELA NUTRICIONAL + FAQ + Footer */}
        <Suspense fallback={<SectionLoader />}>
          <NutritionSection />
          <FAQSection />
          <Footer />
        </Suspense>
      </main>
      
      {/* Botão sticky de compra */}
      <Suspense fallback={null}>
        <StickyBuyButton />
      </Suspense>
    </SelectedKitProvider>
  );
};

export default IndexB;
