import { type FC } from 'react'

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto my-10 px-2">{children}</div>
}

export default MainLayout
