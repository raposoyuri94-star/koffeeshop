import React from 'react';
import Brand from './Brand';
import InstagramIcon from './InstagramIcon';
import { location } from '../data/location';
import { instagram } from '../data/social';

export default function SiteFooter({ onOpenCatering, homeHref = '' }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <a className="footer-brand" href={`${homeHref}#home`} aria-label="Página inicial da Kofeeshop">
            <Brand />
          </a>
          <p>A gente vê-se por aqui.<br />O assunto fica para o próximo café.</p>
        </div>
        <nav className="footer-navigation" aria-label="Navegação do rodapé">
          <h2 className="footer-heading">Por aqui</h2>
          <div className="footer-links">
            <a href={`${homeHref}#menu`}>O nosso menu</a>
            <a href={`${import.meta.env.BASE_URL}bebidas-sazonais.html`}>Bebidas da estação</a>
            <a href={`${homeHref}#story`}>A nossa história</a>
            <a href={`${homeHref}#location`}>Onde estamos</a>
            <button type="button" onClick={onOpenCatering}>Eventos</button>
            <a href={homeHref ? '#main' : '#home'}>Voltar ao topo</a>
          </div>
        </nav>
        <div className="footer-visit">
          <h2 className="footer-heading">Visite-nos</h2>
          <address>
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
              {location.street}<br />{location.city}
            </a>
          </address>
          <a className="footer-instagram" href={instagram.url} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>
              <span className="footer-instagram-label">Instagram</span>
              <span className="footer-instagram-handle">{instagram.handle}</span>
            </span>
            <span className="sr-only">(abre num novo separador)</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>Kofeeshop {new Date().getFullYear()}</small>
        <small className="footer-credit">Made by <strong>Nexzoagency</strong></small>
      </div>
    </footer>
  );
}
