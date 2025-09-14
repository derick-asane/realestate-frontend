import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Outlet /> {/* This is where your page content will render */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
