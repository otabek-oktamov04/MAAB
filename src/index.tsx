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
import { AuthContextProvider } from "./app/contexts";
import { NewsContextProvider } from "./app/contexts/news.context";
import { UsersContextProvider } from "./app/contexts/user.context";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <ChakraProvider>
      <UiNotificationProvider>
        <AuthContextProvider>
          <UsersContextProvider>
            <NewsContextProvider>
              <MetronicI18nProvider>
                <AppRoutes />
              </MetronicI18nProvider>
            </NewsContextProvider>
          </UsersContextProvider>
        </AuthContextProvider>
      </UiNotificationProvider>
    </ChakraProvider>
  );
}
