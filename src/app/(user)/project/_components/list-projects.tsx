'use client'

import PaginationComponent from '~/components/shared/pagination'
import { type TPaginationResponse } from '~/shared/validators'
import { type TProjectsManagementRes } from '~/shared/validators/schemas/project/project.schema'

import ProjectCard from './project-card'

interface ListProjectProps {
  data: TProjectsManagementRes
  paginationResponse: TPaginationResponse | undefined
}

const ListProjects: React.FC<ListProjectProps> = ({ data, paginationResponse }) => {
  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex w-full flex-col gap-10 px-5 md:px-40'>
        {data.map((item, index) => (
          <ProjectCard
            index={index}
            id_project={item.id_project}
            status={item.status ?? ''}
            images={item.images}
            title={item.name_project}
            description={item.description}
            total_donors={item.total_collaborator ?? 0}
            total_collaborators={item.total_collaborator ?? 0}
            goal={typeof item.total_numeric === 'number' ? item.total_numeric : Number(item.total_numeric)}
            achieved={item.current_numeric ?? 0}
            startDate={item.start_date}
            endDate={item.end_date}
          />
        ))}
      </div>
      <PaginationComponent paginationResponse={paginationResponse} />
    </div>
  )
}

export default ListProjects
