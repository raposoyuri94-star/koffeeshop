import React from 'react';
import { images } from '../data/images';

export default function StorySection({ onOpenImage }) {
  return (
    <section className="story" id="story" aria-labelledby="story-heading">
      <div className="story-photo">
        <button type="button" className="story-main-trigger" aria-label="Ampliar a fotografia do café" aria-haspopup="dialog" onClick={() => onOpenImage({ ...images.story, title: 'Entre um gole e outro' })}>
          <img className="story-main-image" src={images.story.src} alt={images.story.alt} loading="lazy" />
        </button>
        <button type="button" className="story-inset" aria-label="Ampliar a fotografia do matcha" aria-haspopup="dialog" onClick={() => onOpenImage({ ...images.storyMoment, title: 'Uma pausa com matcha' })}>
          <img src={images.storyMoment.src} alt={images.storyMoment.alt} loading="lazy" />
        </button>
        <span className="photo-caption">Entre um gole e outro</span>
      </div>
      <div className="story-copy">
        <p className="handwritten">É assim que gostamos</p>
        <h2 id="story-heading">A cadeira<br />que faltava</h2>
        <p>
          Pode vir acabar um trabalho, encontrar uma amiga ou simplesmente beber o café
          antes de voltar à rua. Aqui, não precisa de arranjar uma ocasião.
        </p>
        <p>
          Se trouxer companhia, puxe mais uma cadeira. O telefone pode esperar até ao
          fim do copo.
        </p>
        <a className="button button-dark" href="#menu">Ver o que vai para a mesa</a>
      </div>
    </section>
  );
}
