import { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import Stations from "../components/stations/stations";
import StationCreate from "../components/stations/station-create";
import NeighborPlaces from "../components/neighbor-places/neighbor-places";
import ConnectorTypes from "../components/connector-types/connector-types";
import StationEdit from "../components/stations/station-edit";
import UsersTable from "../components/users/users-table";
import Dashboard from "../components/dashboard/dashboard";
import Reviews from "../components/reviews/reviews";
import { ReviewContextProvider } from "../contexts/review.context";
import StationView from "../components/stations/station-view";
import WIP from "../components/wip/wip";

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
              <Stations />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/users"
          element={
            <ReviewContextProvider>
              <SuspensedView>
                <Reviews />
              </SuspensedView>
            </ReviewContextProvider>
          }
        />
        <Route
          path="dashboard/stations/create"
          element={
            <SuspensedView>
              <StationCreate />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/stations/:stationId/edit"
          element={
            <SuspensedView>
              <StationEdit />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/stations/:stationId/view"
          element={
            <SuspensedView>
              <StationView />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/investors/"
          element={
            <SuspensedView>
              <WIP />
            </SuspensedView>
          }
        />

        <Route
          path="dashboard/neighbor-places"
          element={
            <SuspensedView>
              <NeighborPlaces />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/connector-types"
          element={
            <SuspensedView>
              <ConnectorTypes />
            </SuspensedView>
          }
        />
        <Route
          path="dashboard/users"
          element={
            <SuspensedView>
              <UsersTable />
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
