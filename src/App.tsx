import { Routes, Route } from 'react-router-dom'
import './styles/global.css';
import AIChatbotPage from './app/AIChatbot'

function App() {
  return (
    <Routes>
      <Route path="/ai-chatbot" element={<AIChatbotPage />} />
    </Routes>
  )
}

export default App
