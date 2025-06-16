import Header from '~/components/header/header'

export default function LayoutPage({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='min-h-screen bg-layout'>
      <Header />
      {children}
    </div>
  )
}
