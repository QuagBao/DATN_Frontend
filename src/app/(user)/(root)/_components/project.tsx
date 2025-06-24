import { Crimson } from 'public/assets/fonts/crimson'

import PaginationComponent from '~/components/shared/pagination'
import { type TPaginationResponse, type TProjectsManagementRes } from '~/shared/validators'

import ProjectCard from '../../project/_components/project-card'
import ProjectSkeleton from './project-skeleton'

interface ListProjectInProgressProps {
  data: TProjectsManagementRes
  paginationResponse: TPaginationResponse | undefined
  isLoadingProject?: boolean
}

const ListProject = ({ data, paginationResponse, isLoadingProject }: ListProjectInProgressProps) => {
  return (
    <section className=' flex flex-col items-center gap-3 md:py-14'>
      <h1 className={`${Crimson.className} text-2xl font-semibold text-ct-primary md:text-3xl`}>Chương trình</h1>

      {isLoadingProject && <ProjectSkeleton />}

      {/* List Project in inProgress */}
      <div className='flex w-full flex-col gap-10 px-5 md:px-32 lg:px-40'>
        {data.map((item, index) => (
          <ProjectCard
            index={index + 1}
            id_project={item.id_project}
            status={item.status ?? ''}
            images={item.images}
            title={item.name_project}
            description={item.description}
            total_donors={item.total_donors ?? 0}
            total_collaborators={item.total_collaborators ?? 0}
            goal={typeof item.total_numeric === 'number' ? item.total_numeric : Number(item.total_numeric)}
            achieved={item.current_numeric ?? 0}
            startDate={item.start_date}
            endDate={item.end_date}
          />
        ))}
      </div>

      <PaginationComponent
        paginationResponse={
          paginationResponse
            ? {
                page: paginationResponse.page,
                limit: paginationResponse.limit,
                total_items: paginationResponse.total_items,
                total_pages: paginationResponse.total_pages
              }
            : undefined
        }
      />
    </section>
  )
}

export default ListProject
