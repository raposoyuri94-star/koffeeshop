import { useEffect, useState } from 'react';

const RAIN_DURATION_MS = 3600;

export default function useCoffeeRain() {
  const [batch, setBatch] = useState(0);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    if (!isRaining) return;

    const timeout = window.setTimeout(() => setIsRaining(false), RAIN_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [isRaining, batch]);

  function makeItRain() {
    setBatch(currentBatch => currentBatch + 1);
    setIsRaining(true);
  }

  return { batch, isRaining, makeItRain };
}
