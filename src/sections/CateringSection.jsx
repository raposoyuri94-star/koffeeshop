import React from 'react';
import { images } from '../data/images';

export default function CateringSection({ onOpenCatering }) {
  return (
    <>
      <section className="catering" id="catering" aria-labelledby="catering-heading">
        <div className="catering-copy">
          <p className="handwritten">Para quando o grupo sai do chat</p>
          <h2 id="catering-heading">Hoje a mesa<br />é maior</h2>
          <p>
            Um aniversário, uma manhã com a equipa ou aquele encontro que levou
            semanas a combinar. Veja o que pode levar para pôr toda a gente à mesa.
          </p>
          <button className="button button-light" onClick={onOpenCatering}>Opções para eventos</button>
        </div>
        <div className="catering-photo">
          <img src={images.catering.src} alt={images.catering.alt} width="1284" height="1511" loading="lazy" />
          <span className="photo-caption">Ponho isto ao meio</span>
        </div>
      </section>
      <section className="closing-note" aria-label="Mais um pouco de Kofeeshop">
        <p>Espere só<br /><span>mais uma história</span></p>
      </section>
    </>
  );
}
