import { cva, type VariantProps } from 'class-variance-authority';

export const buttonIconVariants = cva(
  'cursor-pointer rounded-lg flex items-center justify-center',
  {
    variants: {
      type: {
        primary: 'bg-gray-700',
        secondary: 'bg-green-100',
        tertiary: 'bg-gray-400',
      },
      size: {
        small: 'w-6 h-6',
        medium: 'w-8 h-8',
        large: 'w-10 h-10',
      },
    },
    defaultVariants: {
      type: 'secondary',
      size: 'large',
    },
  }
);

export type ButtonIconVariants = VariantProps<typeof buttonIconVariants>;