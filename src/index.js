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
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/main/Dashboard";
import Settings from "./pages/main/Settings";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import createStore from "react-auth-kit/createStore";
import Error404 from "./pages/Error/Error404";

// create a client
const newClient = new QueryClient();
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
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
    <AuthProvider store={store}>
      <ThemeProvider theme={theme}>
        <JotaiProvider>
          <QueryClientProvider client={newClient}>
            {/* <RouterProvider router={router} /> */}
            <BrowserRouter>
              <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route element={<AuthOutlet fallbackPath="/auth/login" />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Error404/>}/>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </JotaiProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
