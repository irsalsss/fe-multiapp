import { GoogleGenAI } from '@google/genai';
import { useShallow } from 'zustand/react/shallow'
import useSendAIMessageStore, { type StreamChunk } from '../store/useSendAIMessageStore';

interface SendGoogleAIMessageProps {
  message: string;
  onSuccess: (description: string) => Promise<void> | void;
}

const useGoogleAI = () => {
  const { setMessagesAI, setAnswer, setError, setIsLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      setMessagesAI: state.setMessagesAI,
      setAnswer: state.setAnswer,
      setError: state.setError,
      setIsLoadingAnswer: state.setIsLoadingAnswer
    })),
  )

  const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_PUBLIC_KEY as string) || '';

  const googleAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const sendGoogleAIMessage = async ({ message, onSuccess }: SendGoogleAIMessageProps) => {
    setError(null);
    if (!message) {
      throw new Error('Message is required');
    }

    const startTime = Date.now();
    const streamChunks: StreamChunk[] = [];
    let chunkIndex = 0;

    try {
      const response = await googleAI.models.generateContentStream({
        model: 'gemini-3.1-flash-lite-preview',
        contents: message,
        config: {
          maxOutputTokens: 1000,
        }
      });

      let answer = '';

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
          model: 'gemini-3.1-flash-lite-preview',
          responseTimeMs,
          streamChunks,
        }
      });
      await onSuccess(answer);
    } catch (error: any) {
      console.error('Error generating content:', error);
      
      let finalMessage = error.message || 'An unexpected error occurred while generating content.';
      
      // Try to parse nested JSON if it exists in the message (Google AI often returns this)
      try {
        const messageStr = error.message as string;
        const jsonStart = messageStr.indexOf('{');
        if (jsonStart !== -1) {
          const jsonPart = messageStr.substring(jsonStart);
          const parsed = JSON.parse(jsonPart);
          
          if (parsed.error?.message) {
            finalMessage = parsed.error.message;
            
            // Check if the nested message is ALSO a stringified JSON
            try {
              const nested = JSON.parse(finalMessage);
              if (nested.error?.message) {
                finalMessage = nested.error.message;
              }
            } catch (e) {
              // Not JSON, use as is
            }
          }
        }
      } catch (e) {
        // Parsing failed, keep original message
      }

      setError({
        ...error,
        message: finalMessage,
        status: error.status || error.code,
        code: error.code || error.status,
      });
      setIsLoadingAnswer(false)
    }
  };

  return { sendGoogleAIMessage };
};

export default useGoogleAI;