import React, { useState } from 'react';
import { images } from '../data/images';
import { menu } from '../data/menu';

export default function MenuSection() {
  const [category, setCategory] = useState(Object.keys(menu)[0]);
  const selectedMenu = menu[category];
  const menuImage = images[selectedMenu.image];

  return (
    <section className="menu-section section-space" id="menu" aria-labelledby="menu-heading">
      <div className="menu-heading">
        <div>
          <p className="handwritten">A conversa pode esperar um minuto</p>
          <h2 id="menu-heading">Vamos ao pedido</h2>
        </div>
        <p>Escolha o que vai no copo<br /> e o que acompanha.</p>
      </div>
      <div className="menu-toolbar">
        <div className="menu-tabs" role="group" aria-label="Categoria do menu">
          {Object.keys(menu).map(name => (
            <button
              className={category === name ? 'active' : ''}
              aria-pressed={category === name}
              key={name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <span className="menu-milk-note">Diga-nos como gosta do seu café.</span>
      </div>
      <figure className="menu-sheet">
        <a
          className="menu-sheet-link"
          href={menuImage.src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ampliar o menu de ${category.toLowerCase()} (abre num novo separador)`}
        >
          <img
            key={category}
            src={menuImage.src}
            alt={menuImage.alt}
            width={selectedMenu.width}
            height={selectedMenu.height}
            loading="lazy"
          />
        </a>
        <figcaption className="menu-sheet-caption">
          {selectedMenu.caption}
        </figcaption>
      </figure>
      <SeasonalFeature />
    </section>
  );
}

function SeasonalFeature() {
  return (
    <aside className="seasonal-feature" aria-labelledby="seasonal-heading">
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
        <h3 id="seasonal-heading">Especiarias<br />com gelo</h3>
        <p>
          O cartaz junta quatro maneiras de levar abóbora e especiarias para o copo,
          com latte, chai, matcha ou Red Bull. Todas são servidas com gelo.
        </p>
        <p className="seasonal-note">Confirme na loja quais estão disponíveis e os preços actuais.</p>
        <a className="text-link" href={images.seasonal.src} target="_blank" rel="noreferrer">
          Ver as quatro combinações <span className="sr-only">(abre num novo separador)</span>
        </a>
      </div>
    </aside>
  );
}
