// since this @google/genai is new, so there are some issues with the types
// thus we need to disable the following eslint rules for learning purposes

import { GoogleGenAI } from '@google/genai';
import { useShallow } from 'zustand/react/shallow'
import useSendAIMessageStore from '../store/useSendAIMessageStore';

const useGoogleAI = () => {
  const { messagesAI, setMessagesAI, setAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      messagesAI: state.messagesAI,
      setMessagesAI: state.setMessagesAI,
      setAnswer: state.setAnswer,
    })),
  )

  const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_PUBLIC_KEY as string) || '';

  const googleAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const sendGoogleAIMessage = async (message: string) => {
    const response = await googleAI.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: message,
      config: {
        maxOutputTokens: 200,
      }
    });

    let answer = '';

    try {
      for await (const chunk of response) {
        answer += chunk.text ?? '';
        setAnswer(answer)
      }

      setMessagesAI({ role: 'model', content: answer });
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return { sendGoogleAIMessage, messagesAI };
};

export default useGoogleAI;