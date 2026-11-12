import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import CateringDialog from './components/CateringDialog';
import CoffeeRain from './components/CoffeeRain';
import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import MenuSection from './sections/MenuSection';
import SeasonalSection from './sections/SeasonalSection';
import CateringSection from './sections/CateringSection';
import LocationSection from './sections/LocationSection';
import useCoffeeRain from './hooks/useCoffeeRain';

export default function App() {
  const isSeasonalPage = window.location.pathname.endsWith('/bebidas-sazonais.html');
  const homeHref = isSeasonalPage ? import.meta.env.BASE_URL : '';
  const [cateringOpen, setCateringOpen] = useState(false);
  const { batch, isRaining, makeItRain } = useCoffeeRain();

  function openCatering() {
    setCateringOpen(true);
  }

  function closeCatering() {
    setCateringOpen(false);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Saltar para o conteúdo</a>
      <SiteHeader onOpenCatering={openCatering} homeHref={homeHref} />
      <main id="main">
        {isSeasonalPage ? (
          <SeasonalSection />
        ) : (
          <>
            <HeroSection onMakeItRain={makeItRain} />
            <StorySection />
            <MenuSection />
            <CateringSection onOpenCatering={openCatering} />
            <LocationSection />
          </>
        )}
      </main>
      <SiteFooter onOpenCatering={openCatering} homeHref={homeHref} />
      <CateringDialog open={cateringOpen} onClose={closeCatering} />
      <CoffeeRain visible={isRaining} batch={batch} />
    </div>
  );
}
