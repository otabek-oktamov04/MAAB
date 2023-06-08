import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ILoginForm } from "../shared/interfaces";
import useFetch from "../shared/helpers/useFetch";
import { publicAPI, userAPI } from "../http/public-api";

interface IContext {
  isAuthenticated: boolean;
  login: (value: ILoginForm) => Promise<void>;
  updateRefreshToken: () => Promise<void>;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IContext>({} as IContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<IProps>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (value: ILoginForm) => {
    const response = await publicAPI.post("auth/login", value);
    if (response.data.data.accessToken) {
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    setIsAuthenticated(true);
  }, []);

  const updateRefreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await userAPI.post("user/token/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("accessToken", response.data.access);
    window.location.reload();
  }, []);

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      updateRefreshToken,
      login,
    }),
    [isAuthenticated, updateRefreshToken, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
