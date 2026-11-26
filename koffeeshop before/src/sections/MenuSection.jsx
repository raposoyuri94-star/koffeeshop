import React, { useState } from 'react';
import { menu } from '../data/menu';

export default function MenuSection() {
  const [category, setCategory] = useState(Object.keys(menu)[0]);
  const selectedMenu = menu[category];

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
        <span className="menu-milk-note">Preços em meticais (MT)</span>
      </div>
      <div className="menu-sheet" key={category} role="region" aria-label={category}>
        {selectedMenu.map(group => (
          <section className="menu-group" key={group.name} aria-label={group.name}>
            <header className="menu-group-heading">
              <h3>{group.name}</h3>
              {group.note && <p>{group.note}</p>}
            </header>
            <ul className="menu-items">
              {group.items.map(item => (
                <li className="menu-item" key={item.name}>
                  <div className="menu-item-copy">
                    <h4>{item.name}</h4>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <span className="menu-item-price">{item.prices.join(' / ')} <span>MT</span></span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <a className="text-link" href={`${import.meta.env.BASE_URL}bebidas-sazonais.html`}>
        Ver as bebidas da estação
      </a>
    </section>
  );
}
