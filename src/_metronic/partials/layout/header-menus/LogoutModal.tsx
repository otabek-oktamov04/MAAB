import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'

type LogoutConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chiqishni tasdiqlash</ModalHeader>
        <ModalBody>Rostan ham saytdan chiqishni hohlaysizmi</ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' mr='3' onClick={onClose}>
            Yo'q
          </Button>
          <Button colorScheme='red' onClick={onConfirm}>
            Ha
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LogoutConfirmationModal
