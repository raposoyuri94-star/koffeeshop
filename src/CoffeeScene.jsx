import React from 'react';

export default function CoffeeScene() {
  return <div className="coffee-detail">
    <img loading="lazy" src={import.meta.env.BASE_URL + 'images/morrow-bag-and-cup-logo.png'}
      alt="A brown coffee bag and white coffee cup, both branded morrow" />
  </div>;
}
