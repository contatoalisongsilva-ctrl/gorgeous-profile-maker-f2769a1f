import { lazy, Suspense } from "react";
import { SelectedKitProvider } from "@/contexts/SelectedKitContext";

// Eager load - Above the fold
import HeroSectionB from "@/components/versao-b/HeroSectionB";

// Lazy load - Below the fold (versão B components)
const ProblemSectionB = lazy(() => import("@/components/versao-b/ProblemSectionB"));
const CollagenDeclineSectionB = lazy(() => import("@/components/versao-b/CollagenDeclineSectionB"));
const ChoiceSectionB = lazy(() => import("@/components/versao-b/ChoiceSectionB"));
const SolutionSectionB = lazy(() => import("@/components/versao-b/SolutionSectionB"));
const BenefitsSectionB = lazy(() => import("@/components/versao-b/BenefitsSectionB"));
const ComparisonSectionB = lazy(() => import("@/components/versao-b/ComparisonSectionB"));
const ResultsCarouselB = lazy(() => import("@/components/versao-b/ResultsCarouselB"));
const EducationSectionB = lazy(() => import("@/components/versao-b/EducationSectionB"));
const GuaranteeSectionB = lazy(() => import("@/components/versao-b/GuaranteeSectionB"));
const FinalCTASectionB = lazy(() => import("@/components/versao-b/FinalCTASectionB"));
const FAQSectionB = lazy(() => import("@/components/versao-b/FAQSectionB"));
const FooterB = lazy(() => import("@/components/versao-b/FooterB"));

// Shared components (reused from original)

const OfferSection = lazy(() => import("@/components/OfferSection"));
const NutritionSection = lazy(() => import("@/components/NutritionSection"));
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
        {/* 1. HERO - Gancho emocional */}
        <HeroSectionB />
        
        {/* 2. PROBLEMA - Check-list interativo */}
        <Suspense fallback={<SectionLoader />}>
          <ProblemSectionB />
        </Suspense>
        
        {/* 3. DECLÍNIO DO COLÁGENO - Por que aos 35+ */}
        <Suspense fallback={<SectionLoader />}>
          <CollagenDeclineSectionB />
        </Suspense>
        
        {/* 3.5. ESCOLHA - Duas opções para a mulher */}
        <Suspense fallback={<SectionLoader />}>
          <ChoiceSectionB />
        </Suspense>
        
        {/* 4. SOLUÇÃO - Verisol + Tripla Ação */}
        <Suspense fallback={<SectionLoader />}>
          <SolutionSectionB />
        </Suspense>
        
        {/* 5. BENEFÍCIOS - Timeline de resultados */}
        <Suspense fallback={<SectionLoader />}>
          <BenefitsSectionB />
        </Suspense>
        
        {/* 6. COMPARAÇÃO - Cremes vs Verisol */}
        <Suspense fallback={<SectionLoader />}>
          <ComparisonSectionB />
        </Suspense>
        
        {/* 7. RESULTADOS - Carrossel de antes/depois */}
        <Suspense fallback={<SectionLoader />}>
          <ResultsCarouselB />
        </Suspense>
        
        {/* 8. OFERTA - Kits de Preço */}
        <Suspense fallback={<SectionLoader />}>
          <OfferSection />
        </Suspense>
        
        
        
        {/* 12. TABELA NUTRICIONAL */}
        <Suspense fallback={<SectionLoader />}>
          <NutritionSection />
        </Suspense>
        
        {/* 13. FAQ */}
        <Suspense fallback={<SectionLoader />}>
          <FAQSectionB />
        </Suspense>
        
        {/* 14. FOOTER */}
        <Suspense fallback={<SectionLoader />}>
          <FooterB />
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
