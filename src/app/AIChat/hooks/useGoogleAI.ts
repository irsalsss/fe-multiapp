import { GoogleGenAI } from '@google/genai';
import { useShallow } from 'zustand/react/shallow'
import useSendAIMessageStore, { type StreamChunk } from '../store/useSendAIMessageStore';

interface SendGoogleAIMessageProps {
  message: string;
  onSuccess: (description: string) => Promise<void> | void;
}

const useGoogleAI = () => {
  const { setMessagesAI, setAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      setMessagesAI: state.setMessagesAI,
      setAnswer: state.setAnswer,
    })),
  )

  const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_PUBLIC_KEY as string) || '';

  const googleAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const sendGoogleAIMessage = async ({ message, onSuccess }: SendGoogleAIMessageProps) => {
    if (!message) {
      throw new Error('Message is required');
    }

    const startTime = Date.now();
    const streamChunks: StreamChunk[] = [];
    let chunkIndex = 0;

    const response = await googleAI.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: message,
      config: {
        maxOutputTokens: 1000,
      }
    });

    let answer = '';

    try {
      for await (const chunk of response) {
        const chunkText = chunk.text ?? '';
        answer += chunkText;
        setAnswer(answer)
        streamChunks.push({
          text: chunkText,
          timestamp: new Date().toISOString(),
          chunkIndex: chunkIndex++
        });
      }

      const responseTimeMs = Date.now() - startTime;

      setMessagesAI({
        role: 'model',
        content: answer,
        metadata: {
          model: 'gemini-2.0-flash',
          responseTimeMs,
          streamChunks,
        }
      });
      await onSuccess(answer);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return { sendGoogleAIMessage };
};

export default useGoogleAI;