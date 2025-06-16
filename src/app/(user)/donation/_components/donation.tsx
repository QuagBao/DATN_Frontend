import FormDonation from './form-donation'
import Guidance from './guidance'

function Donation() {
  return (
    <section className='grid grid-cols-1 gap-5 px-5 py-10 md:px-40 lg:grid-cols-[2fr_1fr]'>
      <FormDonation />
      <Guidance />
    </section>
  )
}

export default Donation
