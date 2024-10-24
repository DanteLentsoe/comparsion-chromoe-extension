import { FC, ReactNode } from 'react'

export const CardHeader: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b">{children}</div>
)
