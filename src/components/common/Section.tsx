import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Section = ({ children, ...props }: any) => {
  return (
    <Flex
      p="2rem 1rem"
      w="100%"
      h="auto"
      boxShadow="0px 2.84664px 7.11661px rgba(0, 0, 0, 0.4)"
      borderRadius="10.6749px"
      bgColor="bg.primary"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Section;
