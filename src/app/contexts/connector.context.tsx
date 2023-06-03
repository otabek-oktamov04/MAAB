import React, { createContext, useCallback, useContext, useState } from "react";
import useFetch from "../shared/helpers/useFetch";
import { IConnector } from "../shared/interfaces";

interface IContext {
  createConnectorType: (value: FormData) => Promise<void>;
  isLoading: boolean;
  getConnectorTypes: () => Promise<void>;
  connectorTypes: IConnector[] | null;
  deleteConnectorType: (id: string) => Promise<void>;
}

interface IProps {
  children: React.ReactNode;
}

const ConnectorContext = createContext<IContext>({} as IContext);

export const useConnectorContext = () => useContext(ConnectorContext);

export const ConnectorContextProvider = ({
  children,
}: React.PropsWithChildren<IProps>) => {
  const { post, get, remove } = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [connectorTypes, setConnectorTypes] = useState<IConnector[] | null>(
    null
  );

  const createConnectorType = useCallback(
    async (value: FormData) => {
      await post("station/connector-types/", value);
      getConnectorTypes();
    },
    [post]
  );

  const getConnectorTypes = useCallback(async () => {
    setIsLoading(true);
    const response = await get(`station/connector-types/`);
    setConnectorTypes(response);
    setIsLoading(false);
  }, [get]);

  const deleteConnectorType = useCallback(
    async (id: string) => {
      await remove(`station/connector-types/${id}`);
      getConnectorTypes();
    },
    [remove]
  );

  const value = React.useMemo(
    () => ({
      createConnectorType,
      isLoading,
      getConnectorTypes,
      connectorTypes,
      deleteConnectorType,
    }),
    [
      createConnectorType,
      isLoading,
      getConnectorTypes,
      connectorTypes,
      deleteConnectorType,
    ]
  );

  return (
    <ConnectorContext.Provider value={value}>
      {children}
    </ConnectorContext.Provider>
  );
};
