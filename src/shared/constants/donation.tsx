// import LightBulb from '@icons/light-bulb.svg'
import Money from '@icons/money.svg'
import User from '@icons/user.svg'

import CollaboratorDonation from '~/app/(user)/donation/_components/collaborator-donation'
// import IdeaDonation from '~/app/(user)/donation/_components/idea-donation'
import MoneyDonation from '~/app/(user)/donation/_components/money-donation'

export const tabsDonation = [
  {
    label: 'Đóng góp tài chính',
    icon: <Money className='hidden sm:block md:size-6' />,
    titleValue: 'money',
    component: <MoneyDonation />
  },
  // {
  //   label: 'Đóng góp ý tưởng',
  //   icon: <LightBulb className='hidden sm:block md:size-6' />,
  //   titleValue: 'idea',
  //   component: <IdeaDonation />
  // },
  {
    label: 'Đóng góp nhân lực',
    icon: <User className='hidden sm:block md:size-6' />,
    titleValue: 'human',
    component: <CollaboratorDonation />
  }
]

export const GUIDANCE_DONATION = [
  {
    label: 'Đóng góp tài chính:',
    description:
      'Số tiền bạn ủng hộ sẽ được dùng để trang trải chi phí tổ chức, trang thiết bị, vận hành và mở rộng quy mô chương trình. Chúng tôi cam kết cập nhật và báo cáo minh bạch định kỳ, đảm bảo mỗi đồng đóng góp thật sự mang lại giá trị cho cộng đồng.'
  },
  // {
  //   label: 'Đóng góp ý tưởng:',
  //   description:
  //     'Hãy chia sẻ với chúng tôi những giải pháp sáng tạo trong công nghệ, giáo dục, môi trường… phù hợp với mục tiêu dự án. Mọi ý tưởng khả thi đều được xem xét để triển khai, góp phần giải quyết các vấn đề thực tiễn và nâng cao hiệu quả hoạt động.'
  // },
  {
    label: 'Đóng góp nhân lực:',
    description:
      'Đăng ký làm tình nguyện viên để trực tiếp tham gia tổ chức, vận hành sự kiện và hỗ trợ các hoạt động thực địa. Sự nhiệt huyết và kỹ năng của bạn sẽ giúp lan tỏa giá trị, kết nối cộng đồng và tạo nên những trải nghiệm ý nghĩa.'
  }
]

export const PROJECT_DONATION = [
  {
    id: '1',
    money: 100000
  },
  {
    id: '2',
    money: 200000
  },
  {
    id: '3',
    money: 500000
  },
  { id: '4', money: 1000000 },
  {
    id: '5',
    money: 2000000
  },
  { id: '6', money: 5000000 }
]
