// Lib
import React from "react";
import { Link } from "react-router-dom";
// Style & Lib
import { Flex, Button, useColorMode } from "@chakra-ui/react";

type Props = {};

const Header = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="100%" h="5rem">
      <Flex
        position="fixed"
        top="0"
        gap="10"
        w="100%"
        h="inherit"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid #ffffff"
      >
        <Link to="/">Home</Link>
        <Link to="/maps">Map</Link>
        <Link to="/erp">ERP</Link>
        <Link to="/guide">Guide</Link>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
