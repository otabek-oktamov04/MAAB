import { DeleteIcon, SearchIcon, StarIcon } from "@chakra-ui/icons";
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
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { Cell } from "react-table";
import ReusableTable from "../table/table";
import { useReviews } from "../../contexts/review.context";
import { IReview } from "../../shared/interfaces/review";

export const Reviews = () => {
  const { reviews, getReviews, deleteReview, setParams, params, isLoading } =
    useReviews();
  const [currentReview, setCurrentReview] = useState<IReview | null>(null);
  const { onClose, onOpen, isOpen } = useDisclosure();

  console.log(reviews);
  useEffect(() => {
    getReviews();
  }, [params]);

  const onDeleteConfirm = async (id: string) => {
    await deleteReview(id);
    setCurrentReview(null);
  };

  const openDeleteModal = (value: IReview) => {
    setCurrentReview(value);
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
        Cell: ({ row }: Cell<IReview>) => {
          return (
            <Image
              width="36px"
              height="36px"
              borderRadius="full"
              src={row.original.user.image}
            />
          );
        },
      },
      {
        Header: "Costumer",
        accessor: "first_name",
        Cell: ({ row }: Cell<IReview>) => {
          return row.original.user.name;
        },
      },
      {
        Header: "Comment",
        accessor: "address",
        Cell: ({ row }: Cell<IReview>) => {
          return (
            <Text mb="0" noOfLines={2}>
              {row.original.review}
            </Text>
          );
        },
      },
      {
        Header: "Rating",
        Cell: ({ row }: Cell<IReview>) => {
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
        Cell: ({ row }: Cell<IReview>) => {
          return row.original.created_time;
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
        Reviews
        <Text fontSize="16px" fontWeight="semibold" color="gray">
          Home - Reviews
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
          <Button isDisabled colorScheme="red">
            <DeleteIcon mr="2" /> Delete
          </Button>
        </Flex>
      </Flex>
      <ReusableTable
        columns={columns}
        data={reviews?.results || []}
        isLoading={false}
      />
      {reviews?.next || reviews?.previous ? (
        <nav aria-label="navigation example d-flex align-items-center">
          <ul className="pagination justify-content-end p-6 pt-0 pb-8">
            <li className="page-item">
              <Button
                isDisabled={!reviews?.previous || isLoading}
                onClick={handlePrevButtonClick}
              >
                Oldingi
              </Button>
            </li>
            <li className="page-item">
              <Button
                onClick={handleNextButtonClick}
                isDisabled={!reviews?.next || isLoading}
                colorScheme="blue"
              >
                Keyingi
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}

      {currentReview && (
        <DeleteConfirmationModal
          show={isOpen}
          onClose={onClose}
          onConfirm={onDeleteConfirm}
          id={currentReview?.id}
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

export default Reviews;
