import React from 'react';

export default function Brand() {
  return <><img className="brand-mark" src={import.meta.env.BASE_URL + 'images/morrow-mark.svg'} alt=""/><span className="brand-wordmark">morrow<span className="brand-subtitle">Coffee</span></span></>;
}
