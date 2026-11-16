import React, { useEffect, useRef, useState } from 'react';

export default function ImageViewer({ image, onClose }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const stage = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current.focus();

    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    stage.current.scrollTo({ top: 0, left: 0 });
  }, [isZoomed]);

  function closeOnCancel(event) {
    event.preventDefault();
    onClose();
  }

  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget || event.target === stage.current) onClose();
  }

  function keepFocusInViewer(event) {
    if (event.key !== 'Tab') return;
    const buttons = [...dialog.current.querySelectorAll('button')];
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

  return (
    <dialog
      ref={dialog}
      className="image-viewer"
      aria-labelledby="image-viewer-title"
      onCancel={closeOnCancel}
      onClick={closeOnBackdrop}
      onKeyDown={keepFocusInViewer}
    >
      <div className="image-viewer-panel">
        <div className="image-viewer-toolbar">
          <h2 className="image-viewer-title" id="image-viewer-title">{image.title}</h2>
          <div className="image-viewer-actions">
            <button
              type="button"
              className="image-viewer-zoom"
              aria-label={isZoomed ? 'Ajustar imagem ao ecrã' : 'Ampliar imagem'}
              onClick={() => setIsZoomed(zoomed => !zoomed)}
            >
              {isZoomed ? 'Ajustar ao ecrã' : 'Ampliar'}
            </button>
            <button
              ref={closeButton}
              type="button"
              className="image-viewer-close"
              aria-label="Fechar imagem"
              onClick={onClose}
              autoFocus
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
              Fechar
            </button>
          </div>
        </div>
        <div ref={stage} className={`image-viewer-stage${isZoomed ? ' is-zoomed' : ''}`}>
          <img
            className="image-viewer-image"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    </dialog>
  );
}
