import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="pt-16 min-h-screen bg-[#1A1A1A]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
