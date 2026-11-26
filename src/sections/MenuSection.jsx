import React, { useState } from 'react';
import { images } from '../data/images';
import { menuGroups, money } from '../hooks/useMenuOrder';

const sections = [
  { name: 'Café quente', groups: ['Espresso & chá', 'Hot coffee', 'Hot chocolate'] },
  { name: 'Café gelado', groups: ['Frappuccino', 'Iced cappuccino', 'Iced coffee'] },
  { name: 'Matcha e chá', groups: ['Iced matcha', 'Iced tea'] },
  { name: 'Outras bebidas', groups: ['Kids menu', 'Mocktails energéticos', 'Affogato', 'Bebidas'] },
  { name: 'Para comer', groups: ['Petiscos', 'Asinhas & tiras de frango', 'Tostas', 'Croissant brioche', 'Sandes', 'Pequeno-almoço'] },
  { name: 'Extras', groups: ['Extras'] },
];
export default function MenuSection({ onOpenImage, order }) {
  const [active, setActive] = useState(sections[0].name);
  const { addItem } = order;
  const section = sections.find(entry => entry.name === active);
  const visibleGroups = menuGroups.filter(group => section.groups.includes(group.name));

  return (
    <section className="menu-section section-space" id="menu" aria-labelledby="menu-heading">
      <div className="menu-heading">
        <div>
          <p className="handwritten">A conversa pode esperar um minuto</p>
          <h2 id="menu-heading">O nosso menu</h2>
        </div>
        <p>Escolha o que vai no copo<br /> e o que acompanha.</p>
      </div>
      <div className="menu-toolbar">
        <div className="menu-tabs" role="group" aria-label="Categoria do menu">
          {sections.map(entry => (
            <button type="button" key={entry.name}
              className={active === entry.name ? 'active' : ''}
              aria-pressed={active === entry.name} aria-controls="menu-content"
              onClick={() => setActive(entry.name)}>{entry.name}</button>
          ))}
        </div>
      </div>
      <p className="menu-price-note">Preços em meticais (MT). Escolha uma categoria para consultar o menu.</p>
      <div className="menu-content" id="menu-content" role="region" aria-label={active}>
        {visibleGroups.map(group => (
          <section className="menu-group" key={`${group.category}-${group.name}`}>
            <div className="menu-group-heading">
              <h3>{group.name === 'Extras' ? `Extras ${group.category === 'Para comer' ? 'para comer' : 'de bebidas'}` : group.name}</h3>
              {group.note && <p>{group.note}</p>}
            </div>
            <ul className="menu-items">
              {group.items.map(item => (
                <li className="menu-item" key={item.name}>
                  <div className="menu-item-copy">
                    <h4>{item.name}</h4>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <span className="menu-item-price">{item.prices.map((price, option) => (
                    <span className="menu-price-variant" key={option}>{item.prices.length > 1 && `${['M', 'L'][option]} · `}{money(price)}</span>
                  ))}</span>
                  <div className="menu-item-actions">
                    {item.prices.map((price, option) => (
                      <button type="button" className="menu-select" key={option}
                        aria-label={`Adicionar ao saco ${item.name}${item.prices.length > 1 ? ` ${['M', 'L'][option]}` : ''}, ${money(price)}`}
                        onClick={() => addItem(group, item, option)}>
                        {item.prices.length > 1 ? `Adicionar ${['M', 'L'][option]} ao saco` : 'Adicionar ao saco'}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <button type="button" className="text-link seasonal-preview" aria-haspopup="dialog"
        onClick={() => onOpenImage({ ...images.seasonal, title: 'Bebidas da estação', width: 1258, height: 1669 })}>
        Ver as bebidas da estação
      </button>
    </section>
  );
}
