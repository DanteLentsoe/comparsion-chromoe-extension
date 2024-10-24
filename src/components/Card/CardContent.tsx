import { FC, ReactNode } from 'react'

export const CardContent: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-6">{children}</div>
)
