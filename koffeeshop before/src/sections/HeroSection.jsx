import React, { useEffect, useRef, useState } from 'react';
import { CoffeeDoodle } from '../components/brand/Brand';

const stripMessages = [
  'Café com gelo',
  'Matcha na mesa',
  'Conversa por acabar',
  'Puxe mais uma cadeira',
];

export default function HeroSection({ onMakeItRain }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    let cancelled = false;
    // Mobile browsers may reject autoplay without emitting a media error.
    videoRef.current.play().catch(() => {
      if (!cancelled) setShowVideo(false);
    });
    return () => { cancelled = true; };
  }, [showVideo]);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setShowVideo(!motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  return (
    <>
      <section className={`hero${showVideo ? ' hero-with-video' : ''}`} id="home" aria-labelledby="hero-heading">
        {showVideo && (
          <video
            ref={videoRef}
            className="hero-video"
            src={`${import.meta.env.BASE_URL}videos/koffee-hero.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setShowVideo(false)}
          />
        )}
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-intro">O café era a desculpa</p>
          <h1 id="hero-heading">Era só<br />um café</h1>
          <p className="hero-description">
            Um café gelado na mão e a conversa por acabar.<br />Há dias que pedem só isto.
          </p>
          <a className="button button-light" href="#menu">Escolher o meu pedido</a>
        </div>
        <button className="coffee-sticker" onClick={onMakeItRain} aria-label="Fazer chover grãos de café">
          <span className="sticker-top">Só mais</span>
          <CoffeeDoodle />
          <span className="sticker-bottom">um café</span>
          <span className="sticker-hint">toque para agitar</span>
        </button>
      </section>
      <div className="good-things-strip" aria-label="Café com gelo, matcha e tempo à mesa">
        <div aria-hidden="true">
          {[0, 1].map(copy => (
            <React.Fragment key={copy}>
              {stripMessages.map(message => <span key={message}>{message}</span>)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
