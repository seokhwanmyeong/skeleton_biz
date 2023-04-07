// Lib
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
// Components
import Header from "@components/header/Header";
//  image
import bgImg from "@assets/background.png";

const FrameMain = () => (
  <Flex
    flexWrap="wrap"
    flexDirection="column"
    w="100vw"
    h="100vh"
    overflow="hidden"
    bgColor="bg.primary"
  >
    <Header />
    <Flex flex="1" w="100%" overflow="hidden">
      <Outlet />
    </Flex>
  </Flex>
);

export default FrameMain;
