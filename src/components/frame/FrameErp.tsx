//  Lib
import { Fragment, useState, useEffect } from "react";
import { Heading, Flex } from "@chakra-ui/react";
//  Components
import Table from "@src/components/table/TableTest";
import SideMenu from "@src/components/menu/SideMenu";
import { Outlet } from "react-router-dom";

const FrameErp = () => {
  return (
    <Fragment>
      <SideMenu />
      <Flex flexDirection="column" w="100%" p="3rem 4rem">
        <Heading>FrameErp</Heading>
        <Outlet />
      </Flex>
    </Fragment>
  );
};

export default FrameErp;
