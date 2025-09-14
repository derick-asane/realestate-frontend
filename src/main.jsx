import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary .jsx";
import router from "./routes/routes";
import "./index.css";

import { AuthProvider } from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
