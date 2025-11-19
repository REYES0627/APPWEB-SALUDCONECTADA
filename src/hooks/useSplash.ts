import { useState, useEffect } from 'react';

export const useSplash = (): boolean => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    console.log('🎭 MODO PRUEBA: Siempre mostrar splash');
    
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return showSplash;
};