import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import SidebarAIThread from '../../components/SidebarAIThread';
import InputPrompt from '../../components/InputPrompt';
import { twJoin } from 'tailwind-merge';
import useDetectIncognito from '../../hooks/useDetectIncognito';
import IncognitoModal from '../../components/IncognitoModal';
import useZombieCookie from '../../hooks/useZombieCookie';
import { useClerk } from '@clerk/clerk-react';
import LimitModal from '../../components/LimitModal';
import { ROUTE_SIGN_IN } from '../../const/routes';
import { useCheckLimit } from '../../hooks/useCheckLimit';
import { useLimitStore } from '../../store/useLimitStore';
import { useShallow } from 'zustand/shallow';


const AIThreadContainer: React.FC = () => {
  const navigate = useNavigate();
  const { isIncognito } = useDetectIncognito();
  const { signOut } = useClerk();
  
  const { lastActive, isGuest } = useCheckLimit();
  const { isShowLimitModal, setIsShowLimitModal } = useLimitStore(useShallow((state) => ({
    isShowLimitModal: state.isShowLimitModal,
    setIsShowLimitModal: state.setIsShowLimitModal,
  })));

  useZombieCookie();

  if (isIncognito) {
    return (
      <IncognitoModal />
    )
  }

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <SidebarAIThread />

      <div
        id="ai-thread-container"
        className={twJoin(
          'relative flex bg-gray-600 h-full w-full text-white',
          'mt-[64px] md:mt-0'
        )}
      >
        <Outlet />

        {isShowLimitModal && (
          <LimitModal
            lastActive={lastActive}
            isGuest={isGuest}
            onSignIn={() => navigate(ROUTE_SIGN_IN)}
            onSignOut={() => signOut()}
            onClose={() => setIsShowLimitModal(false)}
          />
        )}

        <div
          className={twJoin(
            'absolute',
            'p-6 pt-2',
            'bottom-[50px] left-0 w-full',
            'md:bottom-0 md:w-[calc(100%-16px)] md:left-[calc(50%-4px)] md:-translate-x-1/2',
            'shadow-xl bg-transparent backdrop-blur-md border border-transparent rounded-2xl',
            'z-10',
            'flex justify-center items-center',
          )}
        >
          <div className="w-full md:w-[65%]">
            <InputPrompt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIThreadContainer;
