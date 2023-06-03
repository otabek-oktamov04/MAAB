import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ILoginForm, IUser } from "../shared/interfaces";
import useFetch from "../shared/helpers/useFetch";
import { publicAPI, userAPI } from "../http/public-api";
import { UserRole } from "../shared/enums";

interface IContext {
  isAuthenticated: boolean;
  login: (value: ILoginForm) => Promise<void>;
  updateRefreshToken: () => Promise<void>;
  user: IUser | null;
  getUser: () => Promise<void>;
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
  const [user, setUser] = useState<IUser | null>(null);
  const { get } = useFetch();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (value: ILoginForm) => {
    const response = await publicAPI.post("user/login/", value);
    localStorage.setItem("refreshToken", response.data.refresh);
    localStorage.setItem("accessToken", response.data.access);
    setIsAuthenticated(true);
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await get("/admin/me");
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error: any) {
      if (error.response.data.errors[0].code === "TOKEN_INVALID_OR_EXPIRED") {
        updateRefreshToken();
      }
    }
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
      user,
      getUser,
    }),
    [isAuthenticated, updateRefreshToken, login, user, getUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
