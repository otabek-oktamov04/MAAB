import { Box } from "@chakra-ui/react";
import NewsForm from "./news-form";
import { useParams } from "react-router-dom";
import { useNews } from "../../contexts/news.context";

export const NewsEdit = () => {
  const { newsId } = useParams();
  const { news } = useNews();
  const activeNews = news.find((item) => Number(item.id) === Number(newsId));
  return <Box>{activeNews && <NewsForm initialValue={activeNews} />}</Box>;
};

export default NewsEdit;
