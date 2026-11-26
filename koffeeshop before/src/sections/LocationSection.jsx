import React from 'react';
import { location } from '../data/location';

export default function LocationSection() {
  return (
    <section className="location section-space" id="location" aria-labelledby="location-heading">
      <div className="location-copy">
        <p className="handwritten">Estamos por aqui</p>
        <h2 id="location-heading">O próximo café<br />é em Maputo</h2>
        <address>
          {location.street}<br />
          {location.city}
        </address>
        <a className="button button-dark" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
          Abrir no Google Maps
        </a>
      </div>
      <iframe
        className="location-map"
        title="Localização da Kofeeshop na Av. Josina Machel, Maputo"
        src={location.embedUrl}
        width="640"
        height="420"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
