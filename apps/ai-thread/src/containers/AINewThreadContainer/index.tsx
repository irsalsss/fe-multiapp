import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { twJoin } from 'tailwind-merge';
import useZombieCookie from '../../hooks/useZombieCookie';
import { useGetStatsUsageQuery } from '../../api/@query/use-get-stats-usage';
import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import { COOKIE_X_GUEST_ID } from '../../const/cookies';

const AINewThreadContainer = () => {
  const { question } = useSendAIMessageStore(
    useShallow((state) => ({
      question: state.question,
    }))
  );

  const { user } = useUser();
  const userId = user?.id || Cookies.get(COOKIE_X_GUEST_ID) || '';

  useZombieCookie();
  useGetStatsUsageQuery(userId, !!userId);

  return (
    <div className="flex flex-col w-full relative">
      <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-white capitalize">
          {question}
        </h2>
      </div>

      <div
        className={twJoin(
          'bg-gray-500 py-8 rounded-lg',
          'flex justify-center w-full overflow-y-auto flex-1'
        )}
      >
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-center text-white">
            Ready when you are. Ask me anything!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AINewThreadContainer;
