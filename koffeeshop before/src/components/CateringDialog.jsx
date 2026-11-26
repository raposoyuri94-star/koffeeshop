import React, { useEffect, useRef } from 'react';
import { cateringOptions } from '../data/catering';

export default function CateringDialog({ open, onClose }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (!open) return;

    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function keepFocusInDialog(event) {
    if (event.key !== 'Tab') return;

    const buttons = [...dialog.current.querySelectorAll('button:not([disabled])')];
    const first = buttons[0];
    const last = buttons.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeOnCancel(event) {
    event.preventDefault();
    onClose();
  }

  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialog}
      className="catering-dialog"
      aria-labelledby="catering-dialog-title"
      onClose={() => { if (!dialog.current.open) onClose(); }}
      onKeyDown={keepFocusInDialog}
      onCancel={closeOnCancel}
      onClick={closeOnBackdrop}
    >
      <div className="dialog-content">
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label="Fechar detalhes para eventos"
          autoFocus
        >
          Fechar
        </button>
        <h2 id="catering-dialog-title">Vamos pôr<br />a mesa</h2>
        <p>
          Escolha por onde quer começar e fale com a loja para acertar quantidades,
          horários e o que cada pessoa pode comer.
        </p>
        <div className="catering-options">
          {cateringOptions.map(option => (
            <article key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </article>
          ))}
        </div>
        <p className="dialog-note">
          Estas opções são exemplos. Confirme preços, disponibilidade e necessidades
          alimentares com a loja antes de encomendar.
        </p>
        <button className="button button-dark" onClick={onClose}>Combinado</button>
      </div>
    </dialog>
  );
}
