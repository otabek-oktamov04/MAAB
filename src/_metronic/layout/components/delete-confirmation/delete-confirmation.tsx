import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNotification } from "../../../../app/contexts";
import { Image, Text } from "@chakra-ui/react";
import { toAbsoluteUrl } from "../../../helpers";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: (guid: string) => void;
  id: string;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  show,
  onClose,
  onConfirm,
  id,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccess } = useNotification();

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm(id);
    showSuccess("Element muvaffaqiyatli o'chirildi");
    setIsDeleting(false);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton></Modal.Header>
        <Image
          mx="auto"
          src={toAbsoluteUrl("/media/delete-confirmation.svg")}
        />
        <Modal.Body>
          <Text textAlign="center">
            Are you sure you want to delete selected element
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            No, Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
