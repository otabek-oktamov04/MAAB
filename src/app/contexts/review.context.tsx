import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import "react-toastify/dist/ReactToastify.css";
import useFetch from "../shared/helpers/useFetch";
import { IReviewData } from "../shared/interfaces/review";

interface IContext {
  getReviews: () => Promise<void>;
  reviews: IReviewData | null;
  deleteReview: (reviewId: string) => Promise<void>;
  isLoading: boolean;
  params: IParam;
  setParams: (value: IParam) => void;
}

interface IProps {
  children: ReactNode;
}

interface IParam {
  page: number;
  pageSize: number;
}

const ReviewContext = createContext<IContext>({} as IContext);

export const useReviews = () => useContext(ReviewContext);

export const ReviewContextProvider: FC<IProps> = ({ children }) => {
  const { get, remove } = useFetch();
  const [reviews, setReviews] = useState<IReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const getReviews = useCallback(async () => {
    setIsLoading(true);
    const response = await get(
      `/dashboard/reviews/?page=${params.page}&page_size=${params.pageSize}`
    );
    setReviews({
      next: null,
      previous: null,
      results: response,
      count: 12,
    });
    setIsLoading(false);
  }, [get, params.page, params.pageSize]);

  const deleteReview = useCallback(async (reviewId: string) => {
    await remove(`/station/reviews/${reviewId}`);
    getReviews();
  }, []);

  const value = useMemo(
    () => ({
      getReviews,
      reviews,
      deleteReview,

      isLoading,
      params,
      setParams,
    }),
    [getReviews, reviews, deleteReview, isLoading, params, setParams]
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};
