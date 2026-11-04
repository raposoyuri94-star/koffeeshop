import React from 'react';

export function Flower({ className = '' }) {
  return <svg className={`flower ${className}`} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    {Array.from({ length: 8 }, (_, index) => <ellipse key={index} cx="32" cy="14" rx="8" ry="13" transform={`rotate(${index * 45} 32 32)`} />)}
    <circle cx="32" cy="32" r="13" /><circle className="flower-center" cx="32" cy="32" r="5" />
  </svg>;
}

export function CoffeeDoodle() {
  return <svg className="coffee-doodle" viewBox="0 0 230 250" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M83 62c-16-19 12-24-1-41m38 38c-16-18 12-24-1-41m36 46c-16-18 12-24-1-41" />
      <path className="doodle-cup" d="M44 88h125l-9 76c-3 29-19 44-52 44s-50-16-54-44L44 88Z" />
      <path d="M169 103h15c34 0 34 48 0 48h-20M35 91c0-10 31-17 71-17s72 7 72 17-32 17-72 17-71-7-71-17Z" />
      <path d="M79 132v11m53-11v11m-40 17c8 10 20 10 28 0M82 204l-9 24-19 3m79-28 12 24 19 3" />
      <path d="m50 134-22 14-8-9m8 9-2 12" />
    </g>
  </svg>;
}

export default function Brand() {
  return <><Flower /><span className="brand-wordmark">kofeeshop<span className="brand-registered">™</span></span></>;
}
