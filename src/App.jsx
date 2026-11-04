import React, { useEffect, useRef, useState } from 'react';
import Brand, { Flower, CoffeeDoodle } from './Brand';
import { images, menu, favorites } from './content';

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>;
}

function CateringDialog({ open, onClose }) {
  const dialog = useRef(null);

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
  return <dialog ref={dialog} className="catering-dialog" aria-labelledby="catering-dialog-title"
    onClose={() => { if (!dialog.current.open) onClose(); }} onKeyDown={keepFocusInDialog}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content">
      <button className="dialog-close" onClick={onClose} aria-label="Close catering details" autoFocus>×</button>
      <Flower className="dialog-flower" />
      <h2 id="catering-dialog-title">Good things.<br />For the whole table.</h2>
      <p>From the morning meeting to the big get-together, bring a little Kofeeshop along.</p>
      <div className="catering-options">
        <article><h3>Coffee for a crowd</h3><p>Freshly brewed coffee, milk options, and all the little extras.</p></article>
        <article><h3>The breakfast box</h3><p>A shareable selection of buttery pastries and breakfast favorites.</p></article>
        <article><h3>The lunch spread</h3><p>A mix of sandwiches for a table full of different tastes.</p></article>
      </div>
      <p className="dialog-note">Sample catering menu. Ask the shop about prices, availability, and dietary requirements before ordering.</p>
      <button className="button button-dark" onClick={onClose}>Sounds good <Arrow /></button>
    </div>
  </dialog>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('Coffee');
  const [cateringOpen, setCateringOpen] = useState(false);
  const [beanBatch, setBeanBatch] = useState(0);
  const [showBeans, setShowBeans] = useState(false);
  const navigationToggle = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        navigationToggle.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!showBeans) return;
    const timeout = window.setTimeout(() => setShowBeans(false), 3600);
    return () => window.clearTimeout(timeout);
  }, [showBeans, beanBatch]);

  function pickCategory(nextCategory) {
    setCategory(nextCategory);
    setMenuOpen(false);
  }
  function openCatering() {
    setMenuOpen(false);
    setCateringOpen(true);
  }
  function makeItRain() {
    setBeanBatch(batch => batch + 1);
    setShowBeans(true);
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="logo" href="#home" aria-label="Kofeeshop home"><Brand /></a>
      <button ref={navigationToggle} className="mobile-toggle" aria-label="Toggle navigation"
        aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span><span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="main-navigation" className={menuOpen ? 'main-navigation is-open' : 'main-navigation'} aria-label="Main navigation">
        <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
        <a href="#favorites" onClick={() => setMenuOpen(false)}>The good stuff</a>
        <button onClick={openCatering}>Catering</button>
        <a className="button button-dark nav-menu" href="#menu" onClick={() => setMenuOpen(false)}>View the menu <Arrow diagonal /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-heading">
        <img className="hero-image" src={images.hero.src} alt={images.hero.alt} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-intro"><span className="little-sun" aria-hidden="true">☀</span> Your daily happy place.</p>
          <h1 id="hero-heading">Coffee.<br />Good food.<br />Great days.</h1>
          <p className="hero-description">A proper cup. A bite you love.<br />A little time for yourself.</p>
          <a className="button button-light" href="#menu">Find your favorite <Arrow diagonal /></a>
        </div>
        <button className="coffee-sticker" onClick={makeItRain} aria-label="Make it rain coffee beans">
          <span className="sticker-top">Need a little</span><CoffeeDoodle />
          <span className="sticker-bottom">pick-me-up?</span><span className="sticker-hint">give me a click</span>
        </button>
        <div className="hero-bottom"><span>Good coffee. Better company.</span><a href="#favorites">A taste of Kofeeshop <span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="good-things-strip" aria-label="Fresh coffee, good food, and great company">
        <div aria-hidden="true">{[0, 1].map(copy => <React.Fragment key={copy}>
          <span>Freshly brewed</span><Flower /><span>Baked with love</span><Flower />
          <span>Come as you are</span><Flower /><span>Stay for another</span><Flower />
        </React.Fragment>)}</div>
      </div>
      <section className="favorites section-space" id="favorites" aria-labelledby="favorites-heading">
        <div className="favorites-heading"><p className="handwritten">Small joys, served daily.</p><h2 id="favorites-heading">Something good.<br />Whatever your mood.</h2><p>Early starts, slow mornings, and long lunch breaks.<br className="desktop-break" /> We've got just the thing.</p></div>
        <div className="favorite-grid">
          {favorites.map(favorite => <article className={`favorite favorite-${favorite.category.toLowerCase()}`} key={favorite.category}>
            <a className="favorite-photo" href="#menu" onClick={() => pickCategory(favorite.category)} aria-label={`Explore ${favorite.category.toLowerCase()}`}>
              <img src={images[favorite.image].src} alt={images[favorite.image].alt} loading="lazy" /><span className="photo-link" aria-hidden="true"><Arrow diagonal /></span>
            </a>
            <h3>{favorite.title}</h3><p>{favorite.description}</p>
            <a className="text-link" href="#menu" onClick={() => pickCategory(favorite.category)}>{favorite.link}<Arrow /></a>
          </article>)}
        </div>
      </section>
      <section className="story" id="story" aria-labelledby="story-heading">
        <div className="story-photo"><img src={images.story.src} alt={images.story.alt} loading="lazy" /><span className="photo-caption">Pull up a chair.</span></div>
        <div className="story-copy"><Flower className="story-flower" /><p className="handwritten">Hello, we're Kofeeshop.</p><h2 id="story-heading">Come for a cup.<br />Stay a little<br />longer.</h2>
          <p>We like our coffee carefully made and our tables full of conversation. A quick hello on your way to work. A catch-up that turns into lunch. Your favorite corner and a book.</p>
          <p>There's always room for a little pause in the day. Make yourself at home.</p>
          <a className="button button-dark" href="#menu">Find your usual <Arrow diagonal /></a>
        </div>
      </section>
      <section className="menu-section section-space" id="menu" aria-labelledby="menu-heading">
        <div className="menu-heading"><div><p className="handwritten">The usual? Or something new?</p><h2 id="menu-heading">What sounds good?</h2></div><p>A little of what you love.<br />A little of what you'll love next.</p></div>
        <div className="menu-toolbar"><div className="menu-tabs" role="group" aria-label="Menu category">
          {Object.keys(menu).map(name => <button className={category === name ? 'active' : ''} aria-pressed={category === name} key={name} onClick={() => setCategory(name)}>{name}</button>)}
        </div><span className="menu-milk-note">Your cup, your choice of milk.</span></div>
        <div className="menu-list" aria-live="polite" aria-atomic="true">
          {menu[category].map(item => <article className="menu-item" key={item.name}><div className="menu-item-heading"><h3>{item.name}</h3><span className="menu-price">{item.price}</span></div><p>{item.description}</p></article>)}
        </div>
        <div className="menu-footnote"><p>Have a dietary requirement? Ask before you order.</p><span>Sample menu & prices</span></div>
      </section>
      <section className="catering" id="catering" aria-labelledby="catering-heading">
        <div className="catering-copy"><p className="handwritten">Good things are better shared.</p><h2 id="catering-heading">You bring<br />the people.<br />We'll bring the good.</h2><p>Team breakfasts, birthday brunches, or just because.<br className="desktop-break" /> A little Kofeeshop makes a good get-together.</p><button className="button button-light" onClick={openCatering}>Explore catering <Arrow diagonal /></button></div>
        <div className="catering-art" aria-hidden="true"><span className="art-spark art-spark-one">✳</span><CoffeeDoodle /><span className="art-spark art-spark-two">✳</span><p>made to share.</p></div>
      </section>
      <section className="closing-note" aria-label="A little more Kofeeshop"><Flower /><p>Life happens.<br /><span>Coffee helps.</span></p><Flower /></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><div><p className="footer-greeting">See you for a cup.</p><p>Your daily dose of coffee & company.</p></div><nav aria-label="Footer navigation"><a href="#menu">Our menu</a><a href="#story">Our story</a><button onClick={openCatering}>Catering</button><a href="#home">Back to top ↑</a></nav></div>
      <a className="footer-wordmark" href="#home" aria-label="Kofeeshop home">kofeeshop<span>™</span></a>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} Kofeeshop</small><small>Location & opening hours to be announced.</small><span>Good coffee. Great days.</span></div>
    </footer>
    <CateringDialog open={cateringOpen} onClose={() => setCateringOpen(false)} />
    {showBeans && <div className="bean-rain" key={beanBatch} aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <span className="falling-bean" key={index} style={{ '--bean-x': `${(index * 37 + 7) % 100}%`, '--bean-delay': `${(index % 6) * 0.12}s`, '--bean-rotation': `${index * 47}deg`, '--bean-drift': `${index % 2 ? 90 : -90}px` }} />)}</div>}
    <span className="sr-only" role="status">{showBeans ? 'A little coffee joy, on the house.' : ''}</span>
  </div>;
}
