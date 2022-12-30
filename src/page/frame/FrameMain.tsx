// Lib
import { Outlet } from "react-router-dom";
// Style
import { Flex } from "@chakra-ui/react";
// Components
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
//  CustomHooks
import useLocationState from "@hook/useLocationState";

const FrameMain = () => {
  const { pathState } = useLocationState();

  return (
    <Flex flexDirection="column" minH="100vh" bgColor="primary.main.bg">
      {pathState !== "/" && <Header />}
      <Flex w="100%" flex="auto">
        <Outlet />
      </Flex>
      {pathState !== "maps" && pathState !== "/" && <Footer />}
    </Flex>
  );
};

export default FrameMain;
