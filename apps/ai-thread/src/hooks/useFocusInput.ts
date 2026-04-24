import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_AI_THREAD } from '../const/routes';
import { useInputPromptStore } from '../store/useInputPromptStore';

export const useFocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const focusTrigger = useInputPromptStore((state) => state.focusTrigger);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const isInputFocused = 
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (event.key === '/' && !isInputFocused) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current && pathname === ROUTE_AI_THREAD) {
      inputRef.current.focus();
    }
  }, [pathname]);

  useEffect(() => {
    if (focusTrigger > 0) {
      inputRef.current?.focus();
    }
  }, [focusTrigger]);

  return inputRef;
};
