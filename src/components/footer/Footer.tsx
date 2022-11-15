import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Flex w="100%" h="5rem">
      <Flex
        w="100%"
        h="inherit"
        p="2rem"
        justifyContent="center"
        alignItems="center"
        borderTop="1px solid"
      >
        <Heading>FOOTER AREA</Heading>
      </Flex>
    </Flex>
  );
};

export default Footer;
