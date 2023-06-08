import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import "react-toastify/dist/ReactToastify.css";
import useFetch from "../shared/helpers/useFetch";
import { IUser } from "../shared/interfaces/user";

interface IContext {
  getUsers: () => Promise<void>;
  users: IUser[];
  isLoading: boolean;
  deleteUser: (Id: string) => Promise<void>;
  createUser: (value: IUser) => Promise<void>;
}

interface IProps {
  children: ReactNode;
}

const UsersContext = createContext<IContext>({} as IContext);

export const useUsers = () => useContext(UsersContext);

export const UsersContextProvider: FC<IProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { get, remove, post } = useFetch();

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await get("students");
    setUsers(response.data);
    setIsLoading(false);
  }, []);

  const deleteUser = useCallback(async (Id: string) => {
    await remove(`student/${Id}`);
    getUsers();
  }, []);

  const createUser = useCallback(async (value: IUser) => {
    await post("student/register", value);
    getUsers();
  }, []);

  const value = {
    users,
    getUsers,
    isLoading,
    deleteUser,
    createUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
