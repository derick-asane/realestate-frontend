// src/routes/routes.jsx

import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

// Public pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

// User pages
import UserProperty from "../pages/user/UserProperty";
import MortgageCalculator from "../pages/user/MortgageCalculator";
import FavoriteProperty from "../pages/user/FavoriteProperty";

// Owner pages
import OwnerProperty from "../pages/owner/OwnerProperty";

// Shared pages
import About from "../pages/About";
import Home from "../pages/Home";

const router = createBrowserRouter([
  // ─── Public routes ──────────────────────────────────────────────────────────
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // ─── User routes ─────────────────────────────────────────────────────────────
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["USER"]}>
        <Layout />
      </ProtectedRoute>
    ),
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
        path: "favorites",
        element: <FavoriteProperty />,
      },
    ],
  },

  // ─── Owner routes ─────────────────────────────────────────────────────────────
  {
    path: "/owner",
    element: (
      <ProtectedRoute allowedRoles={["OWNER"]}>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <OwnerProperty />,
      },
      {
        path: "my-properties",
        element: <OwnerProperty />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },

  // ─── Admin routes ─────────────────────────────────────────────────────────────
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Layout />
      </ProtectedRoute>
    ),
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

  // ─── Fallback ─────────────────────────────────────────────────────────────────
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;