//  Lib
import type { ReactNode } from "react";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Animation
import { boxBaseAnimation } from "@styles/animation/keyFremes";

//  상단 필터 모달 Element
const DecoBoxL = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M1 0V260" stroke="white" />
      <rect x="1" width="16" height="1" fill="white" />
      <rect x="1" y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

//  상단 필터 모달 Element
const DecoBoxR = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M16 0V260" stroke="white" />
      <rect width="16" height="1" fill="white" />
      <rect y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

//  상단 필터 모달
const DecoTopFilterModal = ({
  isOpen,
  children,
  ...rest
}: {
  isOpen: boolean;
  children: ReactNode;
  [x: string]: any;
}) => {
  return (
    <Flex
      as={motion.div}
      animation={boxBaseAnimation}
      pos="absolute"
      top="4.8rem"
      left="50%"
      transform="translateX(-50%)"
      p="0.75rem 0.5rem 0.75rem"
      display={isOpen ? "flex" : "none"}
      direction="column"
      justify="center"
      border="1px solid #BFBFBF"
      {...rest}
    >
      {children}
      <Flex
        position="absolute"
        top="-4.6%"
        left="50%"
        transform="translateX(-50%)"
        gap="0.25rem"
      >
        <Box
          boxSizing="border-box"
          w="0.25rem"
          h="0.25rem"
          background="#FFFFFF"
          border="1px solid #FFFFFF"
        />
        <Box
          boxSizing="border-box"
          w="0.25rem"
          h="0.25rem"
          background="#FFFFFF"
          border="1px solid #FFFFFF"
        />
      </Flex>
      <Box
        zIndex={-1}
        position="absolute"
        top={0}
        left={0}
        display="block"
        width="100%"
        height="100%"
        bg="rgba(255, 255, 255, 0.75)"
        backdropFilter="blur(5px)"
        userSelect="none"
      />
    </Flex>
  );
};

//  상단 필터 Element
const DecoTop = ({ width }: { width?: any }) => {
  return (
    <Flex
      pos="absolute"
      bottom="-3px"
      left="50%"
      transform="translateX(-50%)"
      w={width || "15rem"}
      userSelect="none"
      transition="0.3s"
      gap="4px"
    >
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(-90deg, #000000 0%, #FFFFFF00 100%)"
        transition="inherit"
      ></Box>
      <Box
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%) rotate(-45deg)"
        w="4px"
        h="4px"
        bg="rgba(255, 255, 255, 0.5)"
        border="1px solid #000000"
        transition="inherit"
      ></Box>
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(90deg, #000000 0%, #FFFFFF00 100%)"
        transition="inherit"
      ></Box>
    </Flex>
  );
};

//  상단 필터 Backgroun Deco
const DecoFilterBg = (props?: any) => {
  return (
    <Box
      pos="absolute"
      w="80vw"
      h="4.25rem"
      bg="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%)"
      zIndex="1"
      {...props}
    ></Box>
  );
};

export { DecoBoxL, DecoBoxR, DecoTopFilterModal, DecoTop, DecoFilterBg };
