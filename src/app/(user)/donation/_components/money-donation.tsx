'use client'

import { useState } from 'react'
import { addToast, Button, Input } from '@heroui/react'
import { useSearchParams } from 'next/navigation'

import CustomInput from '~/components/shared/custom-input'
import { useAuth } from '~/config/providers'
import { CONTROL_KEYS } from '~/shared/constants/common.constant'
import { PROJECT_DONATION } from '~/shared/constants/donation'
import { formatCurrency } from '~/shared/utils'

import ModalQrBank from './modal-qr-bank'
import ScrollSelect from './scroll-select'

const MoneyDonation = () => {
  const [value, setValue] = useState<number | ''>('')
  const { userInfo } = useAuth()
  const [selectedIdMoney, setSelectIdMoney] = useState<number | null>(null)
  const displayValue = value === '' ? '' : formatCurrency(Number(value))
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const idProject = searchParams.get('id') || ''
  const nameProject = searchParams.get('project') || ''

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) =>
    !CONTROL_KEYS.includes(e.key as (typeof CONTROL_KEYS)[number]) && !/^[0-9]$/.test(e.key)
      ? e.preventDefault()
      : undefined

  const handleValueChange = (inputValue: string) => {
    const onlyDigits = inputValue.replace(/[^\d]/g, '')
    const num = onlyDigits === '' ? '' : Number(onlyDigits)
    setValue(num)
    setSelectIdMoney(null)
  }

  const handleBanking = () => {
    if (!value || !idProject) {
      addToast({ color: 'warning', description: 'Bạn chưa chọn số tiền hoặc dự án.' })
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className='space-y-5'>
      <p>Số tiền ủng hộ</p>
      <div className='grid grid-cols-3 items-center gap-2 md:grid-cols-4 xl:grid-cols-6 '>
        {PROJECT_DONATION.map((item) => {
          const isSelected = selectedIdMoney === Number(item.id)
          return (
            <Button
              key={item.id}
              variant={isSelected ? 'solid' : 'bordered'}
              onPress={() => {
                setSelectIdMoney(Number(item.id))
                setValue(item.money)
              }}
              color='primary'
              value={item.id}
            >
              {formatCurrency(item.money)}
            </Button>
          )
        })}
      </div>
      {!userInfo && (
        <div className='flex flex-col gap-5'>
          <CustomInput
            labelPlacement='inside'
            label='Tên cá nhân/ tổ chức ủng hộ'
            placeholder='Nhập tên cá nhân hoặc tổ chức'
            value={fullName}
            onValueChange={(val) => setFullName(val)}
            variant='bordered'
            color='primary'
          />
          <CustomInput
            labelPlacement='inside'
            label='Email'
            placeholder='Nhập email'
            value={email}
            onValueChange={(val) => setEmail(val)}
            variant='bordered'
            color='primary'
          />
          <CustomInput
            labelPlacement='inside'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            value={phone}
            onValueChange={(val) => setPhone(val)}
            variant='bordered'
            color='primary'
          />
        </div>
      )}
      <Input
        placeholder='Số tiền khác'
        variant='bordered'
        color='primary'
        onKeyDown={handleKeyDown}
        value={displayValue}
        onValueChange={handleValueChange}
        endContent={<p className='text-ct-secondary'>VNĐ</p>}
      />
      <ScrollSelect />
      <Button fullWidth onPress={handleBanking} color='primary'>
        Chuyển tiền ủng hộ
      </Button>
      <ModalQrBank
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        amount={Number(value)}
        id_project={idProject}
        name_project={nameProject}
        full_name={fullName}
        email={email}
        phone={phone}
      />
    </div>
  )
}

export default MoneyDonation
