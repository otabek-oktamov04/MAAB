import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useConnectorContext } from "../../contexts";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import ConnectorForm from "./connector-form";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { IConnector } from "../../shared/interfaces";

export const ConnectorTypes = () => {
  const { getConnectorTypes, isLoading, connectorTypes, deleteConnectorType } =
    useConnectorContext();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
    isOpen: isDeleteModalOpen,
  } = useDisclosure();

  const [currentConnector, setCurrentConnector] = useState<IConnector | null>(
    null
  );

  const handleDeleteButtonClick = (value: IConnector) => {
    setCurrentConnector(value);
    onDeleteModalOpen();
  };

  const onDeleteConfirm = async (id: string) => {
    await deleteConnectorType(id);
    setCurrentConnector(null);
  };

  useEffect(() => {
    if (!connectorTypes) {
      getConnectorTypes();
    }
  }, []);

  const connectorCards = connectorTypes?.map((item) => (
    <Card as={GridItem} key={item.id} position="relative">
      <Image
        width="100%"
        height="150px"
        objectFit="contain"
        bgSize="contain"
        src={item.connector_image?.toString()}
      />
      <Box p="4">
        <Text fontWeight="semibold" fontSize="xl">
          {item.name}
        </Text>
        <Text noOfLines={4}>{item.description}</Text>
      </Box>
      <IconButton
        borderRadius="none"
        aria-label="delete"
        position="absolute"
        top="2"
        right="2"
        onClick={handleDeleteButtonClick.bind(null, item)}
        icon={<DeleteIcon />}
      />
    </Card>
  ));

  return (
    <Box>
      <Heading
        display="flex"
        fontSize="2xl"
        justifyContent="space-between"
        fontWeight="normal"
        alignItems="start"
        mb="6"
      >
        Rozetka turlari
        <Flex gap="4">
          <Button colorScheme="blue" onClick={onOpen}>
            Yangi rozetka turini qo'shish
            <AddIcon ml="2" />
          </Button>
        </Flex>
      </Heading>
      {isLoading ? (
        <Text textAlign="center" width="full">
          Ma'lumotlar yuklanmoqda...
        </Text>
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {connectorTypes?.length ? (
            connectorCards
          ) : (
            <Text textAlign="center" width="full">
              rozetkakalar mavjud emas
            </Text>
          )}
        </Grid>
      )}

      <ConnectorForm isOpen={isOpen} onClose={onClose} />
      {currentConnector && (
        <DeleteConfirmationModal
          onClose={onDeleteModalClose}
          onConfirm={onDeleteConfirm}
          show={isDeleteModalOpen}
          id={currentConnector?.id}
        />
      )}
    </Box>
  );
};

export default ConnectorTypes;
