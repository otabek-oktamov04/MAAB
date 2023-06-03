import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  ProgressLabel,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Image,
  Text,
} from "@chakra-ui/react";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { ChartsWidget3 } from "../../../_metronic/partials/widgets";

export const Dashboard = () => {
  return (
    <Box p="24px" borderRadius="md">
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <GridItem
          position="relative"
          as={Card}
          w="100%"
          bg="white"
          borderRadius="md"
        >
          <Flex p="16px" alignItems="start" justifyContent="space-between">
            <Heading fontSize="18px" fontWeight="normal">
              Income
              <Text
                mt="1"
                fontSize="14px"
                fontWeight="normal"
                textColor="gray.500"
              >
                Marketplace author chart
              </Text>
            </Heading>
            <Text
              fontFamily="mono"
              textColor="green.400"
              fontWeight="semibold"
              fontSize="20px"
            >
              +15.000.000
            </Text>
          </Flex>
          <Image
            position="absolute"
            bottom="0"
            src={toAbsoluteUrl("/media/income.svg")}
          />
        </GridItem>
        <GridItem as={Card} w="100%" bg="white" borderRadius="md">
          <Flex p="16px" alignItems="start" justifyContent="space-between">
            <Heading fontSize="18px" fontWeight="normal">
              Expenses
              <Text
                mt="1"
                fontSize="14px"
                fontWeight="normal"
                textColor="gray.500"
              >
                Marketplace author chart
              </Text>
            </Heading>
            <Text
              fontFamily="mono"
              textColor="red"
              fontWeight="semibold"
              fontSize="20px"
            >
              -15.000.000
            </Text>
          </Flex>
          <Image src={toAbsoluteUrl("/media/expense.svg")} />
        </GridItem>
        <GridItem as={Card} w="100%" bg="white" borderRadius="md">
          <Flex p="16px" alignItems="start" justifyContent="space-between">
            <Heading fontSize="18px" fontWeight="normal">
              Revenue
              <Text
                mt="1"
                fontSize="14px"
                fontWeight="normal"
                textColor="gray.500"
              >
                Marketplace author chart
              </Text>
            </Heading>
            <Text
              fontFamily="mono"
              textColor="blue"
              fontWeight="semibold"
              fontSize="20px"
            >
              -15.000.000
            </Text>
          </Flex>
          <Image
            position="absolute"
            bottom="0"
            src={toAbsoluteUrl("/media/reven.svg")}
          />
        </GridItem>
      </Grid>
      <Flex justifyContent="space-between" alignItems="start" mt="6">
        <Box as={Card} p="24px">
          <Heading fontSize="20px" fontWeight="normal" mb="4">
            Statistics
          </Heading>
          <Flex flexDirection="column" gap="4" mb="6">
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
          </Flex>

          <Heading fontSize="20px" fontWeight="normal" mb="4">
            Profit or Damages
          </Heading>
          <Card border="2px" p="4" borderColor="gray.100" boxShadow="none">
            <Progress
              colorScheme="gray"
              size="lg"
              borderRadius="md"
              value={80}
              mb="4"
            >
              
              <ProgressLabel fontSize="md" fontWeight="normal">
                80
              </ProgressLabel>
            </Progress>
            <Box
              textColor="black"
              fontSize="28px"
              fontWeight="semibold"
              fontFamily="mono"
              display="flex"
              alignItems="end"
            >
              -$129.0
            </Box>
            <Text m="0" color="gray" fontSize="14px">
              How much is left for profit
            </Text>
          </Card>
        </Box>
        <ChartsWidget3 className="" />
        <Box width="350px" as={Card} p="24px" pt="100px">
          <Stat mb="130px">
            <Flex alignItems="center" gap="3">
              
              <StatNumber textColor="black" fontSize="32px">
                $345,670
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Flex>
            <StatLabel>Monthly statistic profit</StatLabel>
          </Stat>
          <Flex alignItems="center">
            <Image mr="4" src={toAbsoluteUrl("/media/car.svg")} />
            <Text fontSize="32px" fontWeight="medium" color="black">
              12,243
            </Text>
          </Flex>
          <Text m="0">So many cars have been charged this month</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
