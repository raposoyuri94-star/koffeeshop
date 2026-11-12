import React from 'react';
import { CoffeeDoodle } from '../components/Brand';
import { images } from '../data/images';

const stripMessages = [
  'Café com gelo',
  'Matcha na mesa',
  'Conversa por acabar',
  'Puxe mais uma cadeira',
];

export default function HeroSection({ onMakeItRain }) {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-heading">
        <img
          className="hero-image"
          src={images.hero.src}
          alt={images.hero.alt}
          fetchPriority="high"
        />
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
        <div className="hero-bottom">
          <span>O resto pode esperar</span>
          <a href="#story">À mesa da Kofeeshop</a>
        </div>
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
