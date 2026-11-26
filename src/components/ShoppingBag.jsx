import React, { useEffect, useRef, useState } from 'react';
import { money } from '../hooks/useMenuOrder';

export default function ShoppingBag({ order }) {
  const { selection, count, total, announcement, whatsappUrl, changeQuantity, clearSelection } = order;
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
  return (
    <>
      <p className="sr-only" role="status">{announcement}</p>
      <button ref={bagTrigger} type="button" className="menu-bag-trigger"
        aria-haspopup="dialog" aria-label={`Abrir saco, ${count} ${count === 1 ? 'artigo' : 'artigos'}, ${money(total)}`}
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
                      <button type="button" aria-label={`Diminuir ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => { if (line.quantity === 1) summary.current?.focus(); changeQuantity(line.id, -1); }}>−</button>
                      <span>{line.quantity}</span>
                      <button type="button" disabled={line.quantity >= 99} aria-label={`Aumentar ${line.name}${line.size ? ` ${line.size}` : ''}`} onClick={() => changeQuantity(line.id, 1)}>+</button>
                    </div>
                    <strong>{money(line.price * line.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <p className="menu-bag-total"><span>Total</span><strong>{money(total)}</strong></p>
              <div className="menu-order-actions">
                <button type="button" className="menu-select" onClick={() => { summary.current?.focus(); clearSelection(); }}>Esvaziar saco</button>
                <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Confirmar pelo WhatsApp</a>
              </div>
              <p className="menu-order-note">Reveja a mensagem e toque em Enviar no WhatsApp. O pedido fica confirmado após a resposta da loja.</p>
            </>
          ) : <div className="menu-bag-empty"><p>O seu saco está vazio.</p><p>Escolha os seus favoritos no menu e adicione-os ao saco.</p></div>}
          <a className="menu-bag-continue" href={`${import.meta.env.BASE_URL}#menu`} onClick={() => setBagOpen(false)}>Continuar a escolher</a>
        </div>
        </div>
      </dialog>
    </>
  );
}
