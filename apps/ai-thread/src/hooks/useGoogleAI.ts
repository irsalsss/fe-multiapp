import { useShallow } from 'zustand/react/shallow'
import useSendAIMessageStore from '../store/useSendAIMessageStore';

interface SendGoogleAIMessageProps {
  message: string;
  onSuccess: (description: string) => Promise<void> | void;
}

const useGoogleAI = () => {
  const { setAnswer, setError, setIsLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      setAnswer: state.setAnswer,
      setError: state.setError,
      setIsLoadingAnswer: state.setIsLoadingAnswer
    })),
  )

  const sendGoogleAIMessage = async ({ message, onSuccess }: SendGoogleAIMessageProps) => {
    setIsLoadingAnswer(true);
    setError(null);
    setAnswer('');

    try {
      const API_URL = (import.meta.env.VITE_API_URL as string) || '';
      const response = await fetch(`${API_URL}/api/gemini/ask-gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, userId: 'current-user-id' }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedAnswer = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') break;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              
              accumulatedAnswer += parsed.text;
              setAnswer(accumulatedAnswer);
            } catch (e) {
              // Handle parsing logic
            }
          }
        }
      }

      await onSuccess(accumulatedAnswer);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return { sendGoogleAIMessage };
};

export default useGoogleAI;