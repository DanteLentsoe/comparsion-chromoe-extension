import { FC, ReactNode } from 'react'

export const Button: FC<{
  variant?: 'outline' | 'default'
  size?: 'sm' | 'default'
  onClick?: () => void
  children: ReactNode
  className?: string
}> = ({
  variant = 'default',
  size = 'default',
  onClick,
  children,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`
      ${
        variant === 'outline'
          ? 'border border-gray-300 bg-white'
          : 'bg-blue-600 text-white'
      }
      ${size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2'}
      rounded-md hover:opacity-90 transition-opacity
      flex items-center justify-center
      ${className}
    `}
  >
    {children}
  </button>
)
