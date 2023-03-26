//  Lib
import React from "react";
import { Flex, useColorMode } from "@chakra-ui/react";

type Props = {};

const Section = ({ children, ...props }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      h="auto"
      direction="column"
      bg={
        colorMode === "light"
          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)"
          : "bg.primary"
      }
      boxShadow="0px 2.85px 7.12px rgba(0, 0, 0, 0.25)"
      borderRadius="Box"
      overflow="hidden"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Section;
