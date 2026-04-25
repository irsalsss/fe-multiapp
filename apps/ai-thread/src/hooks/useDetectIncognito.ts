import { useState, useEffect } from 'react';
import detectIncognito from 'detectincognitojs';

const useDetectIncognito = () => {
  const [isIncognito, setIsIncognito] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkBrowserState = async () => {
      try {
        const result = await detectIncognito();
        
        if (isMounted) {
          setIsIncognito(result.isPrivate);
        }
      } catch (error) {
        console.error("Failed to detect incognito status:", error);
      }
    };

    checkBrowserState();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isIncognito };
}

export default useDetectIncognito;
