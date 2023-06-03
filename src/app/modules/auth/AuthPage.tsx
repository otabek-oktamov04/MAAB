/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Box } from "@chakra-ui/react";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-body");
    return () => {
      document.body.classList.remove("bg-body");
    };
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage={toAbsoluteUrl("/media/auth.png")}
      bgSize="cover"
      objectFit="contain"
    >
      <Box bg="white" borderRadius="md" minW="460px" p="32px">
        <Outlet />
      </Box>
    </Box>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
