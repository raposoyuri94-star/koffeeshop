import React, { useState } from 'react';
import { menu } from '../data/menu';

const menuSections = Object.entries(menu).flatMap(([category, groups]) => groups.map(group => ({
  ...group, category, id: `${category}:${group.name}`,
})));
const categories = [
  { name: 'Café quente', groups: ['Espresso & chá', 'Hot coffee', 'Hot chocolate'] },
  { name: 'Café gelado', groups: ['Frappuccino', 'Iced cappuccino', 'Iced coffee'] },
  { name: 'Matcha e chá', groups: ['Iced matcha', 'Iced tea'] },
  { name: 'Outras bebidas', groups: ['Kids menu', 'Mocktails energéticos', 'Affogato', 'Bebidas'] },
  { name: 'Para comer', groups: ['Petiscos', 'Asinhas & tiras de frango', 'Tostas', 'Croissant brioche', 'Sandes', 'Pequeno-almoço'] },
  { name: 'Extras', groups: ['Extras'] },
];

export default function MenuSection({ onOpenImage }) {
  const [activeSection, setActiveSection] = useState(categories[0].name);
  const [selection, setSelection] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const activeCategory = categories.find(category => category.name === activeSection);
  const visibleGroups = menuSections.filter(group => activeCategory.groups.includes(group.name));
  const count = selection.reduce((sum, item) => sum + item.quantity, 0);
  const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const money = value => `${value.toLocaleString('pt-MZ')} MT`;

  function addItem(group, item, price, option) {
    const id = JSON.stringify([group.category, group.name, item.name, option]);
    const size = item.prices.length > 1 ? ['M', 'L'][option] : '';
    setSelection(current => {
      const existing = current.find(line => line.id === id);
      return existing
        ? current.map(line => line.id === id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { id, name: item.name, size, group: group.name, price, quantity: 1 }];
    });
    setAnnouncement(`${item.name}${size ? ` ${size}` : ''}, ${money(price)}, adicionado à seleção.`);
  }

  function changeQuantity(id, delta) {
    setSelection(current => current.map(line => line.id === id
      ? { ...line, quantity: line.quantity + delta } : line).filter(line => line.quantity > 0));
  }

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
          {categories.map(category => (
            <button type="button" key={category.name}
              className={activeSection === category.name ? 'active' : ''}
              aria-pressed={activeSection === category.name}
              onClick={() => setActiveSection(category.name)}>{category.name}</button>
          ))}
        </div>
      </div>
      <p className="menu-announcement" role="status" aria-label="Seleção do menu">{announcement}</p>
      {count > 0 && (
        <details className="menu-selection">
          <summary>A minha seleção ({count}) <strong>{money(total)}</strong></summary>
          <div className="menu-selection-content">
            <p>Guarde as suas escolhas para pedir ao balcão.</p>
            <ul className="menu-items">
              {selection.map(line => (
                <li className="selection-line" key={line.id}>
                  <div className="menu-item-copy">
                    <h4>{line.name}{line.size && ` · ${line.size}`}</h4>
                    <p>{line.group} · {money(line.price)} cada</p>
                  </div>
                  <div className="menu-quantity" role="group" aria-label={`${line.group}: ${line.name}${line.size ? ` ${line.size}` : ''}, ${money(line.price)}`}>
                    <button type="button" aria-label={`Diminuir ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => changeQuantity(line.id, -1)}>−</button>
                    <span aria-label={`${line.quantity} unidades`}>{line.quantity}</span>
                    <button type="button" aria-label={`Aumentar ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => changeQuantity(line.id, 1)}>+</button>
                  </div>
                  <strong className="selection-line-total">{money(line.price * line.quantity)}</strong>
                </li>
              ))}
            </ul>
            <button className="menu-clear" type="button" onClick={() => { setSelection([]); setAnnouncement('Seleção limpa.'); }}>Limpar seleção</button>
          </div>
        </details>
      )}
      <div className="menu-sheet" key={activeSection} role="region" aria-label={activeSection}>
        {visibleGroups.map(group => (
          <section className="menu-group" key={group.id} aria-label={group.name === 'Extras' ? `Extras ${group.category === 'Para comer' ? 'para comer' : 'de bebidas'}` : group.name}>
            <header className="menu-group-heading">
              <h3>{group.name === 'Extras' ? `Extras ${group.category === 'Para comer' ? 'para comer' : 'de bebidas'}` : group.name}</h3>
              {group.note && <p>{group.note}</p>}
            </header>
            <ul className="menu-items">
              {group.items.map(item => (
                <li className="menu-item" key={item.name}>
                  {item.image && (
                    <button className="menu-photo-button" type="button"
                      aria-label={`Ampliar foto de ${item.name}`} aria-haspopup="dialog"
                      onClick={() => onOpenImage({
                        ...item.image,
                        src: `${import.meta.env.BASE_URL}images/${item.image.src}`,
                        alt: `Sandes ${item.name}`,
                        title: item.name,
                      })}>
                      <img className="menu-item-photo"
                        src={`${import.meta.env.BASE_URL}images/${item.image.src}`}
                        alt={`Sandes ${item.name}`}
                        width={item.image.width} height={item.image.height} loading="lazy" />
                    </button>
                  )}
                  <div className="menu-item-copy">
                    <h4>{item.name}</h4>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <span className="menu-item-price">
                    {item.prices.map((price, option) => (
                      <span className="menu-price-option" key={option}>
                        {item.prices.length > 1 && `${['M', 'L'][option]} `}{price} <span className="menu-currency">MT</span>
                      </span>
                    ))}
                  </span>
                  <div className="menu-item-actions">
                    {item.prices.map((price, option) => (
                      <button type="button" key={option}
                        aria-label={`Adicionar ${item.name}${item.prices.length > 1 ? ` ${['M', 'L'][option]}` : ''}, ${price} MT`}
                        onClick={() => addItem(group, item, price, option)}>
                        {item.prices.length > 1 ? `${['M', 'L'][option]} · ${money(price)}` : 'Selecionar'}
                      </button>
                    ))}
                  </div>
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
