import { Crimson } from 'public/assets/fonts/crimson'

import { colorClassNames } from '~/shared/constants/nextui-style.constant'

export interface IntroduceProps {
  total_projects: number | string
  total_collaborators: number | string
  total_donors: number | string
}

const Introduce = ({ total_projects, total_collaborators, total_donors }: IntroduceProps) => {
  return (
    <section className='max-w-screen bg-[url(/assets/images/bg.svg)] bg-cover bg-no-repeat object-fill '>
      <div className='relative top-0 flex flex-col gap-10 px-5 py-10 md:top-2 md:px-40'>
        <h1 className={` text-xl font-semibold  md:text-5xl ${colorClassNames.textColor} ${Crimson.className}`}>
          &quot;Kết nối sự kiện, lan tỏa giá trị&quot;
        </h1>
        <div className='flex flex-col gap-4 text-sm text-ct-primary md:text-lg'>
          <p>
            BK Hope là nền tảng hỗ trợ tổ chức sự kiện và huy động tài trợ, ra đời với sứ mệnh kết nối cộng đồng tổ chức
            với các nhà tài trợ tiềm năng.
          </p>
          <p>
            Chúng tôi tạo điều kiện để các ý tưởng sự kiện được hiện thực hóa, mang lại giá trị thiết thực cho cộng đồng
            và xã hội.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          <div className='grid grid-cols-[1fr_3fr] md:grid-cols-1'>
            <p className={` text-lg font-bold  md:text-4xl ${colorClassNames.textColor} ${Crimson.className}`}>
              {total_projects}
            </p>
            <p>Sự kiện</p>
          </div>
          <div className='grid grid-cols-[1fr_3fr] md:grid-cols-1'>
            <p className={` text-lg font-bold  md:text-4xl ${colorClassNames.textColor} ${Crimson.className}`}>
              {total_donors}
            </p>
            <p>Người ủng hộ</p>
          </div>
          <div className='grid grid-cols-[1fr_3fr] md:grid-cols-1'>
            <p className={` text-lg font-bold  md:text-4xl ${colorClassNames.textColor} ${Crimson.className}`}>
              {total_collaborators}
            </p>
            <p>Cộng tác viên</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduce
