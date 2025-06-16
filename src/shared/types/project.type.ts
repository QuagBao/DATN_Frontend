export interface IProjectItem {
  index?: number
  id_project: string
  images: {
    id_image: string
    url: string
  }[]
  status: string
  title: string
  description?: string
  content?: string
  total_donors: number
  total_collaborators: number
  goal: number
  achieved: number
  startDate: string
  endDate: string
}
