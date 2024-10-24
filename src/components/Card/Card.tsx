import { FC, ReactNode } from 'react'

export const Card: FC<{ className?: string; children: ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
)
