import { Outlet } from "react-router";
import { Header } from "./Header";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="main-container">
      <Header />
      <div id="detail" className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;