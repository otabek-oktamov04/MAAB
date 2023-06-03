import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useThemeMode } from "../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

import "react-toastify/dist/ReactToastify.css";

interface IContext {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

interface IProps {
  children: ReactNode;
}

const NotificationContext = createContext<IContext>({} as IContext);

export const useNotification = () => useContext(NotificationContext);

export const UiNotificationProvider: FC<IProps> = ({ children }) => {
  const showSuccess = (message: string) => toast.success(message);
  const showError = (message: string) => toast.error(message);
  const { mode } = useThemeMode();

  const value = {
    showSuccess,
    showError,
  };

  return (
    <NotificationContext.Provider value={value}>
      <ToastContainer theme={mode === "dark" ? "dark" : "light"} />
      {children}
    </NotificationContext.Provider>
  );
};
