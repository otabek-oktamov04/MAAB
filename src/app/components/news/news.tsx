import {
  AddIcon,
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
import { INews } from "../../shared/interfaces";
import { Cell } from "react-table";
import ReusableTable from "../table/table";
import { Link } from "react-router-dom";
import { useNews } from "../../contexts/news.context";

export const News = () => {
  const { news, getNews, isLoading, deleteNews } = useNews();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [currentNews, setCurrentNews] = useState<INews | null>(null);
  const [filteredNews, setFilteredNews] = useState<INews[]>(news);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (news) {
      setFilteredNews(news);
    }
  }, [news]);

  const onDeleteConfirm = async (id: string) => {
    await deleteNews(id);
    setCurrentNews(null);
  };

  const openDeleteModal = (value: INews) => {
    setCurrentNews(value);
    onOpen();
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setFilteredNews(
      news.filter((item) =>
        item.newsContent
          .toLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sarlavha",
        accessor: " newsContent",
        Cell: ({ row }: Cell<INews>) => {
          return <Text noOfLines={2}>{row.original.newsContent}</Text>;
        },
      },
      {
        Header: "Tavsif",
        accessor: "",
        Cell: ({ row }: Cell<INews>) => {
          return <Text noOfLines={2}>{row.original.description}</Text>;
        },
      },

      {
        Header: "Amallar",
        Cell: ({ row }: Cell<INews>) => {
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
                    <MenuItem as={Link} to={`${row.original.id}/edit`}>
                      Tahrirlash
                    </MenuItem>
                    <MenuItem
                      onClick={openDeleteModal.bind(null, row.original)}
                    >
                      O'chirish
                    </MenuItem>
                    <MenuItem as={Link} to={`${row.original.id}`}>
                      Ko'rish
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
        Yangiliklar
        <Text fontSize="16px" fontWeight="semibold" color="gray">
          Uy - Yangiliklar
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
          <Button as={Link} to="create" colorScheme="blue">
            <AddIcon mr="2" /> Yangilik qo'shish
          </Button>
        </Flex>
      </Flex>
      {filteredNews.length ? (
        <ReusableTable
          columns={columns}
          data={filteredNews}
          isLoading={false}
        />
      ) : (
        <Text textAlign="center">Ma'lumotlar mavjud emas</Text>
      )}
      {currentNews && (
        <DeleteConfirmationModal
          show={isOpen}
          onClose={onClose}
          onConfirm={onDeleteConfirm}
          id={currentNews?.id}
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

export default News;
