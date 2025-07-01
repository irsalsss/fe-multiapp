import { Outlet } from 'react-router-dom';
import SidebarAIChat from './components/SidebarAIChat';

const AIChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <SidebarAIChat />

      <Outlet />
    </div>
  );
};

export default AIChatPage;
