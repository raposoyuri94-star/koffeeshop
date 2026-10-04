import React from 'react';

export default function CoffeeMug() {
  return <div className="story-photo mug-photo">
    <img className="mug-view" loading="lazy" src={import.meta.env.BASE_URL + 'images/coffee-bean-render.png'} alt="A roasted coffee bean with a detailed central groove" />
  </div>;
}
