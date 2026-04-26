import React, { useState, useEffect, memo } from 'react';
import { PersonIcon, TimerIcon, ExitIcon, Cross1Icon } from '@radix-ui/react-icons';
import { intervalToDuration, addHours, isAfter } from 'date-fns';

interface LimitModalProps {
  lastActive?: string;
  isGuest?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onClose?: () => void;
}

const LimitModal: React.FC<LimitModalProps> = ({ lastActive, isGuest, onSignIn, onSignOut, onClose }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!lastActive) return;

    const targetDate = addHours(new Date(lastActive), 24);

    const updateCountdown = () => {
      const now = new Date();
      if (isAfter(now, targetDate)) {
        setTimeLeft('00h : 00m : 00s');
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: targetDate,
      });

      const pad = (n: number | undefined) => (n || 0).toString().padStart(2, '0');

      const h = pad(duration.hours);
      const m = pad(duration.minutes);
      const s = pad(duration.seconds);

      setTimeLeft(`${h}h : ${m}m : ${s}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lastActive, isGuest]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-500 ease-out pointer-events-auto">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-700/80 p-6 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer z-10"
        >
          <Cross1Icon className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-amber-500/20 blur-xl" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-amber-100 shadow-inner">
                <TimerIcon className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Limit Reached
              </h2>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">
                {!isGuest ? 'User Access' : 'Guest Access'}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {!isGuest
              ? "Your daily limit has been exhausted. Access restores in:"
              : 'Guest limit reached. Sign in to continue creating more threads.'}
          </p>

          <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4 border border-white/5">
            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Resets in
            </div>
            <div className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tabular-nums">
              {timeLeft || '--h : --m : --s'}
            </div>
          </div>

          {isGuest ? (
            <button
              onClick={onSignIn}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <PersonIcon className="h-4 w-4" />
              <span>Sign In to Continue</span>
            </button>
          ) : (
            <button
              onClick={onSignOut}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-800/50 border border-white/10 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800/80 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExitIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Glow Effects */}
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-amber-500/10 blur-[50px]" />
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-[50px]" />
      </div>
    </div>
  );
};

export default memo(LimitModal);
