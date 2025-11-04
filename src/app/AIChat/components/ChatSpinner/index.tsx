/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { EnumSpinnerType } from './types';

interface BeautySpinnerProps {
  type: EnumSpinnerType;
}

const BeautySpinner = ({ type }: BeautySpinnerProps) => {
  // const spinnerTypes: SpinnerType[] = [
  //   { id: EnumSpinnerType.GRADIENT_PULSE, name: 'Gradient Pulse' },
  //   { id: EnumSpinnerType.RAINBOW_RING, name: 'Rainbow Ring' },
  //   { id: EnumSpinnerType.DOTS_WAVE, name: 'Dots Wave' },
  //   { id: EnumSpinnerType.MORPHING_SQUARES, name: 'Morphing Squares' },
  //   { id: EnumSpinnerType.AURORA_SPIN, name: 'Aurora Spin' },
  //   { id: EnumSpinnerType.PARTICLE_ORBIT, name: 'Particle Orbit' },
  // ];

  const renderSpinner = (type: EnumSpinnerType) => {
    switch (type) {
      case EnumSpinnerType.GRADIENT_PULSE:
        return (
          <div className="relative top-[-20px]">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-ping opacity-75"></div>
          </div>
        );

      case EnumSpinnerType.RAINBOW_RING:
        return (
          <div className="relative w-4 h-4">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-spin"
              style={{ backgroundClip: 'padding-box' }}
            ></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
          </div>
        );

      case EnumSpinnerType.DOTS_WAVE:
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              ></div>
            ))}
          </div>
        );

      case EnumSpinnerType.MORPHING_SQUARES:
        return (
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg animate-spin origin-center transform"></div>
            <div className="absolute inset-2 bg-gradient-to-tl from-emerald-400 to-cyan-400 rounded animate-pulse"></div>
          </div>
        );

      case EnumSpinnerType.AURORA_SPIN:
        return (
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-spin opacity-80 blur-sm"></div>
            <div
              className="absolute inset-1 rounded-full bg-gradient-to-l from-purple-500 via-pink-500 to-indigo-500 animate-spin opacity-90"
              style={{ animationDirection: 'reverse', animationDuration: '3s' }}
            ></div>
            <div className="absolute inset-3 rounded-full bg-white"></div>
          </div>
        );

      case EnumSpinnerType.PARTICLE_ORBIT:
        return (
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-spin"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `${25 + i * 5}px center`,
                  animationDuration: `${2 + i * 0.5}s`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return renderSpinner(type);
};

export default BeautySpinner;
