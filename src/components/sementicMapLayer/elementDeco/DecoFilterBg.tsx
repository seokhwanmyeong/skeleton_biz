import React from "react";
import { Box } from "@chakra-ui/react";

type DecoProps = {
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
};

const DecoFilterBg = ({ position }: DecoProps) => {
  return (
    <Box
      pos="absolute"
      w="100vw"
      h="5rem"
      bg="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%)"
      zIndex="1"
      {...position}
    ></Box>
  );
};

export default DecoFilterBg;
