import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import AIChatContainer from './app/AIChat/containers/AIChatContainer';
import { ClerkProvider, SignIn } from '@clerk/clerk-react';
import UnauthenticatedLayout from './components/layouts/UnauthenticatedLayout';
import AuthenticatedLayout from './components/layouts/AuthenticatedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTE_AI_CHAT, ROUTE_SIGN_IN } from './const/routes';
import ChatRoom from './app/AIChat/components/ChatRoom';
import AINewChatContainer from './app/AIChat/containers/AINewChatContainer';

const PUBLISHABLE_KEY =
  (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string) || '';

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          {/* Authenticated Routes */}
          <Route element={<AuthenticatedLayout />}>
            <Route path={ROUTE_AI_CHAT} element={<AIChatContainer />}>
              <Route path="" element={<AINewChatContainer />} />
              <Route path=":conversationId" element={<ChatRoom />} />
            </Route>

            <Route path="*" element={<Navigate to={ROUTE_AI_CHAT} />} />
          </Route>

          {/* Unauthenticated Routes */}
          <Route element={<UnauthenticatedLayout />}>
            <Route path={ROUTE_SIGN_IN} element={<SignIn />} />
          </Route>
        </Routes>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default App;
