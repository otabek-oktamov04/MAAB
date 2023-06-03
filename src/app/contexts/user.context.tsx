import React, { createContext, useCallback, useContext, useState } from "react";
import useFetch from "../shared/helpers/useFetch";
import { IUserData } from "../shared/interfaces";

interface IContext {
  //   createUser: (value: Partial<IUser>) => Promise<void>
  //   updateUser: (id: string, value: Partial<IUser>) => Promise<void>
  //   deleteUser: (id: string) => Promise<void>
  getUsers: () => Promise<void>;
  users: IUserData | null;
  isLoading: boolean;
  params: IParam;
  setParams: (value: IParam) => void;
}

interface IProps {
  children: React.ReactNode;
}

interface IParam {
  page: number;
  pageSize: number;
}

const UsersContext = createContext<IContext>({} as IContext);

export const useUsersContext = () => useContext(UsersContext);

export const UsersContextProvider = ({
  children,
}: React.PropsWithChildren<IProps>) => {
  const [users, setUsers] = useState<IUserData | null>(null);
  const { get } = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await get(
      `/dashboard/users?page=${params.page}&page_size=${params.pageSize}`
    );
    setUsers(response);
    setIsLoading(false);
  }, [get, params.page, params.pageSize]);

  const value = React.useMemo(
    () => ({
      params,
      setParams,
      users,
      getUsers,
      isLoading,
    }),
    [users, getUsers, params, setParams, isLoading]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
