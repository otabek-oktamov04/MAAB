import {
  AddIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Switch,
  ButtonGroup,
  Text,
  useDisclosure,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SocketForm from "./socket-form";
import { useEffect, useState } from "react";
import { IOption, ISocket, IStation } from "../../shared/interfaces";
import {
  useConnectorContext,
  useNotification,
  useStation,
} from "../../contexts";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNeighborPlacesContext } from "../../contexts/neighbor-places.context";
import { useForm } from "react-hook-form";
import Map from "../map/map";

const animatedComponents = makeAnimated();

interface IProps {
  initialValue?: IStation;
}

export const StationForm = ({ initialValue }: IProps) => {
  const navigate = useNavigate();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [sockets, setSockets] = useState<ISocket[]>([]);
  const { getConnectorTypes, connectorTypes } = useConnectorContext();
  const { neighboringPlaces, getNeighboringPlaces } =
    useNeighborPlacesContext();
  const [currentSocket, setCurrentSocket] = useState<ISocket | null>(null);
  const { showSuccess } = useNotification();
  const [neighborPlaceIds, setNeighborPlaceIds] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
  } = useForm<IStation>({
    defaultValues: initialValue,
    mode: "onChange",
  });
  const { createStation, updateStation } = useStation();

  const lng = watch("longitude");

  useEffect(() => {
    if (!connectorTypes?.length) {
      getConnectorTypes();
    }

    if (!neighboringPlaces?.results.length) {
      getNeighboringPlaces();
    }
  });

  useEffect(() => {
    if (initialValue) {
      setSockets(initialValue.sockets);
      setNeighborPlaceIds(
        initialValue.neighboring_places.map((item) => item.id)
      );
    }
  }, [initialValue]);

  const removeSocket = (socket: ISocket) => {
    const updatedSockets = sockets.filter((item) => item !== socket);
    setSockets(updatedSockets);
  };

  const handleSocketEdit = (value: ISocket) => {
    setCurrentSocket(value);
    onOpen();
  };

  const onFormSubmit = async (value: IStation) => {
    try {
      if (initialValue) {
        await updateStation(initialValue.id, {
          name: value.name,
          address: value.address,
          sockets: sockets,
          neighboring_places_ids: neighborPlaceIds,
          energy_power: value.energy_power,
          is_working: value.is_working,
          latitude: value.latitude,
          longitude: value.longitude,
          price: value.price,
        });
      } else {
        await createStation({
          ...value,
          sockets,
          neighboring_places_ids: neighborPlaceIds,
        });
      }

      showSuccess("Stansiya yaratildi");
      navigate("/dashboard/stations");
    } catch {}
  };

  const neighboringOptions = neighboringPlaces?.results.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleChange = (value: IOption[]) => {
    const updatedValues = value.map((item) => item.value);
    setNeighborPlaceIds(updatedValues);
  };

  const socketItems = sockets.map((item) => (
    <GridItem
      p="4"
      borderRadius="md"
      key={item.power}
      boxShadow="sm"
      background="blackAlpha.200"
    >
      <Flex justifyContent="space-between">
        <Flex gap="4">
          <Tag p="2" colorScheme="telegram">
            <TagLabel>
              rozetkaka turi :{" "}
              {
                connectorTypes?.find((type) => type.id === item.connector_type)
                  ?.name
              }
            </TagLabel>
          </Tag>
          <Tag p="2" colorScheme="telegram">
            <TagLabel>Quvvati : {item.power}</TagLabel>
          </Tag>
          <Tag p="2" colorScheme="telegram">
            <TagLabel>Plugin : {item.plug_type}</TagLabel>
          </Tag>
          <Tag p="2" colorScheme={item.is_available ? "green" : "red"}>
            <TagLabel>{item.is_available ? "Mavjud" : "Mavjud Emas"}</TagLabel>
            <TagRightIcon>
              {item.is_available ? <CheckCircleIcon /> : <CloseIcon />}
            </TagRightIcon>
          </Tag>
        </Flex>
        <Flex gap="2">
          <IconButton
            onClick={handleSocketEdit.bind(null, item)}
            aria-label="Edit"
            icon={<EditIcon />}
          />
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon onClick={removeSocket.bind(null, item)} />}
          />
        </Flex>
      </Flex>
    </GridItem>
  ));

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Heading
        display="flex"
        alignItems="center"
        fontSize="2xl"
        fontWeight="normal"
        justifyContent="space-between"
      >
        <Box>
          <IconButton
            onClick={() => navigate(-1)}
            mr="4"
            aria-label="back"
            icon={<ArrowLeftIcon />}
          />
          Stansiya {initialValue ? "tahrirlash" : "yaratish"}
        </Box>
        <Button
          colorScheme="blue"
          display="flex"
          alignItems="center"
          fontSize="xl"
          px="4"
        >
          Aktiv
          <Switch colorScheme="whiteAlpha" {...register("is_working")} ml="2" />
        </Button>
      </Heading>
      <Card p="4" mt="4">
        <Flex gap="4" mb="4">
          <FormControl isRequired>
            <FormLabel>Stansiya nomi</FormLabel>
            <Input
              {...register("name", {
                required: true,
              })}
              size="lg"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Manzil</FormLabel>
            <Input
              {...register("address", {
                required: true,
              })}
              size="lg"
            />
          </FormControl>
        </Flex>
        <Flex gap="4" mb="4">
          <FormControl>
            <FormLabel>Narxi</FormLabel>
            <Input
              {...register("price", {
                required: true,
              })}
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Energiya quvvati</FormLabel>
            <Input
              size="lg"
              type="number"
              {...register("energy_power", {
                required: true,
              })}
            />
          </FormControl>
        </Flex>
        <Flex gap="4" mb="4">
          <FormControl>
            <FormLabel>Qo'shni joylar</FormLabel>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={initialValue?.neighboring_places.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
              onChange={(value) => handleChange(value as IOption[])}
              isSearchable
              isMulti
              options={neighboringOptions}
            />
          </FormControl>
        </Flex>
      </Card>

      <Card mt="4" p="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="semibold">
            rozetkalar ro'yxati
          </Text>
          <Button colorScheme="blue" onClick={onOpen}>
            rozetkaka qo'shish <AddIcon ml="2" />
          </Button>
        </Flex>

        <Grid mt="6" templateColumns="repeat(2, 1fr)" gap={6}>
          {socketItems}
        </Grid>
      </Card>

      <Map setValue={setValue} initialValue={initialValue} />

      <ButtonGroup mt="6" display="flex" gap="2" justifyContent="end">
        <Button type="reset">Bekor qilish</Button>
        <Button
          isDisabled={!lng}
          isLoading={isSubmitting}
          colorScheme="blue"
          type="submit"
        >
          Saqlash
        </Button>
      </ButtonGroup>
      {isOpen && (
        <SocketForm
          sockets={sockets}
          setSockets={setSockets}
          initialValue={currentSocket}
          setCurrentSocket={setCurrentSocket}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </form>
  );
};

export default StationForm;
