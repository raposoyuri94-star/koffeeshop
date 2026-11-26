import React, { useEffect, useRef, useState } from 'react';
import { menu } from '../data/menu';
import { images } from '../data/images';
import { whatsapp } from '../data/social';

const sections = [
  { name: 'Café quente', groups: ['Espresso & chá', 'Hot coffee', 'Hot chocolate'] },
  { name: 'Café gelado', groups: ['Frappuccino', 'Iced cappuccino', 'Iced coffee'] },
  { name: 'Matcha e chá', groups: ['Iced matcha', 'Iced tea'] },
  { name: 'Outras bebidas', groups: ['Kids menu', 'Mocktails energéticos', 'Affogato', 'Bebidas'] },
  { name: 'Para comer', groups: ['Petiscos', 'Asinhas & tiras de frango', 'Tostas', 'Croissant brioche', 'Sandes', 'Pequeno-almoço'] },
  { name: 'Extras', groups: ['Extras'] },
];
const groups = Object.entries(menu).flatMap(([category, entries]) => entries.map(group => ({ ...group, category })));
const selectionKey = 'koffeeshop-order-v1';
const money = value => `${value.toLocaleString('pt-MZ')} MT`;
const itemId = (group, item, option) => JSON.stringify([group.category, group.name, item.name, option]);
const available = new Map(groups.flatMap(group => group.items.flatMap(item => item.prices.map((price, option) => {
  const id = itemId(group, item, option);
  return [id, { id, name: item.name, group: group.name, size: item.prices.length > 1 ? ['M', 'L'][option] : '', price }];
}))));

function restoreSelection() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(selectionKey) || '[]');
    if (!Array.isArray(saved)) return [];
    const restored = new Map();
    for (const line of saved) {
      if (available.has(line?.id) && Number.isSafeInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99) {
        restored.set(line.id, { ...available.get(line.id), quantity: line.quantity });
      }
    }
    return [...restored.values()];
  } catch { return []; }
}

export default function MenuSection({ onOpenImage }) {
  const [active, setActive] = useState(sections[0].name);
  const [selection, setSelection] = useState(restoreSelection);
  const [announcement, setAnnouncement] = useState('');
  const summary = useRef(null);
  const bagDialog = useRef(null);
  const bagTrigger = useRef(null);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    if (!bagOpen) return;
    const dialog = bagDialog.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      bagTrigger.current?.focus({ preventScroll: true });
    };
  }, [bagOpen]);
  const count = selection.reduce((sum, line) => sum + line.quantity, 0);
  const total = selection.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const message = [
    'Olá, Koffee! Gostaria de confirmar este pedido:', '',
    ...selection.map(line => `${line.quantity} × ${line.name}${line.size ? ` (${line.size})` : ''} — ${line.group}\n${money(line.price)} cada · Subtotal: ${money(line.price * line.quantity)}`),
    '', `Total: ${money(total)}`, '', 'Podem confirmar a disponibilidade, o valor e como levantar o pedido?',
  ].join('\n');
  const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    try { sessionStorage.setItem(selectionKey, JSON.stringify(selection.map(({ id, quantity }) => ({ id, quantity })))); }
    catch { /* Ordering remains usable when storage is unavailable. */ }
  }, [selection]);

  function addItem(group, item, option) {
    const line = available.get(itemId(group, item, option));
    setSelection(current => current.some(entry => entry.id === line.id)
      ? current.map(entry => entry.id === line.id ? { ...entry, quantity: Math.min(99, entry.quantity + 1) } : entry)
      : [...current, { ...line, quantity: 1 }]);
    setAnnouncement(`${line.name}${line.size ? ` ${line.size}` : ''} adicionado ao saco.`);
  }

  function changeQuantity(id, delta) {
    if (delta < 0 && selection.find(line => line.id === id)?.quantity === 1) summary.current?.focus();
    setSelection(current => current.map(line => line.id === id
      ? { ...line, quantity: Math.min(99, line.quantity + delta) } : line).filter(line => line.quantity > 0));
  }
  const section = sections.find(entry => entry.name === active);
  const visibleGroups = groups.filter(group => section.groups.includes(group.name));

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
      <p className="sr-only" role="status">{announcement}</p>
      <button ref={bagTrigger} type="button" className="menu-bag-trigger"
        aria-haspopup="dialog" aria-label={`Abrir saco, ${count} artigos, ${money(total)}`}
        onClick={() => setBagOpen(true)}>
        <svg width="25" height="28" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M3 8h18l1 18H2L3 8Z" /><path d="M7 10V6a5 5 0 0 1 10 0v4" />
        </svg>
        <span>O meu saco <span className="menu-bag-count">{count}</span></span>
        <strong>{money(total)}</strong>
      </button>
      <dialog ref={bagDialog} className="menu-bag-dialog" aria-labelledby="bag-heading"
        onCancel={event => { event.preventDefault(); setBagOpen(false); }}
        onClick={event => { if (event.target === event.currentTarget) setBagOpen(false); }}>
        <div className="menu-bag-panel">
        <header className="menu-bag-heading">
          <div><h2 id="bag-heading" ref={summary} tabIndex={-1}>O meu saco</h2><p>{count} {count === 1 ? 'artigo' : 'artigos'}</p></div>
          <button type="button" className="menu-select" autoFocus onClick={() => setBagOpen(false)} aria-label="Fechar saco">Fechar</button>
        </header>
        <div className="menu-order-body">
          {selection.length ? (
            <>
              <ul className="menu-order-lines">
                {selection.map(line => (
                  <li key={line.id}>
                    <div className="menu-item-copy">
                      <h4>{line.name}{line.size && ` · ${line.size}`}</h4>
                      <p>{line.group} · {money(line.price)} cada</p>
                    </div>
                    <div className="menu-quantity" role="group" aria-label={`Quantidade de ${line.name}${line.size ? ` ${line.size}` : ''}`}>
                      <button type="button" aria-label={`Diminuir ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => changeQuantity(line.id, -1)}>−</button>
                      <span>{line.quantity}</span>
                      <button type="button" disabled={line.quantity >= 99} aria-label={`Aumentar ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => changeQuantity(line.id, 1)}>+</button>
                    </div>
                    <strong>{money(line.price * line.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <p className="menu-bag-total"><span>Total</span><strong>{money(total)}</strong></p>
              <div className="menu-order-actions">
                <button type="button" className="menu-select" onClick={() => { summary.current?.focus(); setSelection([]); setAnnouncement('Saco vazio.'); }}>Esvaziar saco</button>
                <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Confirmar pelo WhatsApp</a>
              </div>
              <p className="menu-order-note">Reveja a mensagem e toque em Enviar no WhatsApp. O pedido fica confirmado após a resposta da loja.</p>
            </>
          ) : <div className="menu-bag-empty"><p>O seu saco está vazio.</p><p>Escolha os seus favoritos no menu e adicione-os ao saco.</p></div>}
          <button type="button" className="menu-bag-continue" onClick={() => setBagOpen(false)}>Continuar a escolher</button>
        </div>
        </div>
      </dialog>
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
