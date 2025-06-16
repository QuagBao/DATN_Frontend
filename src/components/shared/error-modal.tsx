import { useTranslation } from 'react-i18next'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import Image from 'next/image'

interface IProps {
  isOpen: boolean
  onClose: () => void
  errorMessage: string
}

const ErrorModal = ({ isOpen, onClose, errorMessage }: IProps) => {
  const { t } = useTranslation('custom-multi-select')

  return (
    <Modal size='sm' radius='sm' placement='center' hideCloseButton isOpen={isOpen}>
      <ModalContent className='bg-base-frame text-white'>
        <ModalHeader className='flex justify-center'>
          <Image className='mt-5' src='/assets/icons/close-circle.svg' alt='close-circle' width={48} height={48} />
        </ModalHeader>
        <ModalBody className='text-center text-ct-primary'>{errorMessage}</ModalBody>
        <ModalFooter className='w-full items-center'>
          <Button size='lg' color='success' className='w-full' onPress={onClose}>
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ErrorModal
