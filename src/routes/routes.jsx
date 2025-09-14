import { createBrowserRouter } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";
import App from "../App";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import UserProperty from "../pages/user/UserProperty";
import MortgageCalculator from "../pages/user/MortgageCalculator";
import OwnerProperty from "../pages/owner/OwnerProperty";
import FavoriteProperty from "../pages/user/FavoriteProperty";

const routes = [];

routes.push(
  {
    path: "/user",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <UserProperty />,
      },
      {
        path: "home",
        element: <UserProperty />,
      },
      {
        path: "mortgage-calculator",
        element: <MortgageCalculator />,
      },
      {
        path: "property-favorite",
        element: <FavoriteProperty />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/owner",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "properties",
        element: <div>All properties here</div>,
      },
      {
        path: "my-properties",
        element: <OwnerProperty />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  }
);

const router = createBrowserRouter(routes);

export default router;
