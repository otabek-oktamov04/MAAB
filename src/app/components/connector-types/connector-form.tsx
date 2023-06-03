import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IConnector } from "../../shared/interfaces";
import { useConnectorContext, useNotification } from "../../contexts";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectorForm: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IConnector>();
  const { createConnectorType } = useConnectorContext();
  const { showSuccess } = useNotification();

  const handleFormSubmit = async (data: IConnector) => {
    console.log("l");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("connector_image", data.connector_image[0]);
    formData.append("connector_icon", data.connector_icon[0]);
    await createConnectorType(formData);
    onClose();
    showSuccess("rozetkaka yaratildi");
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>rozetka qo'shish</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalBody>
            <FormControl mb="2" isInvalid={!!errors.name}>
              <FormLabel>Nomi</FormLabel>
              <Input
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb="2" isInvalid={!!errors.description}>
              <FormLabel>Tavsifi</FormLabel>
              <Textarea
                {...register("description", {
                  required: "Desc is required",
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="logo" isInvalid={errors.connector_image != null}>
              <FormLabel>Rasmi</FormLabel>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("connector_image", {
                  required: "Logo is required",
                })}
              />
            </FormControl>
            <FormControl id="logo" isInvalid={errors.connector_icon != null}>
              <FormLabel>Icon</FormLabel>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("connector_icon", {
                  required: "Icon is required",
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap="2">
            <Button variant="ghost" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button
              isLoading={isSubmitting}
              colorScheme="blue"
              mr="3"
              type="submit"
              onClick={handleSubmit(handleFormSubmit)}
            >
              Saqlash
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ConnectorForm;
