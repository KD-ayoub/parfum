import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authroutes from "./routes/Authroutes";
import MainRoutes from "./routes/MainRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource-variable/public-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

// create a client
const newClient = new QueryClient();
const router = createBrowserRouter([Authroutes, MainRoutes]);
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Public sans variable, sans-serif",
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <JotaiProvider>
        <QueryClientProvider client={newClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </JotaiProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
