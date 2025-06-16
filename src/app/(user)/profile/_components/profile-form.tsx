// 'use client'

// import { useEffect } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import { addToast, Button, Input } from '@heroui/react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import MailOutline from '@icons/mail-outline.svg'
// import Phone from '@icons/phone.svg'
// import Profile from '@icons/profile.svg'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import { z } from 'zod'

// import { userApiRequest } from '~/api-requests'
// import { useAuth } from '~/config/providers/auth.provider'
// import { API_URL } from '~/config/routes'
// import { cn, handleApiEntityError } from '~/shared/utils'

// import ProfileFormSkeleton from './profile-form-skeleton'

// const schema = z.object({
//   email: z.string().min(1, 'required').email(),
//   fullName: z.string().min(1, 'required'),
//   phone: z
//     .string()
//     .min(1, 'required')
//     .regex(/^\+?\d{10,12}$/, 'invalidPhone')
// })

// type Schema = z.infer<typeof schema>

// const ProfileForm = () => {
//   const { t } = useTranslation('profile')
//   const { setUserInfo } = useAuth()
//   const { data, isPending, refetch } = useQuery({
//     queryKey: [API_URL.USER.GET_PROFILE],
//     queryFn: async () => {
//       const res = await userApiRequest.getMe()
//       setUserInfo(res.data.data)
//       return res
//     }
//   })
//   const updateProfileMutation = useMutation({ mutationFn: userApiRequest.updateProfile })
//   const {
//     handleSubmit,
//     setValue,
//     setError,
//     control,
//     reset,
//     formState: { errors, isDirty }
//   } = useForm<Schema>({
//     mode: 'onBlur',
//     resolver: zodResolver(schema),
//     defaultValues: { email: '', fullName: '', phone: '' }
//   })

//   useEffect(() => {
//     if (data?.data.data) {
//       const { email, phone, fullName } = data.data.data
//       setValue('email', email)
//       phone && setValue('phone', phone)
//       fullName && setValue('fullName', fullName)
//     }
//   }, [data, setValue])

//   const onSubmit = handleSubmit(async (values) => {
//     try {
//       const res = await updateProfileMutation.mutateAsync(values)
//       reset(values)
//       await refetch()
//       addToast({
//         color: 'success',
//         description: res.data.message
//       })
//     } catch (error) {
//       handleApiEntityError({ error, setError })
//     }
//   })

//   if (isPending) return <ProfileFormSkeleton />

//   return (
//     <form className='flex max-h-[calc(100vh-56px-72px)] flex-col overflow-y-auto' onSubmit={onSubmit}>
//       <h2 className='mt-3 text-base font-semibold text-ct-blue'>{t('basicInformation')}</h2>
//       <div className='md: mt-3 grid gap-5 md:grid-cols-3'>
//         <Controller
//           name='email'
//           control={control}
//           render={({ field }) => (
//             <Input
//               isDisabled
//               size='sm'
//               label={
//                 <div className='flex items-center gap-1 text-primary-700'>
//                   <MailOutline className='size-4' />
//                   <p>{t('fieldEmail')}</p>
//                 </div>
//               }
//               classNames={{
//                 base: '!opacity-65',
//                 inputWrapper: 'bg-ct-white',
//                 input: '!text-ct-purple'
//               }}
//               isInvalid={!!errors.email}
//               errorMessage={errors.email?.message ? t(errors.email.message) : undefined}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           name='fullName'
//           control={control}
//           render={({ field }) => (
//             <Input
//               size='sm'
//               label={
//                 <div className='flex items-center gap-1 text-ct-blue'>
//                   <Profile className='size-4' />
//                   <p>{t('fieldFullName')}</p>
//                 </div>
//               }
//               classNames={{
//                 inputWrapper:
//                   'bg-ct-white dark:group-data-[focus=true]:bg-[#1f2a38] group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0',
//                 input: '!text-ct-purple'
//               }}
//               isInvalid={!!errors.fullName}
//               errorMessage={errors.fullName?.message ? t(errors.fullName.message) : undefined}
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           name='phone'
//           control={control}
//           render={({ field }) => (
//             <Input
//               size='sm'
//               label={
//                 <div className='text-ct- flex items-center gap-1 text-ct-blue'>
//                   <Phone className='size-4' />
//                   <p>{t('fieldPhone')}</p>
//                 </div>
//               }
//               classNames={{
//                 inputWrapper:
//                   'bg-ct-white dark:group-data-[focus=true]:bg-[#1f2a38] group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0',
//                 input: '!text-ct-purple'
//               }}
//               isInvalid={!!errors.phone}
//               errorMessage={errors.phone?.message ? t(errors.phone.message) : undefined}
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <Button
//         type='submit'
//         color='primary'
//         isDisabled={!isDirty}
//         isLoading={updateProfileMutation.isPending}
//         className={cn('fixed bottom-4 left-4 right-4 mt-auto text-base font-semibold', !isDirty && 'bg-ct-secondary')}
//       >
//         {t('btnSubmit')}
//       </Button>
//     </form>
//   )
// }

// export default ProfileForm
