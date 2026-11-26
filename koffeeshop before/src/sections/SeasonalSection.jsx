import React from 'react';
import { images } from '../data/images';

export default function SeasonalSection({ onOpenImage }) {
  function openPoster() {
    onOpenImage({ ...images.seasonal, title: 'Bebidas da estação', width: 1258, height: 1669 });
  }

  return (
    <section className="seasonal-feature section-space" id="seasonal" aria-labelledby="seasonal-heading">
      <button
        type="button"
        className="seasonal-poster"
        aria-haspopup="dialog"
        aria-label="Ampliar o cartaz de bebidas de abóbora e especiarias"
        onClick={openPoster}
      >
        <img src={images.seasonal.src} alt={images.seasonal.alt} width="1258" height="1669" />
      </button>
      <div className="seasonal-copy">
        <a className="text-link seasonal-back" href={`${import.meta.env.BASE_URL}#menu`}>Voltar ao menu</a>
        <p className="handwritten">Uma mudança no copo</p>
        <h1 id="seasonal-heading">Especiarias<br />com gelo</h1>
        <p>
          O cartaz junta quatro maneiras de levar abóbora e especiarias para o copo,
          com latte, chai, matcha ou Red Bull. Todas são servidas com gelo.
        </p>
        <p className="seasonal-note">Confirme na loja quais estão disponíveis e os preços actuais.</p>
        <button type="button" className="text-link seasonal-preview" aria-haspopup="dialog" onClick={openPoster}>
          Ver as quatro combinações
        </button>
      </div>
    </section>
  );
}
