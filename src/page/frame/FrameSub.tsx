//  Lib
import { Fragment } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
//  Components
import SideMenu from "@src/components/menu/SideMenu";

const FrameSub = () => {
  return (
    <Fragment>
      <SideMenu />
      <Flex flexDirection="column" w="calc(100vw - 200px)" p="3rem 4rem">
        <Heading>FrameSub</Heading>
        <Outlet />
      </Flex>
    </Fragment>
  );
};

export default FrameSub;
