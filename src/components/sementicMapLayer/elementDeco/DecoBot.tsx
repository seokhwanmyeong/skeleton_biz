//  Lib
import type { ReactNode } from "react";
import { Box, Icon, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Img
import Bg from "@assets/img/bg_map_init.png";
import botBg from "@assets/img/deco_filter_bot.png";
import botTop from "@assets/img/deco_filter_botTop.png";
import botLeft from "@assets/img/deco_filter_botLeft.png";
import botRight from "@assets/img/deco_filter_botRight.png";

//  하단
const DecoBotBox = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      pos="absolute"
      bottom="1%"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      gap="2.625rem"
      p="0.625rem 2.75rem 0.25rem"
      bgColor="#FFFFFFBF"
    >
      {children}
    </Flex>
  );
};

//  하단 Init 필터
const DecoInitFilter = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      as={motion.div}
      pos="absolute"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      gap="2.625rem"
      w="490px"
      h="153px"
      bg={`top no-repeat url(${Bg})`}
      transition="0.1s linear"
      initial={{
        bottom: "-200px",
      }}
      animate={{
        bottom: "0px",
      }}
      exit={{
        bottom: "0px",
      }}
    >
      <Flex
        as={motion.div}
        pos="relative"
        w="100%"
        h="100%"
        transition="0.2s 0.05s linear"
        initial={{
          opacity: 0,
          transform: "rotate(-180deg)",
          top: "70%",
          left: "-30%",
        }}
        animate={{
          opacity: 1,
          transform: "rotate(0deg)",
          top: "0",
          left: "0",
        }}
        exit={{
          opacity: 1,
          transform: "rotate(0deg)",
          top: "0",
          left: "0",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};

//  최하단 상위 필터
const DecoBotHightBox = ({
  children,
  gap,
}: {
  children: ReactNode;
  gap?: string;
}) => {
  return (
    <Flex
      as={motion.div}
      pos="absolute"
      bottom="1%"
      left="50%"
      zIndex={999}
      transform="translateX(-50%)"
      w="384px"
      h="72px"
      justify="center"
      align="center"
      gap={gap || "4.25rem"}
      bg={`center url(${botBg})`}
      transition="0.1s linear"
      initial={{
        bottom: "-72px",
        opacity: 0,
      }}
      animate={{
        bottom: "8px",
        opacity: 1,
      }}
      exit={{
        bottom: "8px",
        opacity: 1,
      }}
    >
      <Image
        pos="absolute"
        top="-12px"
        left="50%"
        transform="translateX(-50%)"
        src={botTop}
      />
      <Image
        pos="absolute"
        top="50%"
        left="-44px"
        transform="translateY(-50%)"
        src={botLeft}
      />
      {children}
      <Image
        pos="absolute"
        top="50%"
        right="-44px"
        transform="translateY(-50%)"
        src={botRight}
      />
    </Flex>
    // botBg botTop botLeft botRight
  );
};

//  하단 뎁스 필터 Background
const DecoCardBg = () => {
  return (
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
  );
};

//  하단 뎁스 필터 Divider
const DecoFilterDivider = (iconProps: any) => {
  return (
    <Icon width="2px" height="3.375rem" viewBox="0 0 2 60" {...iconProps}>
      <g opacity="0.5">
        <path
          d="M1 0.5L0.999998 53.3598"
          stroke="#262323"
          strokeOpacity="0.8"
          strokeWidth="0.5"
        />
        <path d="M1 0.5L1 3.02381" stroke="#262323" />
        <path d="M1 50.9761L1 53.4999" stroke="#262323" />
      </g>
    </Icon>
  );
};

export {
  DecoCardBg,
  DecoInitFilter,
  DecoBotBox,
  DecoBotHightBox,
  DecoFilterDivider,
};
