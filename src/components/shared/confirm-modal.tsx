'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { Crimson } from 'public/assets/fonts/crimson'

import { type TModalProps } from '~/shared/types'

interface IConfirmModalProps extends TModalProps {
  onConfirm?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  modalHeader: React.ReactNode
  modalBody: React.ReactNode
  confirmButtonText: string
  cancelButtonText: string
}
const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isDisabled,
  modalHeader,
  modalBody,
  confirmButtonText,
  cancelButtonText
}) => {
  return (
    <Modal
      classNames={{ base: 'bg-ct-white' }}
      placement='center'
      size='sm'
      isOpen={isOpen}
      onClose={onClose}
      radius='sm'
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className={`justify-center text-2xl font-semibold text-ct-blue ${Crimson.className}`}>
              {modalHeader}
            </ModalHeader>
            <ModalBody className='text-center'>
              <div className='text-sm font-normal text-foreground'>{modalBody}</div>
            </ModalBody>
            <ModalFooter className='flex flex-col'>
              <Button color='default' onPress={closeModal}>
                {cancelButtonText}
              </Button>
              <Button color='danger' onPress={onConfirm} isDisabled={isDisabled} isLoading={isLoading}>
                {confirmButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
