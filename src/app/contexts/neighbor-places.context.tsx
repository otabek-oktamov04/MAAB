import React, { createContext, useCallback, useContext, useState } from "react";
import useFetch from "../shared/helpers/useFetch";
import { INeighborPlacesData } from "../shared/interfaces";

interface IContext {
  createNeighborPlaces: (value: FormData) => Promise<void>;
  params: IParam;
  setParams: (value: IParam) => void;
  isLoading: boolean;
  getNeighboringPlaces: () => Promise<void>;
  neighboringPlaces: INeighborPlacesData | null;
  deleteNeighboringPlaces: (id: string) => Promise<void>;
}

interface IProps {
  children: React.ReactNode;
}

interface IParam {
  page: number;
  pageSize: number;
}

const NeighborPlacesContext = createContext<IContext>({} as IContext);

export const useNeighborPlacesContext = () => useContext(NeighborPlacesContext);

export const NeighborPlacesContextProvider = ({
  children,
}: React.PropsWithChildren<IProps>) => {
  const { post, get, remove } = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [neighboringPlaces, setNeighboringPlaces] =
    useState<INeighborPlacesData | null>(null);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const createNeighborPlaces = useCallback(
    async (value: FormData) => {
      await post("station/neighboring-places/", value);
      getNeighboringPlaces();
    },
    [post]
  );

  const getNeighboringPlaces = useCallback(async () => {
    setIsLoading(true);
    const response = await get(
      `station/neighboring-places/?page=${params.page}&page_size=${params.pageSize}`
    );
    setNeighboringPlaces(response);
    setIsLoading(false);
  }, [get, params.page, params.pageSize]);

  const deleteNeighboringPlaces = useCallback(
    async (id: string) => {
      await remove(`station/neighboring-places/${id}`);
      getNeighboringPlaces();
    },
    [remove]
  );

  const value = React.useMemo(
    () => ({
      createNeighborPlaces,
      params,
      setParams,
      isLoading,
      getNeighboringPlaces,
      neighboringPlaces,
      deleteNeighboringPlaces,
    }),
    [
      createNeighborPlaces,
      params,
      setParams,
      isLoading,
      getNeighboringPlaces,
      neighboringPlaces,
      deleteNeighboringPlaces,
    ]
  );

  return (
    <NeighborPlacesContext.Provider value={value}>
      {children}
    </NeighborPlacesContext.Provider>
  );
};
