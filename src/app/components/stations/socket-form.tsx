import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";
import { ISocket } from "../../shared/interfaces";
import { useForm } from "react-hook-form";
import { useConnectorContext } from "../../contexts";
import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setSockets: (data: ISocket[]) => void;
  initialValue: ISocket | null;
  sockets: ISocket[];
  setCurrentSocket: (value: ISocket | null) => void;
}

export const SocketForm = ({
  isOpen,
  onClose,
  setSockets,
  initialValue,
  sockets,
  setCurrentSocket,
}: IProps) => {
  const { handleSubmit, register, reset } = useForm<ISocket>({
    defaultValues: initialValue || {},
    mode: "onChange",
  });
  const { connectorTypes, getConnectorTypes } = useConnectorContext();

  useEffect(() => {
    if (!connectorTypes?.length) {
      getConnectorTypes();
    }
  }, []);

  const connectorTypeItems = connectorTypes?.map((type) => (
    <option value={type.id}>{type.name}</option>
  ));

  const onSubmit = (value: ISocket) => {
    if (initialValue) {
      const updatedSockets = sockets.filter((item) => item !== initialValue);
      setSockets([...updatedSockets, value]);
      setCurrentSocket(null);
    } else {
      setSockets([...sockets, value]);
    }
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          rozetkaka {initialValue ? "tahrirlash" : "qo'shish"}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb="6">
            <FormControl marginBottom="2" isRequired>
              <FormLabel>rozetkaka turi</FormLabel>
              <Select
                {...register("plug_type", {
                  required: true,
                })}
              >
                <option selected value="DC">
                  DC
                </option>
                <option value="AC">AC</option>
              </Select>
            </FormControl>
            <FormControl mb="2" isRequired>
              <FormLabel>Ulagich turi</FormLabel>
              <Select
                placeholder="tanlash"
                {...register("connector_type", {
                  required: true,
                })}
              >
                {connectorTypeItems}
              </Select>
            </FormControl>
            <FormControl isRequired mb="2">
              <FormLabel>Quvvati</FormLabel>
              <Input
                {...register("power", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" mt="4">
              <FormLabel p="0" m="0" mr="4">
                MAVJUD:
              </FormLabel>
              <Switch {...register("is_available")} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr="3">
              Saqlash
            </Button>
            <Button onClick={onClose}>Bekor qilish</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SocketForm;
