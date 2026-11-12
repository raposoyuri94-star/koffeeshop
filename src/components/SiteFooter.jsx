import React from 'react';

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
          <button onClick={onOpenCatering}>Eventos</button>
          <a href="#home">Voltar ao topo</a>
        </nav>
      </div>
      <a className="footer-wordmark" href="#home" aria-label="Página inicial da Kofeeshop">
        kofeeshop
      </a>
      <div className="footer-bottom">
        <small>Kofeeshop {new Date().getFullYear()}</small>
        <small>Morada e horário a anunciar.</small>
        <span>Fica mais cinco minutos</span>
      </div>
    </footer>
  );
}
