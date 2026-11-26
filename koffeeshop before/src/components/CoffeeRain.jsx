import React from 'react';

function beanStyle(index) {
  return {
    '--bean-x': `${(index * 37 + 7) % 100}%`,
    '--bean-delay': `${(index % 6) * 0.12}s`,
    '--bean-rotation': `${index * 47}deg`,
    '--bean-drift': `${index % 2 ? 90 : -90}px`,
  };
}

export default function CoffeeRain({ visible, batch }) {
  return (
    <>
      {visible && (
        <div className="bean-rain" key={batch} aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span className="falling-bean" key={index} style={beanStyle(index)} />
          ))}
        </div>
      )}
      <span className="sr-only" role="status">
        {visible ? 'Uma chuva de grãos de café.' : ''}
      </span>
    </>
  );
}
