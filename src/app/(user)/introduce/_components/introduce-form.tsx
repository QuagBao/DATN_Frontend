import CorePillars from './core-pillars'
import VisionForm from './vision-form'

function IntroduceForm() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <VisionForm />
      <CorePillars />
    </div>
  )
}

export default IntroduceForm
