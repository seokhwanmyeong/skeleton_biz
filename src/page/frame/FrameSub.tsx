//  Lib
import { Fragment } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
//  Components
import MenuSide from "@components/menu/MenuSide";

const FrameSub = () => {
  return (
    <Fragment>
      <MenuSide />
      <Flex flexDirection="column" w="calc(100vw - 200px)" p="3rem 4rem">
        <Heading>FrameSub : SubPage</Heading>
        <Outlet />
      </Flex>
    </Fragment>
  );
};

export default FrameSub;
