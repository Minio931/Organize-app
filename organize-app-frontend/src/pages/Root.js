import { Outlet } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";

const RootLayout = () => {
  return (
    <>
      <AsideNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
