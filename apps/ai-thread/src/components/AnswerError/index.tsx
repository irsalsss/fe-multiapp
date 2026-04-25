import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface AnswerErrorProps {
  error: {
    message: string;
    status?: string | number;
    code?: string | number;
  };
}

const AnswerError = ({ error }: AnswerErrorProps) => {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-100/10 border border-red-100/20 w-full max-w-2xl animate-slide-down">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 rounded-lg bg-red-100/20">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-100" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[15px] font-bold text-red-100">
          AI Generation Error
        </h3>
        <p className="text-[14px] text-red-100/90 leading-relaxed font-medium">
          {error.message}
        </p>
        {(error.status || error.code) && (
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-100/20 text-red-100/70 uppercase tracking-tight">
              Code: {error.status || error.code}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerError;
