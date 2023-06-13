import { Box, Heading, IconButton, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useNews } from "../../contexts/news.context";
import { EditIcon } from "@chakra-ui/icons";

export const NewsView = () => {
  const { newsId } = useParams();
  const { news } = useNews();
  const activeNews = news.find((item) => Number(item.id) === Number(newsId));

  return (
    <Box
      px="24px"
      py="32px"
      background="white"
      borderRadius="md"
      position="relative"
    >
      <IconButton
        aria-label="edit icon"
        icon={<EditIcon />}
        position="absolute"
        right="1%"
        top="5%"
        as={Link}
        to="edit"
      />
      <Heading mb="20px">{activeNews?.newsContent}</Heading>
      <Text
        dangerouslySetInnerHTML={{ __html: activeNews?.description || "" }}
      ></Text>
    </Box>
  );
};

export default NewsView;
