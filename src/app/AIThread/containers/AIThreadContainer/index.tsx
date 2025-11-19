import { Outlet } from 'react-router-dom';
import SidebarAIThread from '../../components/SidebarAIThread';
import InputPrompt from '../../components/InputPrompt';
import { twJoin } from 'tailwind-merge';

const AIThreadContainer: React.FC = () => {
  return (
    <div className="flex h-screen">
      <SidebarAIThread />

      <div
        id="ai-thread-container"
        className={twJoin(
          'relative flex bg-gray-600 h-full w-full text-white',
          'p-4 pt-0 pl-0'
        )}
      >
        <Outlet />

        <div
          className={twJoin(
            'absolute bottom-0 left-[calc(50%-8px)] -translate-x-1/2 -translate-y-[16px]',
            'w-[calc(100%-16px)]',
            'p-6 pt-2',
            'shadow-xl bg-transparent backdrop-blur-md border border-transparent rounded-2xl',
            'z-10',
            'flex justify-center items-center'
          )}
        >
          <div className="w-[65%]">
            <InputPrompt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIThreadContainer;
