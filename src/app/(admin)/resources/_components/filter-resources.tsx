// 'use client'

// import { useCallback, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import { Button, Divider } from '@heroui/react'
// import { useRouter, useSearchParams } from 'next/navigation'

// import CustomInput from '~/components/shared/custom-input'
// import { APP_ROUTES } from '~/config/routes'
// import { type TResourcesParams } from '~/shared/types'

// const FilterResources = () => {
//   const { t } = useTranslation('resources')
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const getDefaultValues = useCallback((): TResourcesParams => {
//     return {
//       resourceName: searchParams.get('resourceName') ?? ''
//     }
//   }, [searchParams])

//   const { register, handleSubmit, reset } = useForm<TResourcesParams>({
//     mode: 'onSubmit',
//     defaultValues: getDefaultValues()
//   })

//   useEffect(() => {
//     reset({
//       ...getDefaultValues()
//     })
//   }, [searchParams, reset, getDefaultValues])

//   const handleClearFilter = () => {
//     reset()
//     router.push(APP_ROUTES.RESOURCES.RESOURCES)
//   }

//   const onSubmit = handleSubmit((data) => {
//     const query: Record<string, string> = {
//       ...Object.fromEntries(searchParams.entries()),
//       resourceName: data.resourceName ?? ''
//     }
//     const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
//     router.push(`${APP_ROUTES.RESOURCES.RESOURCES}?${new URLSearchParams(filteredQuery).toString()}`)
//   })

//   return (
//     <div className='my-2'>
//       <Divider />
//       <form onSubmit={onSubmit} className='py-5'>
//         <div className='grid grid-cols-3 items-end gap-4'>
//           <CustomInput
//             type='text'
//             label={t('nameResourceField')}
//             placeholder={t('nameResourcePlaceholder')}
//             register={register('resourceName')}
//           />
//           <div className='flex gap-4'>
//             <Button color='danger' variant='bordered' type='button' onPress={handleClearFilter}>
//               {t('clear')}
//             </Button>
//             <Button color='primary' variant='bordered' type='submit'>
//               {t('search')}
//             </Button>
//           </div>
//         </div>
//       </form>
//       <Divider />
//     </div>
//   )
// }

// export default FilterResources
