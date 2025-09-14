import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import NavBar from "./NavBar";
const Layout = () => {
  return (
    <div>
      <NavBar />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <main>
        <Outlet /> {/* This is where nested routes render */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
