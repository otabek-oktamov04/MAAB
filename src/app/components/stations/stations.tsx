import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  SearchIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Heading,
  useDisclosure,
  Text,
  Flex,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  MenuOptionGroup,
  MenuItemOption,
  Spinner,
} from "@chakra-ui/react";
import { useStation } from "../../contexts";
import { useEffect, useMemo, useState } from "react";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { IStation } from "../../shared/interfaces";
import { Cell } from "react-table";
import ReusableTable from "../table/table";
import { Link } from "react-router-dom";

export const Stations = () => {
  const { stations, getStations, deleteStation, isLoading, params, setParams } =
    useStation();
  const [currentStation, setCurrentStation] = useState<IStation | null>(null);
  const { onClose, onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    getStations();
  }, [params]);

  const onDeleteConfirm = async (id: string) => {
    await deleteStation(id);
    setCurrentStation(null);
  };

  const openDeleteModal = (value: IStation) => {
    setCurrentStation(value);
    onOpen();
  };
  const handleNextButtonClick = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  const handlePrevButtonClick = () => {
    setParams({ ...params, page: params.page - 1 });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Photo",
        accessor: "images",
        Cell: ({ row }: Cell<IStation>) => {
          const mainImage =
            Array.isArray(row.original?.images) &&
            row.original.images[0]?.image;
          return (
            <Image
              width="36px"
              height="36px"
              borderRadius="full"
              src={mainImage?.toString()}
            />
          );
        },
      },
      {
        Header: "Names station",
        accessor: "name",
      },
      {
        Header: "Location",
        accessor: "address",
      },
      {
        Header: "Status",
        accessor: "is_working",
        Cell: ({ row }: Cell<IStation>) => {
          return row.original.is_working ? (
            <Text m="0" textColor="blue">
              Working
            </Text>
          ) : (
            <Text m="0" textColor="gray">
              Out of work
            </Text>
          );
        },
      },
      {
        Header: "Rating",
        Cell: ({ row }: Cell<IStation>) => {
          return (
            <Flex gap="1">
              {[1, 2, 3, 4, 5].map((item) => (
                <StarIcon
                  color={
                    item <= row.original.rating ? "yellow.400" : "gray.300"
                  }
                />
              ))}
            </Flex>
          );
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: Cell<IStation>) => {
          return (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  >
                    Action
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={Link} to={`${row.original.id}/edit`}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={openDeleteModal.bind(null, row.original)}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem as={Link} to={`${row.original.id}/view`}>
                      View
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          );
        },
      },
    ],
    []
  );

  return (
    <Box
      height={isLoading ? "80vh" : "auto"}
      overflow={isLoading ? "hidden" : "auto"}
      px="24px"
      py="32px"
      background="white"
      borderRadius="md"
    >
      <Heading mb="32px" fontSize="36px" fontWeight="bold" lineHeight="44px">
        Information of station
        <Text fontSize="16px" fontWeight="semibold" color="gray">
          Home - Information of station
        </Text>
      </Heading>
      <Flex justifyContent="space-between" mb="24px">
        <FormControl maxW="300px">
          <InputGroup>
            <InputLeftAddon>
              <SearchIcon />
            </InputLeftAddon>
            <Input placeholder="Search station" />
          </InputGroup>
        </FormControl>
        <Flex gap="4">
          <Menu closeOnSelect={false}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  Status
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    title="Status"
                    type="radio"
                    defaultValue="all"
                  >
                    <MenuItemOption value="all" onClick={() => getStations()}>
                      All
                    </MenuItemOption>
                    <MenuItemOption
                      value="online"
                      onClick={() => getStations("?is_working=true")}
                    >
                      Working
                    </MenuItemOption>
                    <MenuItemOption
                      onClick={() => getStations("?is_working=false")}
                      value="offline"
                    >
                      Out of work
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </>
            )}
          </Menu>

          <Button as={Link} to="create" colorScheme="blue">
            <AddIcon mr="2" /> Add station
          </Button>
          <Button colorScheme="red">
            <DeleteIcon mr="2" /> Delete
          </Button>
        </Flex>
      </Flex>
      <ReusableTable
        columns={columns}
        data={stations?.results || []}
        isLoading={false}
      />
      {stations?.next || stations?.previous ? (
        <nav aria-label="navigation example d-flex align-items-center">
          <ul className="pagination justify-content-end p-6 pt-0 pb-8">
            <li className="page-item">
              <Button
                isDisabled={!stations?.previous || isLoading}
                onClick={handlePrevButtonClick}
              >
                Oldingi
              </Button>
            </li>
            <li className="page-item">
              <Button
                onClick={handleNextButtonClick}
                isDisabled={!stations?.next || isLoading}
                colorScheme="blue"
              >
                Keyingi
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}

      {currentStation && (
        <DeleteConfirmationModal
          show={isOpen}
          onClose={onClose}
          onConfirm={onDeleteConfirm}
          id={currentStation?.id}
        />
      )}
      {isLoading && (
        <>
          <Box
            position="absolute"
            width="100%"
            height="100%"
            backdropBlur="3xl"
            background="blackAlpha.500"
            blur="10px"
            top="0"
            left="0"
          ></Box>
          <Box
            bg="gray.200"
            p="4"
            borderRadius="md"
            position="absolute"
            top="50%"
            left="55%"
            zIndex="99"
          >
            <Spinner color="black" width="50px" height="50px" />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Stations;
