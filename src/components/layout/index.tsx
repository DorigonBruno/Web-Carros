import { Outlet } from "react-router";
import Header from "../header";

const Layout = () => {
  return (
    <div className="bg-geral w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
