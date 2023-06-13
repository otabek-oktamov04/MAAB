import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
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
  Spinner,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { Cell } from "react-table";
import ReusableTable from "../table/table";
import { useUsers } from "../../contexts/user.context";
import { IUser } from "../../shared/interfaces/user";

export const Users = () => {
  const { users, getUsers, isLoading, deleteUser } = useUsers();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [filteredUser, setFilteredUser] = useState<IUser[]>(users);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setFilteredUser(users);
    }
  }, [users]);

  const onDeleteConfirm = async (id: string) => {
    await deleteUser(id);
    setCurrentUser(null);
  };

  const openDeleteModal = (value: IUser) => {
    setCurrentUser(value);
    onOpen();
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setFilteredUser(
      users.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Ismi",
        accessor: "name",
      },
      {
        Header: "Familiyasi",
        accessor: "surname",
      },

      {
        Header: "Telfon raqami",
        accessor: "phoneNumber",
      },

      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "English",
        accessor: "englishProficiencyLevel",
      },
      {
        Header: "IQ",
        accessor: "problemSolvingSkills",
      },
      {
        Header: "Action",
        Cell: ({ row }: Cell<IUser>) => {
          return (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  >
                    Amallar
                  </MenuButton>
                  <MenuList>
                    {/* <MenuItem as={Link} to={`${row.original.id}/edit`}>
                      Tahrirlash
                    </MenuItem> */}
                    <MenuItem
                      onClick={openDeleteModal.bind(null, row.original)}
                    >
                      O'chirish
                    </MenuItem>
                    {/* <MenuItem as={Link} to={`${row.original.id}`}>
                      Ko'rish
                    </MenuItem> */}
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
        Studenlar
        <Text fontSize="16px" fontWeight="semibold" color="gray">
          Uy - Studentlar
        </Text>
      </Heading>
      <Flex justifyContent="space-between" mb="24px">
        <FormControl maxW="300px">
          <InputGroup>
            <InputLeftAddon>
              <SearchIcon />
            </InputLeftAddon>
            <Input onChange={handleSearch} placeholder="Search station" />
          </InputGroup>
        </FormControl>
        <Flex gap="4">
          {/* <Button as={Link} to="create" colorScheme="blue">
            <AddIcon mr="2" /> Yangilik qo'shish
          </Button> */}
        </Flex>
      </Flex>
      {filteredUser.length ? (
        <ReusableTable
          columns={columns}
          data={filteredUser}
          isLoading={false}
        />
      ) : (
        <Text textAlign="center">Ma'lumotlar mavjud emas</Text>
      )}

      {currentUser && (
        <DeleteConfirmationModal
          show={isOpen}
          onClose={onClose}
          onConfirm={onDeleteConfirm}
          id={currentUser?.id?.toString()}
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

export default Users;
