// src/components/Layout.jsx

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "14px" },
          success: { iconTheme: { primary: "#2563eb", secondary: "#fff" } },
        }}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;