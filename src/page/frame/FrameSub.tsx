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
      <Flex
        flexDirection="column"
        w="calc(100vw - 20rem)"
        h="100%"
        p="3rem"
        overflowY="hidden"
      >
        <Outlet />
      </Flex>
    </Fragment>
  );
};

export default FrameSub;
