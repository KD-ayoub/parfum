import Pefumes from "../pages/main/Perfumes";
import Settings from "../pages/main/Settings";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/perfumes",
      element: <Pefumes />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ],
};

export default MainRoutes;
