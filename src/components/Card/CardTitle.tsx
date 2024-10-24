import { FC, ReactNode } from 'react'

export const CardTitle: FC<{
  className?: string
  children: ReactNode
}> = ({ className = '', children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
)
