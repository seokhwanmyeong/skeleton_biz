//  Lib
import { Fragment } from "react";
import { Heading, Flex } from "@chakra-ui/react";
//  Components
import SideMenu from "@src/components/menu/SideMenu";
import { Outlet } from "react-router-dom";

const FrameErp = () => {
  return (
    <Fragment>
      <SideMenu />
      <Flex flexDirection="column" w="calc(100vw - 200px)" p="3rem 4rem">
        <Heading>FrameErp</Heading>
        <Outlet />
      </Flex>
    </Fragment>
  );
};

export default FrameErp;
