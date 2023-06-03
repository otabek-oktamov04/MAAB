import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  Card,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IStation } from "../../shared/interfaces";
import { useStation } from "../../contexts";
import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { ChartsWidget3 } from "../../../_metronic/partials/widgets";

interface IProps {
  text: string;
}

const HeadText = ({ text }: IProps) => {
  return (
    <Text fontSize="xs" mb="0" fontWeight="medium" color="#919296">
      {text}
    </Text>
  );
};

export const StationView = () => {
  const { stationId } = useParams();
  const [station, setStation] = useState<IStation | null>(null);
  const { getStationById } = useStation();

  useEffect(() => {
    if (stationId) {
      getStationById(stationId).then((res) => setStation(res));
    }
  }, [stationId]);

  return (
    <Flex gap="4">
      <Box width="70%" borderRadius="md" bgColor="white" px="24px" py="32px">
        <Heading
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontStyle="normal"
          mb="8px"
        >
          {station?.name}
          <Button
            height="30px"
            color="#919296"
            p="0"
            width="76px"
            bg="#ffffff"
            border="1px solid #E7E7E7"
            as={Link}
            to={`/dashboard/stations/${stationId}/edit`}
          >
            <EditIcon mr="2" /> Edit
          </Button>
        </Heading>
        <Text mb="38px" textColor="#919296" fontWeight="semibold">
          Home - EV Samarkand
        </Text>
        <Tabs colorScheme="green">
          <TabList
            bg="#FAFAFA"
            p="1"
            border=" 1px solid #E7E7E7"
            maxW="228px"
            borderRadius="md"
            display="flex"
          >
            <Tab
              _selected={{
                textColor: "white",
                backgroundColor: "blue",
                fontWeight: "medium",
                _hover: {
                  backgroundColor: "blue",
                  textColor: "white",
                },
              }}
              _hover={{
                backgroundColor: "#fafafa",
                textColor: "black",
              }}
              as={Button}
              colorScheme="blue"
              width="50%"
            >
              General
            </Tab>
            <Tab
              _selected={{
                textColor: "white",
                backgroundColor: "blue",
                fontWeight: "medium",
                _hover: {
                  backgroundColor: "blue",
                  textColor: "white",
                },
              }}
              _hover={{
                backgroundColor: "#fafafa",
                textColor: "black",
              }}
              as={Button}
              colorScheme="blue"
              width="50%"
            >
              Reviews
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid mb="4" templateColumns="repeat(2, 1fr)" gap="2" width="70%">
                <GridItem>
                  <HeadText text="Name station" />
                  <Text fontSize="16px" fontWeight="medium">
                    {station?.name}
                  </Text>
                </GridItem>
                <GridItem>
                  <HeadText text="Addres station on Map  " />
                  <Text fontSize="16px" fontWeight="medium">
                    {station?.address}
                  </Text>
                </GridItem>
                <GridItem>
                  <HeadText text="Full Addres of station " />
                  <Text fontSize="16px" fontWeight="medium">
                    {station?.address}
                  </Text>
                </GridItem>
                <GridItem>
                  <HeadText text="Investor selection " />
                  <Text fontSize="16px" fontWeight="medium">
                    Tok-Bor trading companiy
                  </Text>
                </GridItem>
                <GridItem>
                  <HeadText text="Station charging Wat " />
                  <Text fontSize="16px" fontWeight="medium">
                    {station?.energy_power}
                  </Text>
                </GridItem>
                <GridItem>
                  <HeadText text="Type socket *" />

                  <Flex gap="2">
                    {station?.sockets.map((item, index) => (
                      <Text fontSize="16px" fontWeight="medium">
                        {index + 1}) {item.plug_type}
                      </Text>
                    ))}
                  </Flex>
                </GridItem>
                <GridItem>
                  <HeadText text="Status station " />
                  <Text fontSize="16px" fontWeight="medium">
                    {station?.is_working ? "Working" : "Out of work"}
                  </Text>
                </GridItem>
              </Grid>
              <HeadText text="Photo" />
              <Flex mt="2" gap="4" mb="4" overflowX="scroll" maxW="100%">
                {Array.isArray(station?.images) &&
                  station?.images.map((item) => (
                    <Image
                      width="150px"
                      height="150px"
                      borderRadius="2xl"
                      border="1px"
                      src={item.image}
                      key={item.id}
                    />
                  ))}
              </Flex>
              {station?.neighboring_places.length && (
                <Box>
                  <HeadText text="Nearby services" />
                  <Flex mt="4" gap="4" flexWrap="wrap">
                    {station.neighboring_places.map((item) => (
                      <Flex
                        border="1px"
                        borderColor="#E7E7E7"
                        p="14px"
                        minW="150px"
                        borderRadius="2xl"
                        display="inline-flex"
                      >
                        <Image
                          src={item.logo?.toString()}
                          width="20px"
                          height="20px"
                          mr="12px"
                        />
                        <Text m="0" fontSize="14px" fontWeight="medium">
                          {item.name}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Flex width="30%" gap="4" flexDirection="column">
        {/* <Box
          display="flex"
          flexDirection="column"
          width="full"
          borderRadius="md"
          bgColor="white"
          px="24px"
          py="32px"
        > */}
        {/* <Heading
            fontSize="20px"
            fontWeight="semibold"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Profit month <CalendarIcon cursor="pointer" width="30px" />
          </Heading> */}

        <ChartsWidget3 className="" />
        {/* </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          width="full"
          gap="4"
          borderRadius="md"
          bgColor="white"
          px="24px"
          py="32px"
        >
          <Heading
            fontSize="20px"
            fontWeight="semibold"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Expenses
          </Heading>
          <Card border="2px" p="4" borderColor="gray.100" boxShadow="none">
            <Text color="gray" fontSize="14px">
              Costs (how much was paid for electricity)
            </Text>
            <Text
              textColor="red"
              fontSize="28px"
              fontWeight="semibold"
              m="0"
              fontFamily="mono"
            >
              -1.567 $
            </Text>
          </Card>
          <Card border="2px" p="4" borderColor="gray.100" boxShadow="none">
            <Text color="gray" fontSize="14px">
              How many cars have charged
            </Text>
            <Box
              textColor="black"
              fontSize="28px"
              fontWeight="semibold"
              m="0"
              fontFamily="mono"
              display="flex"
              alignItems="end"
            >
              212.034
              <Text
                mb="2"
                ml="4"
                fontSize="xl
                "
              >
                cars
              </Text>
            </Box>
          </Card>
          <Card border="2px" p="4" borderColor="gray.100" boxShadow="none">
            <Text color="gray" fontSize="14px">
              How many cars have charged
            </Text>
            <Box
              textColor="black"
              fontSize="28px"
              fontWeight="semibold"
              m="0"
              fontFamily="mono"
              display="flex"
              alignItems="end"
            >
              9.189
              <Text
                mb="2"
                ml="4"
                fontSize="xl
                "
              >
                hours
              </Text>
            </Box>
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StationView;
