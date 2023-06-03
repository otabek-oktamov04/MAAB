import {
  Card,
  Flex,
  Image,
  Box,
  Text,
  Tag,
  TagLabel,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { IStation } from "../../shared/interfaces";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface IProps {
  station: IStation;
  onDeleteButtonClick: (value: IStation) => void;
}

export const StationCard = ({ station, onDeleteButtonClick }: IProps) => {
  const mainImage = Array.isArray(station?.images) && station.images[0]?.image;

  return (
    <Card p="4" borderRadius="md" position="relative">
      <Flex alignItems="start" mb="4">
        <Image
          width="50px"
          height="50px"
          objectFit="cover"
          src={mainImage?.toString()}
          mr="4"
          borderRadius="md"
        />
        <Box>
          <Text m="0" fontSize="xl" fontWeight="medium">
            {station.name}
          </Text>
          <Text m="0" fontSize="xs">
            {station.address}
          </Text>
        </Box>
        <ButtonGroup position="absolute" right="4">
          <IconButton
            as={Link}
            to={`${station.id}/edit`}
            aria-label="edt"
            icon={<EditIcon />}
          />
          <IconButton
            onClick={onDeleteButtonClick.bind(null, station)}
            aria-label="delete"
            icon={<DeleteIcon />}
          />
        </ButtonGroup>
      </Flex>
      <Box
        borderRadius="md"
        gap="2"
        p="2"
        display="flex"
        alignItems="center"
        justifyContent="start"
        textAlign="left"
      >
        <Tag p="2">
          <TagLabel>Quvvati : {station.energy_power}</TagLabel>
        </Tag>
        <Tag p="2">
          <TagLabel>Narxi : {station.price}</TagLabel>
        </Tag>
        <Tag p="2" colorScheme={station.is_working ? "green" : "red"}>
          <TagLabel>{station.is_working ? "Aktiv" : "Aktiv Emas"}</TagLabel>
        </Tag>
      </Box>
      {/* <UnorderedList p="0" mt="4">
        <Text fontWeight="semibold">Qo'shimcha ma'lumotlar:</Text>
        <ListItem display="flex" justifyContent="space-between">
          <Text fontWeight="semibold">-Rozvetkalar soni</Text>
          {station.socket_count}
        </ListItem>
        <ListItem display="flex" justifyContent="space-between">
          <Text fontWeight="semibold">-Rating</Text>
          {station.rating}
        </ListItem>
      </UnorderedList> */}
    </Card>
  );
};

export default StationCard;
