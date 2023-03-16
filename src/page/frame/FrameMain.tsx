// Lib
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
// Components
import Header from "@components/header/Header";

const FrameMain = () => (
  <Flex
    flexWrap="wrap"
    flexDirection="column"
    h="100vh"
    overflow="hidden"
    bgColor="primary.main.bg"
  >
    <Header />
    <Flex flex="1" w="100%" overflow="hidden">
      <Outlet />
    </Flex>
  </Flex>
);

export default FrameMain;
