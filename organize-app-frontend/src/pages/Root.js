import { useState } from "react";
import { Outlet } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";
import Logout from "../components/UI/Logout";
import Modal from "../components/UI/Modal";

const RootLayout = () => {
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const showPopUpHandler = () => {
    setIsPopUpShown(true);
  };
  const hidePopUpHandler = () => {
    setIsPopUpShown(false);
  };
  return (
    <>
      {isPopUpShown && (
        <Modal onClose={hidePopUpHandler}>
          <Logout onClose={hidePopUpHandler} />{" "}
        </Modal>
      )}
      <AsideNavigation onClick={showPopUpHandler} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
