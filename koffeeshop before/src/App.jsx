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
import useCoffeeRain from './hooks/useCoffeeRain';
import useInitialHashScroll from './hooks/useInitialHashScroll';

export default function App() {
  const isSeasonalPage = window.location.pathname.endsWith('/bebidas-sazonais.html');
  const homeHref = isSeasonalPage ? import.meta.env.BASE_URL : '';
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

  function openPhoto(event) {
    const image = event.target;
    if (image.tagName !== 'IMG' || image.closest('button, a')) return;
    setPreviewImage({
      src: image.currentSrc || image.src,
      alt: image.alt,
      title: image.alt,
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Saltar para o conteúdo</a>
      <SiteHeader onOpenCatering={openCatering} homeHref={homeHref} />
      <main id="main" onClick={openPhoto}>
        {isSeasonalPage ? (
          <SeasonalSection onOpenImage={setPreviewImage} />
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
      {previewImage && <ImageViewer image={previewImage} onClose={() => setPreviewImage(null)} />}
      <CoffeeRain visible={isRaining} batch={batch} />
    </div>
  );
}
