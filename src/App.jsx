import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import CateringDialog from './components/CateringDialog';
import ImageViewer from './components/ImageViewer';
import CoffeeRain from './components/CoffeeRain';
import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import MenuSection from './sections/MenuSection';
import SeasonalSection from './sections/SeasonalSection';
import CateringSection from './sections/CateringSection';
import LocationSection from './sections/LocationSection';
import TermsPage from './pages/TermsPage';
import useCoffeeRain from './hooks/useCoffeeRain';
import useInitialHashScroll from './hooks/useInitialHashScroll';
import { images } from './data/images';

export default function App() {
  const isSeasonalPage = window.location.pathname.endsWith('/bebidas-sazonais.html');
  const isTermsPage = window.location.pathname.endsWith('/termos-e-condicoes.html');
  const homeHref = isSeasonalPage || isTermsPage ? import.meta.env.BASE_URL : '';
  const [cateringOpen, setCateringOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { batch, isRaining, makeItRain } = useCoffeeRain();
  useInitialHashScroll();

  function openCatering() {
    setCateringOpen(true);
  }

  function closeCatering() {
    setCateringOpen(false);
  }

  function openSeasonalImage() {
    setPreviewImage({ ...images.seasonal, title: 'Bebidas da estação', width: 1258, height: 1669 });
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Saltar para o conteúdo</a>
      <SiteHeader onOpenCatering={openCatering} onOpenSeasonalImage={openSeasonalImage} homeHref={homeHref} />
      <main id="main">
        {isTermsPage ? (
          <TermsPage />
        ) : isSeasonalPage ? (
          <SeasonalSection onOpenImage={setPreviewImage} />
        ) : (
          <>
            <HeroSection onMakeItRain={makeItRain} onOpenImage={setPreviewImage} />
            <StorySection onOpenImage={setPreviewImage} />
            <MenuSection onOpenImage={setPreviewImage} />
            <CateringSection onOpenCatering={openCatering} onOpenImage={setPreviewImage} />
            <LocationSection />
          </>
        )}
      </main>
      <SiteFooter onOpenCatering={openCatering} onOpenSeasonalImage={openSeasonalImage} homeHref={homeHref} />
      <CateringDialog open={cateringOpen} onClose={closeCatering} />
      {previewImage && <ImageViewer image={previewImage} onClose={() => setPreviewImage(null)} />}
      <CoffeeRain visible={isRaining} batch={batch} />
    </div>
  );
}
