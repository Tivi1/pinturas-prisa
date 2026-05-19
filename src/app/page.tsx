import Header from "@/presentation/components/layout/Header";
import Footer from "@/presentation/components/layout/Footer";
import HeroSection from "@/presentation/components/sections/HeroSection";
import ProductsSection from "@/presentation/components/sections/ProductsSection";
import PromotionsSection from "@/presentation/components/sections/PromotionsSection";
import InspirationSection from "@/presentation/components/sections/InspirationSection";
import ColorRangeSection from "@/presentation/components/sections/ColorRangeSection";
import StoreLocatorSection from "@/presentation/components/sections/StoreLocatorSection";
import CalculatorSection from "@/presentation/components/sections/CalculatorSection";
import WorkAtPrisaSection from "@/presentation/components/sections/WorkAtPrisaSection";
import DealerSection from "@/presentation/components/sections/DealerSection";
import NewsroomSection from "@/presentation/components/sections/NewsroomSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection />
        <PromotionsSection />
        <InspirationSection />
        <ColorRangeSection />
        <StoreLocatorSection />
        <CalculatorSection />
        <WorkAtPrisaSection />
        <DealerSection />
        <NewsroomSection />
      </main>
      <Footer />
    </>
  );
}
