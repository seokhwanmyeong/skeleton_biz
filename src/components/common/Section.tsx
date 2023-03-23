import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Section = ({ children, ...props }: any) => {
  return (
    <Flex
      w="100%"
      h="auto"
      direction="column"
      boxShadow="0px 2.84664px 7.11661px rgba(0, 0, 0, 0.25)"
      borderRadius="Box"
      bgColor="bg.primary"
      overflow="hidden"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Section;
