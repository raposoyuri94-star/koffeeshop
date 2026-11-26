import React, { useState } from 'react';
import { menu } from '../data/menu';

export default function MenuSection({ onOpenImage }) {
  const [category, setCategory] = useState(Object.keys(menu)[0]);
  const [selection, setSelection] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const selectedMenu = menu[category];
  const count = selection.reduce((sum, item) => sum + item.quantity, 0);
  const total = selection.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const money = value => `${value.toLocaleString('pt-MZ')} MT`;

  function addItem(group, item, price, option) {
    const id = JSON.stringify([category, group.name, item.name, option]);
    setSelection(current => {
      const existing = current.find(line => line.id === id);
      return existing
        ? current.map(line => line.id === id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { id, name: item.name, group: group.name, price, quantity: 1 }];
    });
    setAnnouncement(`${item.name}, ${money(price)}, adicionado à seleção.`);
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
                    <h4>{line.name}</h4>
                    <p>{line.group} · {money(line.price)} cada</p>
                  </div>
                  <div className="menu-quantity" role="group" aria-label={`${line.group}: ${line.name}, ${money(line.price)}`}>
                    <button type="button" aria-label={`Diminuir ${line.name}`} onClick={() => changeQuantity(line.id, -1)}>−</button>
                    <span aria-label={`${line.quantity} unidades`}>{line.quantity}</span>
                    <button type="button" aria-label={`Aumentar ${line.name}`} onClick={() => changeQuantity(line.id, 1)}>+</button>
                  </div>
                  <strong className="selection-line-total">{money(line.price * line.quantity)}</strong>
                </li>
              ))}
            </ul>
            <button className="menu-clear" type="button" onClick={() => { setSelection([]); setAnnouncement('Seleção limpa.'); }}>Limpar seleção</button>
          </div>
        </details>
      )}
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
                  <span className="menu-item-price">{item.prices.join(' / ')} <span>MT</span></span>
                  <div className="menu-item-actions">
                    {item.prices.map((price, option) => (
                      <button type="button" key={option}
                        aria-label={`Adicionar ${item.name}, ${price} MT`}
                        onClick={() => addItem(group, item, price, option)}>
                        {item.prices.length > 1 ? `Selecionar · ${money(price)}` : 'Selecionar'}
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
