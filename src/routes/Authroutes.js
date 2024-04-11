import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import CheckMail from "../pages/auth/CheckMail";
import ResetPassword from "../pages/auth/ResetPassword";
import CodeVerification from "../pages/auth/CodeVerification";

const AuthRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "check-mail",
      element: <CheckMail />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "code-verification",
      element: <CodeVerification />,
    },
  ],
};

export default AuthRoutes;
