import React from 'react';
import { location } from '../data/location';

export default function SiteFooter({ onOpenCatering }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-greeting">A gente vê-se por aqui</p>
          <p>O assunto fica para o próximo café.</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <a href="#menu">O nosso menu</a>
          <a href="#story">A nossa história</a>
          <a href="#location">Onde estamos</a>
          <button onClick={onOpenCatering}>Eventos</button>
          <a href="#home">Voltar ao topo</a>
        </nav>
      </div>
      <a className="footer-wordmark" href="#home" aria-label="Página inicial da Kofeeshop">
        kofeeshop
      </a>
      <div className="footer-bottom">
        <small>Kofeeshop {new Date().getFullYear()}</small>
        <small>
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
            {location.street}, {location.city}
          </a>
        </small>
        <span>Fica mais cinco minutos</span>
      </div>
      <p className="footer-credit">Made by <strong>Nexzoagency</strong></p>
    </footer>
  );
}
