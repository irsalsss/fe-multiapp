import { Routes, Route } from 'react-router-dom'
import './styles/global.css';
import AIChatbotPage from './app/AIChatbot'
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import UnauthenticatedLayout from './components/layouts/UnauthenticatedLayout'
import AuthenticatedLayout from './components/layouts/AuthenticatedLayout';

const PUBLISHABLE_KEY = (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string) || '';

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<SignedIn><AuthenticatedLayout /></SignedIn>}>
          <Route path="/ai-chatbot" element={<AIChatbotPage />} />
        </Route>

        {/* Unauthenticated Routes */}
        <Route element={<SignedOut><UnauthenticatedLayout /></SignedOut>}>
          <Route path="/" element={<SignIn />} />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

export default App
