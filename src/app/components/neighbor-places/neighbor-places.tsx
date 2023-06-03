import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NeighborPlacesForm from "./neighbor-places-form";
import { useEffect, useState } from "react";
import { useNeighborPlacesContext } from "../../contexts/neighbor-places.context";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { INeighborPlaces } from "../../shared/interfaces";

export const NeighborPlaces = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    getNeighboringPlaces,
    neighboringPlaces,
    deleteNeighboringPlaces,
    isLoading,
  } = useNeighborPlacesContext();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<INeighborPlaces | null>(null);
  const [currentItem, setCurrentItem] = useState<INeighborPlaces>();

  useEffect(() => {
    if (!neighboringPlaces) {
      getNeighboringPlaces();
    }
  }, [neighboringPlaces]);

  const handleDeleteButtonClick = (item: INeighborPlaces) => {
    setDeleteItem(item);
    onDeleteModalOpen();
  };

  const neighboringPlacesItems = neighboringPlaces?.results.map((item) => (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="space-between"
      key={item.id}
      background="white"
    >
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="space-between"
        px="4"
      >
        <Image mr="4" width="25px" src={item.logo?.toString()} />
        {item.name}
      </Box>
      <IconButton
        borderRadius="none"
        aria-label="delete"
        onClick={handleDeleteButtonClick.bind(null, item)}
        icon={<DeleteIcon />}
      />
      {/* <IconButton
        onClick={() => {
          setCurrentItem(item);
          onOpen();
        }}
        borderRadius="none"
        aria-label="edit"
        icon={<EditIcon />}
      /> */}
    </Box>
  ));

  return (
    <>
      <Box>
        <Heading
          display="flex"
          fontSize="2xl"
          justifyContent="space-between"
          fontWeight="normal"
          alignItems="start"
          mb="6"
        >
          Qo'shni joylar ro'yxati
          <Flex gap="4">
            <FormControl
              display="flex"
              alignItems="center"
              gap="2"
              width="400px"
            >
              <FormLabel>Qidirish</FormLabel>
              <InputGroup>
                <Input bg="white" />
                <InputRightAddon>
                  <SearchIcon />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={onOpen}>
              Yangi manzil yaratish
              <AddIcon ml="2" />
            </Button>
          </Flex>
        </Heading>
        <Flex flexWrap="wrap" gap="4">
          {neighboringPlaces?.results.length ? (
            neighboringPlacesItems
          ) : (
            <Text width="full" textAlign="center">
              {isLoading
                ? "Ma'lumotlar yuklanmoqda..."
                : "Ma'lumotlar mavjud emas"}
            </Text>
          )}
        </Flex>
      </Box>
      {isOpen && (
        <NeighborPlacesForm initialValue={currentItem} onClose={onClose} />
      )}
      {deleteItem && (
        <DeleteConfirmationModal
          show={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onConfirm={deleteNeighboringPlaces}
          id={deleteItem.id}
        />
      )}
    </>
  );
};

export default NeighborPlaces;
