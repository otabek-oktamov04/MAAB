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
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { INeighborPlaces } from "../../shared/interfaces";
import { useNeighborPlacesContext } from "../../contexts/neighbor-places.context";
import { useNotification } from "../../contexts";

interface ModalFormProps {
  onClose: () => void;
  initialValue?: INeighborPlaces;
}

const NeighborPlacesForm: React.FC<ModalFormProps> = ({
  onClose,
  initialValue,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<INeighborPlaces>({
    defaultValues: initialValue,
    mode: "onChange",
  });
  const { createNeighborPlaces } = useNeighborPlacesContext();
  const { showSuccess } = useNotification();

  const handleFormSubmit: SubmitHandler<INeighborPlaces> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    await createNeighborPlaces(formData);
    onClose();
    showSuccess("Yangi manzil yaratildi");
  };

  return (
    <>
      <Modal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalBody>
              <FormControl id="name" isInvalid={errors.name != null}>
                <FormLabel>Nomi</FormLabel>
                <Input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="logo" isInvalid={errors.logo != null}>
                <FormLabel>Logo</FormLabel>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg"
                  {...register("logo", {
                    required: initialValue ? false : "Logo is required",
                  })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr="3" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button isLoading={isSubmitting} colorScheme="blue" type="submit">
                Saqlash
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NeighborPlacesForm;
