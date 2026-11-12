import { useEffect } from 'react';

export default function useInitialHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || window.location.hash !== hash) return;

      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);
}
