import type React from 'react'

interface IAuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div className='flex min-h-screen w-full justify-center bg-white dark:bg-gray-900'>
      <div className='flex w-[500px] max-w-full flex-col items-center justify-center'>
        <div className='container mx-auto px-4'>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
