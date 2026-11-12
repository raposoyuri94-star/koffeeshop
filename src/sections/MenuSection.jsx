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
      </figure>
      <a className="text-link" href={`${import.meta.env.BASE_URL}bebidas-sazonais.html`}>
        Ver as bebidas da estação
      </a>
    </section>
  );
}
