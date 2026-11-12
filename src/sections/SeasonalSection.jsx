import React from 'react';
import { images } from '../data/images';

export default function SeasonalSection() {
  return (
    <section className="seasonal-feature section-space" id="seasonal" aria-labelledby="seasonal-heading">
      <a
        className="seasonal-poster"
        href={images.seasonal.src}
        target="_blank"
        rel="noreferrer"
        aria-label="Ver o cartaz de bebidas de abóbora e especiarias em tamanho original (abre num novo separador)"
      >
        <img src={images.seasonal.src} alt={images.seasonal.alt} width="1258" height="1669" loading="lazy" />
      </a>
      <div className="seasonal-copy">
        <p className="handwritten">Uma mudança no copo</p>
        <h2 id="seasonal-heading">Especiarias<br />com gelo</h2>
        <p>
          O cartaz junta quatro maneiras de levar abóbora e especiarias para o copo,
          com latte, chai, matcha ou Red Bull. Todas são servidas com gelo.
        </p>
        <p className="seasonal-note">Confirme na loja quais estão disponíveis e os preços actuais.</p>
        <a className="text-link" href={images.seasonal.src} target="_blank" rel="noreferrer">
          Ver as quatro combinações <span className="sr-only">(abre num novo separador)</span>
        </a>
      </div>
    </section>
  );
}
