import React, { useState, useEffect, memo } from 'react';
import { PersonIcon, TimerIcon, ExitIcon } from '@radix-ui/react-icons';
import { intervalToDuration, addHours, isAfter } from 'date-fns';

interface LimitModalProps {
  lastActive?: string;
  isGuest?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const LimitModal: React.FC<LimitModalProps> = ({ lastActive, isGuest, onSignIn, onSignOut }) => {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-700"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gray-700/50 p-10 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 ease-out">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-amber-100 shadow-inner">
              <TimerIcon className="h-12 w-12" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
            Daily Limit Reached
          </h2>

          <p className="mb-10 text-balance text-lg text-gray-300 leading-relaxed">
            {!isGuest
              ? "You've exhausted your daily thread limit. Your access will be restored once the countdown ends."
              : 'You have reached the limit for guest users. To continue creating more threads and keep your history, please sign in to your account.'}
          </p>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">
              Resets in
            </div>
            <div className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tabular-nums">
              {timeLeft || '--h : --m : --s'}
            </div>
          </div>

          {isGuest && (
            <button
              onClick={onSignIn}
              className="group relative mt-10 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <PersonIcon className="h-5 w-5" />
              <span>Sign In to Continue</span>
            </button>
          )}

          {!isGuest && (
            <button
              onClick={onSignOut}
              className="group relative mt-10 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gray-800/50 border border-white/10 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-gray-800/80 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExitIcon className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          )}

          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-600/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 ring-1 ring-white/5">
              {!isGuest ? 'User Plan' : 'Guest Access'}
            </span>
          </div>
        </div>

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
    </div>
  );
};

export default memo(LimitModal);
