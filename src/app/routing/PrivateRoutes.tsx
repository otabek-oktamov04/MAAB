import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import Dashboard from "../components/dashboard/dashboard";
import News from "../components/news/news";
import NewsView from "../components/news/view";
import NewsForm from "../components/news/news-form";
import NewsEdit from "../components/news/news-edit";
import Users from "../components/users/users";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route
          path="dashboard"
          element={
            <SuspensedView>
              <Dashboard />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/news"
          element={
            <SuspensedView>
              <News />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/news/:newsId"
          element={
            <SuspensedView>
              <NewsView />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/news/create"
          element={
            <SuspensedView>
              <NewsForm />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/news/:newsId/edit"
          element={
            <SuspensedView>
              <NewsEdit />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/users"
          element={
            <SuspensedView>
              <Users />
            </SuspensedView>
          }
        />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
