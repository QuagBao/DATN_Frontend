import Chart from '@icons/chart.svg'
import GraduationCap from '@icons/graduation-cap.svg'
import Money from '@icons/money.svg'

export interface ItemPillar {
  icon: JSX.Element
  title: string
  description: string
}
export const ListPillars: ItemPillar[] = [
  {
    icon: <GraduationCap className='size-8 text-ct-blue' />,
    title: 'Huy động Cộng tác viên',
    description:
      'Tuyển chọn, đào tạo và kết nối sinh viên – tình nguyện viên để phối hợp tổ chức mọi sự kiện: từ mùa hè xanh, hội trại truyền thông đến diễn đàn khởi nghiệp.'
  },
  {
    icon: <Money className='size-8 text-ct-blue' />,
    title: 'Thu hút Nhà đầu tư',
    description:
      'Cung cấp kênh tiếp cận minh bạch, chuyên nghiệp cho các quỹ, doanh nghiệp tài trợ dự án; đồng thời xây dựng quy trình báo cáo tiến độ và hiệu quả rõ ràng.'
  },
  {
    icon: <Chart className='size-8 text-ct-blue' />,
    title: 'Quản lý & Lan tỏa',
    description:
      'Hỗ trợ công cụ quản lý dự án, tổng hợp báo cáo và chia sẻ câu chuyện thành công, giúp mỗi sự kiện lan tỏa giá trị tích cực và tạo động lực phát triển bền vững.'
  }
]
