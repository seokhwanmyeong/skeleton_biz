// Lib
import { useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// Style
import { Flex } from "@chakra-ui/react";
// Components
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import SideMenu from "@components/menu/SideMenu";

const FrameMain = () => {
  const location = useLocation();
  const [rootState, setRootState] = useState("/");

  useLayoutEffect(() => {
    setRootState(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Flex flexDirection="column" minH="100vh">
      <Header rootState={rootState} />
      <Flex w="100%" flex="auto">
        <Outlet />
      </Flex>
      {rootState !== "maps" && <Footer />}
    </Flex>
  );
};

export default FrameMain;