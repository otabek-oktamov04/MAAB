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
import { IStation, IStationData } from "../shared/interfaces";

interface IContext {
  createStation: (value: IStation) => Promise<void>;
  getStations: (url?: string) => Promise<void>;
  stations: IStationData | null;
  deleteStation: (stationId: string) => Promise<void>;
  updateStation: (stationId: string, value: Partial<IStation>) => Promise<void>;
  isLoading: boolean;
  params: IParam;
  setParams: (value: IParam) => void;
  getStationById: (stationId: string) => Promise<IStation>;
}

interface IProps {
  children: ReactNode;
}

interface IParam {
  page: number;
  pageSize: number;
}

const StationContext = createContext<IContext>({} as IContext);

export const useStation = () => useContext(StationContext);

export const StationContextProvider: FC<IProps> = ({ children }) => {
  const { post, get, remove, patch } = useFetch();
  const [stations, setStations] = useState<IStationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const createStation = useCallback(async (value: IStation) => {
    await post("/station/stations/create/", value);
    getStations();
  }, []);

  const getStations = useCallback(
    async (url?: string) => {
      setIsLoading(true);
      if (url) {
        const response = await get(
          `/dashboard/stations/?page=${params.page}&page_size=${params.pageSize}${url}`
        );
        setStations(response);
      } else {
        const response = await get(
          `/dashboard/stations/?page=${params.page}&page_size=${params.pageSize}`
        );
        setStations(response);
      }
      setIsLoading(false);
    },
    [get, params.page, params.pageSize]
  );

  const deleteStation = useCallback(async (stationId: string) => {
    await remove(`/station/stations/${stationId}`);
    getStations();
  }, []);

  const updateStation = useCallback(
    async (stationId: string, value: Partial<IStation>) => {
      await patch(`/station/stations/${stationId}/`, value);
    },
    []
  );

  const getStationById = useCallback(async (stationId: string) => {
    return await get(`/dashboard/stations/${stationId}/`);
  }, []);

  const value = useMemo(
    () => ({
      createStation,
      getStations,
      stations,
      deleteStation,
      updateStation,
      isLoading,
      params,
      setParams,
      getStationById,
    }),
    [
      createStation,
      getStations,
      stations,
      deleteStation,
      updateStation,
      isLoading,
      params,
      setParams,
      getStationById,
    ]
  );

  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
};
