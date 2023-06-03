import { createRoot } from "react-dom/client";

import { MetronicI18nProvider } from "./_metronic/i18n/Metronici18n";
import "./_metronic/assets/fonticon/fonticon.css";
import "./_metronic/assets/keenicons/duotone/style.css";
import "./_metronic/assets/keenicons/outline/style.css";
import "./_metronic/assets/keenicons/solid/style.css";
import "./_metronic/assets/sass/style.scss";
import "./_metronic/assets/sass/plugins.scss";
import "./_metronic/assets/sass/style.react.scss";
import { AppRoutes } from "./app/routing/AppRoutes";
import { UiNotificationProvider } from "./app/contexts/notification.context";
import { ChakraProvider } from "@chakra-ui/react";
import {
  AuthContextProvider,
  ConnectorContextProvider,
  StationContextProvider,
  UsersContextProvider,
} from "./app/contexts";
import { NeighborPlacesContextProvider } from "./app/contexts/neighbor-places.context";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <ChakraProvider>
      <UiNotificationProvider>
        <AuthContextProvider>
          <UsersContextProvider>
          <NeighborPlacesContextProvider>
            <ConnectorContextProvider>
              <StationContextProvider>
                <MetronicI18nProvider>
                  <AppRoutes />
                </MetronicI18nProvider>
              </StationContextProvider>
            </ConnectorContextProvider>
          </NeighborPlacesContextProvider>
          </UsersContextProvider>
        </AuthContextProvider>
      </UiNotificationProvider>
    </ChakraProvider>
  );
}
