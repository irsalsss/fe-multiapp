import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import AIThreadContainer from './containers/AIThreadContainer';
import { ClerkProvider, SignIn } from '@clerk/clerk-react';
import UnauthenticatedLayout from './layouts/UnauthenticatedLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTE_AI_THREAD, ROUTE_SIGN_IN } from './const/routes';
import ThreadRoom from './components/ThreadRoom';
import AINewThreadContainer from './containers/AINewThreadContainer';

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
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl={window.location.origin + import.meta.env.BASE_URL}
        signInFallbackRedirectUrl={window.location.origin + import.meta.env.BASE_URL}
        signUpFallbackRedirectUrl={window.location.origin + import.meta.env.BASE_URL}
      >
        <Routes>
          {/* Authenticated Routes */}
          <Route element={<AuthenticatedLayout />}>
            <Route path={ROUTE_AI_THREAD} element={<AIThreadContainer />}>
              <Route path="" element={<AINewThreadContainer />} />
              <Route path=":conversationId" element={<ThreadRoom />} />
            </Route>

            <Route path="*" element={<Navigate to={ROUTE_AI_THREAD} />} />
          </Route>

          {/* Unauthenticated Routes */}
          <Route element={<UnauthenticatedLayout />}>
            <Route 
              path={ROUTE_SIGN_IN} 
              element={
                <SignIn 
                  fallbackRedirectUrl={window.location.origin + import.meta.env.BASE_URL} 
                  signUpFallbackRedirectUrl={window.location.origin + import.meta.env.BASE_URL}
                />
              } 
            />
          </Route>
        </Routes>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default App;
