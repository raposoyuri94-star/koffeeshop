import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CoffeeScene from './CoffeeScene';
import Brand from './Brand';
import CoffeeMug from './CoffeeMug';
gsap.registerPlugin(ScrollTrigger);

export default function App(){
 const root=useRef(null);const [menuOpen,setMenuOpen]=useState(false),[category,setCategory]=useState('Coffee');
 useEffect(() => {
   const context = gsap.context(() => {
     const media = gsap.matchMedia();
     media.add('(prefers-reduced-motion: no-preference)', () => {
       const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
       intro
         .from('.hero-title span', { y: 45, opacity: 0, stagger: .12, duration: 1 })
         .from('.hero-visual', { y: 35, rotation: -6, scale: .94, opacity: 0, duration: 1.2 }, .15)
         .from('.hero-description, .hero-actions', { y: 18, opacity: 0, stagger: .12, duration: .7 }, .5);

       gsap.to('.hero-visual img', { y: -45, rotation: 7, ease: 'none',
         scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
       });

       gsap.fromTo('.story-photo .mug-view',
         { y: 22, rotation: -8 },
         { y: -22, rotation: 8, ease: 'none', scrollTrigger: {
           trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1
         } }
       );

       ['.story-copy', '.ritual-heading', '.menu-intro', '.featured-copy', '.coffee-guide-heading'].forEach(selector => {
         gsap.from(selector, { y: 28, opacity: 0, duration: .8, ease: 'power2.out',
           scrollTrigger: { trigger: selector, start: 'top 88%', once: true }
         });
       });
     });
     return () => media.revert();
   }, root);
   return () => context.revert();
 }, []);
 const drinks=category==='Coffee'?[['Espresso','A single espresso.','$3.50','30 ml'],['Flat white','Double espresso with steamed milk.','$4.50','150 ml'],['Latte','Espresso with steamed milk and microfoam.','$5.00','240 ml'],['Cold brew','Coffee steeped in cold water overnight.','$5.00','300 ml']]:[['Matcha latte','Stone-ground matcha with your choice of milk.','$5.50','240 ml'],['Chai','Spiced tea with steamed milk.','$5.00','240 ml'],['Hot chocolate','Dark chocolate with steamed milk.','$4.50','240 ml'],['Seasonal tea','A rotating selection of teas.','$3.50','300 ml']];
 return <div ref={root}><header className="nav"><a className="logo" href="#home" aria-label="Morrow Coffee home"><Brand /></a><button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen?'Close':'Menu'}</button><nav className={menuOpen?'open':''}><a href="#ritual" onClick={()=>setMenuOpen(false)}>Daily Morrow</a><a href="#menu" onClick={()=>setMenuOpen(false)}>Our menu</a><a href="#story" onClick={()=>setMenuOpen(false)}>Our story</a></nav><a className="nav-visit" href="#featured">Our latte</a></header>
 <main><section className="hero" id="home"><div className="hero-content"><p className="hero-location">Morrow Coffee</p><h1 className="hero-title"><span>Make time</span><span>for a</span><span><em>good cup.</em></span></h1><p className="hero-description">Espresso, milk drinks, and cold brew.<br/>Find your usual.</p><div className="hero-actions"><a className="primary-button" href="#ritual">Daily Morrow </a><a className="quiet-link" href="#menu">Explore the menu</a></div></div><div className="hero-visual"><img src={import.meta.env.BASE_URL + 'images/coffee-mug-finished.png'} alt="A white ceramic mug filled with coffee and golden crema" fetchPriority="high" /></div><div className="hero-bottom"><span>Morrow Coffee</span><a href="#ritual"> Daily Morrow</a><span className="hero-coordinate">Espresso and milk drinks</span></div></section>
 <div className="brand-strip"><span>Specialty coffee</span><span>Espresso</span><span>Milk drinks</span><span>Cold brew</span></div>
 <section className="story" id="story"><CoffeeMug /><div className="story-copy"><span className="section-note">About Morrow</span><h2>A place for<br/>coffee and<br/>company.</h2><p>Espresso, steamed milk, and time at the coffee bar.</p><p>Browse the menu and find your daily Morrow.</p><a className="text-link" href="#coffee-guide">Find your cup</a></div></section>
 <section className="ritual" id="ritual">
   <div className="ritual-heading"><h2>Your daily<br/>Morrow.</h2><p>A bag of coffee.<br/>A cup to make time for.</p></div>
   <div className="scene-wrap"><CoffeeScene /></div>
 </section>
 <section className="featured-drink" id="featured" aria-labelledby="featured-heading">
   <div className="featured-photo"><img loading="lazy" src={import.meta.env.BASE_URL + 'images/morrow-latte.png'} alt="A Morrow-branded latte cup with rosetta latte art on a cream stone counter" /></div>
   <div className="featured-copy"><span className="section-note">In the spotlight</span><h2 id="featured-heading">The Morrow<br/>latte.</h2><p>Espresso meets steamed milk, finished with a fine layer of microfoam. A softer, creamier way to enjoy your coffee.</p><div className="featured-specs"><span>240 ml</span><span>Oat milk available</span><strong>$5.00</strong></div><a className="text-link" href="#menu" onClick={()=>setCategory('Coffee')}>See the coffee menu</a><small>Sample price</small></div>
 </section>
 <section className="menu-section" id="menu" aria-labelledby="menu-heading">
   <div className="menu-intro">
     <div><span className="section-note">The Morrow menu</span><h2 id="menu-heading">Find your usual.</h2></div>
     <p>A short menu. A good cup.<br/>Coffee, tea, and chocolate.</p>
   </div>
   <div className="menu-toolbar">
     <div className="menu-tabs" role="group" aria-label="Menu category">
       {['Coffee','Something else'].map(c => <button className={category===c?'active':''} aria-pressed={category===c} key={c} onClick={()=>setCategory(c)}>{c}</button>)}
     </div>
     <span className="menu-footnote">Oat milk available</span>
   </div>
   <div className="menu-list">
     {drinks.map(([name,note,price,size]) => <article className="menu-item" key={name}>
       <div className="menu-item-heading"><h3>{name}</h3><span className="menu-leader" aria-hidden="true"/><span className="menu-price">{price}</span></div>
       <p>{note}</p><small>{size}</small>
     </article>)}
   </div>
   <div className="menu-notice"><p>Make it yours. Ask about milk options and extra espresso shots.</p><span className="sample-note">Sample prices</span></div>
   <div className="menu-options"><div><h3>Your milk</h3><p>Oat milk is available. Ask about other alternatives.</p></div><div><h3>A little stronger</h3><p>Ask for an extra espresso shot and confirm the price at the bar.</p></div><div><h3>Something cool</h3><p>Choose cold brew for coffee steeped overnight and served cold.</p></div></div>
 </section>
 <section className="coffee-guide" id="coffee-guide" aria-labelledby="guide-heading"><div className="coffee-guide-heading"><span className="section-note">Find your cup</span><h2 id="guide-heading">How do you<br/>like your coffee?</h2><p>Start with the kind of cup you enjoy.</p></div><div className="coffee-guide-list"><article><h3>Bold & concentrated</h3><p>Espresso is a small, intense cup. Enjoy the coffee on its own, without milk.</p><a className="text-link" href="#menu" onClick={()=>setCategory('Coffee')}>Try an espresso</a></article><article><h3>Smooth & milky</h3><p>A flat white keeps espresso at the center. A latte adds more steamed milk for a gentler cup.</p><a className="text-link" href="#featured">Meet the latte</a></article><article><h3>Cold & refreshing</h3><p>Cold brew is steeped in cold water overnight. A chilled choice for a slower sip.</p><a className="text-link" href="#menu" onClick={()=>setCategory('Coffee')}>Explore cold brew</a></article></div></section></main><footer><a className="logo" href="#home" aria-label="Morrow Coffee home"><Brand /></a><p>Coffee shop</p><a href="#home">Back to top</a><small>Copyright {new Date().getFullYear()} Morrow Coffee | Concept by Nexzo</small></footer></div>;
}
