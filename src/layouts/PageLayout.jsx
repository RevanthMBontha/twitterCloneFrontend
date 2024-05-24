import { Outlet } from "react-router-dom";
import { SideBar } from "../components";

const PageLayout = () => {
  return (
    <div className="relative flex h-screen w-screen overflow-y-auto">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default PageLayout;
