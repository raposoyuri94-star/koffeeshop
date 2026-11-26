import React from 'react';
import '../styles/gallery.css';

const photos = [
  {
    file: 'Screenshot 2026-11-25 181821.png',
    title: 'Um para si, outro para a companhia',
    alt: 'Dois cafés gelados Koffée num suporte de cartão, com coberturas de chantilly e cereais',
    width: 831, height: 928,
  },
  {
    file: 'Screenshot 2026-11-25 185231.png',
    title: 'A pausa vem bem acompanhada',
    alt: 'Tabuleiro com dois cafés gelados, uma tosta e um muffin de chocolate na Koffée',
    width: 735, height: 939,
  },
  {
    file: 'Screenshot 2026-11-25 185443.png',
    title: 'Café ou matcha? Há lugar para os dois',
    alt: 'Vista de cima de um matcha gelado e um café gelado ao sol sobre uma mesa',
    width: 603, height: 919,
  },
];

export default function GalleryPage({ onOpenImage }) {
  return (
    <section className="gallery-page section-space" aria-labelledby="gallery-heading">
      <div className="gallery-heading">
        <div>
          <p className="handwritten">Entre um gole e outro</p>
          <h1 id="gallery-heading">Galeria</h1>
        </div>
        <p>Cafés, encontros e coisas boas à mesa.<br />Um pouco do que se vive por aqui.</p>
      </div>
      <p className="gallery-hint">Toque numa fotografia para ver de perto.</p>
      <div className="gallery-grid">
        {photos.map((photo, index) => {
          const image = { ...photo, src: `${import.meta.env.BASE_URL}images/${encodeURIComponent(photo.file)}` };
          return (
            <figure className="gallery-photo" key={photo.file}>
              <button type="button" className="gallery-photo-button" aria-haspopup="dialog"
                aria-label={`Ampliar fotografia: ${photo.title}`} onClick={() => onOpenImage(image)}>
                <img src={image.src} alt={photo.alt} width={photo.width} height={photo.height}
                  loading={index === 0 ? 'eager' : 'lazy'} />
                <span className="gallery-enlarge" aria-hidden="true">Ampliar</span>
              </button>
              <figcaption>{photo.title}</figcaption>
            </figure>
          );
        })}
      </div>
      <div className="gallery-menu-link">
        <p>Já sabe o que vai pedir?</p>
        <a className="button button-dark" href={`${import.meta.env.BASE_URL}#menu`}>Ver o menu</a>
      </div>
    </section>
  );
}
