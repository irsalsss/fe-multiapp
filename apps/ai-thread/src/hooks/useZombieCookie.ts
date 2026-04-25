import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { COOKIE_X_GUEST_ID } from '../const/cookies';

const useZombieCookie = () => {  
  const cookieName = COOKIE_X_GUEST_ID;

  useEffect(() => {
    const cookieConfig = { expires: 365, path: '/' };
    let value = Cookies.get(cookieName) || localStorage.getItem(cookieName);

    if (!value) {
      value = uuidv4();
    }

    Cookies.set(cookieName, value, cookieConfig);
    localStorage.setItem(cookieName, value);

    const interval = setInterval(() => {
      const currentCookie = Cookies.get(cookieName);
      
      if (!currentCookie) {
        console.warn('Cookie missing! Restoring from LocalStorage backup...');

        const backupValue = localStorage.getItem(cookieName) || uuidv4();
        
        Cookies.set(cookieName, backupValue, cookieConfig);
        localStorage.setItem(cookieName, backupValue);
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, [cookieName]);
};

export default useZombieCookie;