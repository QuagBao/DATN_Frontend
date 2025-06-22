import dynamic from 'next/dynamic'

const DetailForm = dynamic(() => import('./_components/detail-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const StockOrderPage = async () => {
  return <DetailForm />
}

export default StockOrderPage
