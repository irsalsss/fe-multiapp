import React from 'react';
import { EyeNoneIcon } from '@radix-ui/react-icons';

const IncognitoModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-700" 
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gray-700/50 p-10 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 ease-out">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-3xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 text-red-100 shadow-inner">
              <EyeNoneIcon className="h-12 w-12" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
            Incognito Not Supported
          </h2>
          
          <p className="mb-10 text-balance text-lg text-gray-300 leading-relaxed">
            This application is currently not supported for incognito mode. Since this application is built for portfolio purposes only, please use a standard browsing window to ensure your sessions and AI threads are properly synchronized.
          </p>

          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10" />

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-600/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 ring-1 ring-white/5">
              Access Restricted
            </span>
            <p className="mt-4 text-sm font-medium text-gray-500">
              Please restart the app in a normal tab.
            </p>
          </div>
        </div>

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
    </div>
  );
};

export default IncognitoModal;