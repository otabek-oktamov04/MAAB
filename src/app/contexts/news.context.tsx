import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import "react-toastify/dist/ReactToastify.css";
import { INews } from "../shared/interfaces";
import useFetch from "../shared/helpers/useFetch";

interface IContext {
  getNews: () => Promise<void>;
  news: INews[];
  isLoading: boolean;
  deleteNews: (Id: string) => Promise<void>;
  createNews: (value: INews) => Promise<void>;
  updateNews: (value: INews) => Promise<void>;
}

interface IProps {
  children: ReactNode;
}

const NewsContext = createContext<IContext>({} as IContext);

export const useNews = () => useContext(NewsContext);

export const NewsContextProvider: FC<IProps> = ({ children }) => {
  const [news, setNews] = useState<INews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { get, remove, post, patch } = useFetch();

  const getNews = useCallback(async () => {
    setIsLoading(true);
    const response = await get("news/getAll");
    setNews(response.data);
    setIsLoading(false);
  }, []);

  const deleteNews = useCallback(async (Id: string) => {
    await remove(`news/${Id}`);
    getNews();
  }, []);

  const createNews = useCallback(async (value: INews) => {
    await post("news/create", value);
    getNews();
  }, []);

  const updateNews = useCallback(async (value: INews) => {
    await patch(`news/update`, value);
    getNews();
  }, []);

  const value = {
    news,
    getNews,
    isLoading,
    deleteNews,
    createNews,
    updateNews,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
