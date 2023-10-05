import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";
import "@fontsource-variable/inter";
import "@fontsource-variable/karla";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shop } from "@mui/icons-material";
import { ShopContextProvider } from "./context/ShopContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
