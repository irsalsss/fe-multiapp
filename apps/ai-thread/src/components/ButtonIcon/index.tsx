import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ButtonSize, ButtonType } from './types';

const buttonIconVariants = cva(
  'cursor-pointer rounded-lg flex items-center justify-center',
  {
    variants: {
      type: {
        [ButtonType.Primary]: 'bg-gray-700',
        [ButtonType.Secondary]: 'bg-green-100',
        [ButtonType.Tertiary]: 'bg-gray-400',
      },
      size: {
        [ButtonSize.Small]: 'w-6 h-6',
        [ButtonSize.Medium]: 'w-8 h-8',
        [ButtonSize.Large]: 'w-10 h-10',
      },
    },
    defaultVariants: {
      type: ButtonType.Secondary,
      size: ButtonSize.Large,
    },
  }
);

interface ButtonIconProps extends VariantProps<typeof buttonIconVariants> {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type: ButtonType;
  size: ButtonSize;
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

