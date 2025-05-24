import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonSize, ButtonType } from './types';

interface ButtonIconProps {
  type: ButtonType;
  size: ButtonSize;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonIcon = ({
  type,
  size,
  icon,
  onClick,
  className,
}: ButtonIconProps) => {
  const buttonSize = useMemo(() => {
    if (size === ButtonSize.Small) {
      return 'w-6 h-6';
    }

    if (size === ButtonSize.Medium) {
      return 'w-8 h-8';
    }

    return 'w-10 h-10';
  }, [size]);

  const buttonType = useMemo(() => {
    if (type === ButtonType.Primary) {
      return 'bg-gray-700';
    }

    if (type === ButtonType.Tertiary) {
      return 'bg-gray-400';
    }

    return 'bg-green-100';
  }, [type]);

  return (
    <button
      type="button"
      className={twMerge(
        'cursor-pointer rounded-lg flex items-center justify-center',
        buttonSize,
        buttonType,
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ButtonIcon;
