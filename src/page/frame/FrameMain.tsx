// Lib
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
// Components
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
//  CustomHooks
import useLocationState from "@hook/useLocationState";

const FrameMain = () => {
  const { pathState } = useLocationState();

  return (
    <Flex
      flexWrap="wrap"
      flexDirection="column"
      h="100vh"
      overflow="hidden"
      bgColor="primary.main.bg"
    >
      {pathState !== "/" && <Header />}
      <Flex flex="1" w="100%" overflow="hidden">
        <Outlet />
      </Flex>
      {pathState === "/" && <Footer />}
    </Flex>
  );
};

export default FrameMain;
