import { twMerge } from 'tailwind-merge';
import { buttonIconVariants, type ButtonIconVariants } from './types';

interface ButtonIconProps extends ButtonIconVariants {
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
  return (
    <button
      type="button"
      className={twMerge(buttonIconVariants({ type, size }), className)}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ButtonIcon;
