import { Outlet } from 'react-router-dom';
import SidebarAIThread from '../../components/SidebarAIThread';
import InputPrompt from '../../components/InputPrompt';

const AIThreadContainer: React.FC = () => {
  return (
    <div className="flex h-screen">
      <SidebarAIThread />

      <div id="ai-thread-container" className='relative flex bg-gray-600 h-full w-full text-white p-4 pt-0 pl-0'>
        <Outlet />

        <div className="absolute bottom-[16px] w-[80%] left-[calc(50%-8px)] -translate-x-1/2 -translate-y-[16px] shadow-custom z-10">
          <InputPrompt />
        </div>
      </div>
    </div>
  );
};

export default AIThreadContainer;
