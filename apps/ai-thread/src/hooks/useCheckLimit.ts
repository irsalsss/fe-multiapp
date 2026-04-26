import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import { COOKIE_X_GUEST_ID } from '../const/cookies';
import { USER_THREADS_24_HOURS_LIMIT, GUEST_THREADS_24_HOURS_LIMIT } from '../const/limit';
import { useGetStatsUsageQuery } from '../api/@query/use-get-stats-usage';

export const useCheckLimit = () => {
  const { user, isLoaded } = useUser();
  const userId = isLoaded ? (user?.id || Cookies.get(COOKIE_X_GUEST_ID) || '') : '';
  const limit = user ? USER_THREADS_24_HOURS_LIMIT : GUEST_THREADS_24_HOURS_LIMIT;

  const { data, isLoading } = useGetStatsUsageQuery(userId, !!userId);
  const current24hUsage = data?.current24HUsage || 0;
  const lastActive = data?.lastActive || '';

  const isLimitReached = isLoaded && !isLoading && current24hUsage >= limit;

  return {
    isLimitReached,
    lastActive,
    isGuest: !user,
    isLoading: !isLoaded || isLoading,
  };
};
