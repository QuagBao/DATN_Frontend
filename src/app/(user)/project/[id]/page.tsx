import dynamic from 'next/dynamic'

const DetailForm = dynamic(() => import('./_components/detail-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const StockOrderPage = async () => {
  return (
    <div className='mx-auto'>
      <DetailForm />
    </div>
  )
}

export default StockOrderPage
