import { Modal, ModalBody, ModalContent } from '@heroui/react'

import CustomLoadingSpinner from './custom-loading-spinner'

interface ILoadingModal {
  isOpen: boolean
}

const CustomLoadingModal = ({ isOpen }: ILoadingModal) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalBody>
          <CustomLoadingSpinner />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomLoadingModal
