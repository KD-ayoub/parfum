import Dashboard from "../pages/main/Dashboard";
import Settings from "../pages/main/Settings";

const MainRoutes = {
  children: [
    {
      path: "/",
      element: <Dashboard/>,
    },
    {
      path: "/settings",
      element: <Settings/>,
    },
  ],
};

export default MainRoutes;
