import React, { useEffect, useRef, useState } from 'react';
import Brand from './Brand';

export default function SiteHeader({ onOpenCatering, homeHref = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationToggle = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        navigationToggle.current?.focus();
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function openCatering() {
    closeMenu();
    onOpenCatering();
  }

  return (
    <header className="site-header">
      <a className="logo" href={`${homeHref}#home`} aria-label="Página inicial da Kofeeshop">
        <Brand />
      </a>
      <button
        ref={navigationToggle}
        className="mobile-toggle"
        aria-label="Alternar navegação"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
        <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
          <i /><i />
        </span>
      </button>
      <nav
        id="main-navigation"
        className={menuOpen ? 'main-navigation is-open' : 'main-navigation'}
        aria-label="Navegação principal"
      >
        <a href={`${homeHref}#story`} onClick={closeMenu}>A nossa história</a>
        <a className="mobile-navigation-link" href={`${import.meta.env.BASE_URL}bebidas-sazonais.html`} onClick={closeMenu}>
          Bebidas da estação
        </a>
        <a href={`${homeHref}#location`} onClick={closeMenu}>Onde estamos</a>
        <button onClick={openCatering}>Eventos</button>
        <a className="button button-dark nav-menu" href={`${homeHref}#menu`} onClick={closeMenu}>
          Ver o menu
        </a>
      </nav>
    </header>
  );
}
