import { Outlet, useNavigate } from 'react-router-dom';

import SidebarAIThread from '../../components/SidebarAIThread';
import InputPrompt from '../../components/InputPrompt';
import { twJoin } from 'tailwind-merge';
import useDetectIncognito from '../../hooks/useDetectIncognito';
import IncognitoModal from '../../components/IncognitoModal';
import useZombieCookie from '../../hooks/useZombieCookie';
import { useGetStatsUsageQuery } from '../../api/@query/use-get-stats-usage';
import { useUser, useClerk } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import { COOKIE_X_GUEST_ID } from '../../const/cookies';
import { USER_THREADS_24_HOURS_LIMIT, GUEST_THREADS_24_HOURS_LIMIT } from '../../const/limit';
import LimitModal from '../../components/LimitModal';
import { ROUTE_SIGN_IN } from '../../const/routes';


const AIThreadContainer: React.FC = () => {
  const navigate = useNavigate();
  const { isIncognito } = useDetectIncognito();

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const userId = isLoaded ? (user?.id || Cookies.get(COOKIE_X_GUEST_ID) || '') : '';
  const limit = user ? USER_THREADS_24_HOURS_LIMIT : GUEST_THREADS_24_HOURS_LIMIT;

  const { data } = useGetStatsUsageQuery(userId, !!userId);
  const current24hUsage = data?.current24HUsage || 0;
  const lastActive = data?.lastActive || '';

  useZombieCookie();

  if (isIncognito) {
    return (
      <IncognitoModal />
    )
  }

  if (isLoaded && current24hUsage >= limit) {
    return (
      <LimitModal
        lastActive={lastActive}
        isGuest={!user}
        onSignIn={() => navigate(ROUTE_SIGN_IN)}
        onSignOut={() => signOut()}
      />
    );
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
