//  Lib
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Animation
import {} from "@styles/animation/keyFremes";

type DecoProps = {
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
};

const DecoBoxL = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M1 0V260" stroke="white" />
      <rect x="1" width="16" height="1" fill="white" />
      <rect x="1" y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

const DecoBoxR = (iconProps: any) => {
  return (
    <Icon viewBox="0 0 17 260" fill="none" {...iconProps}>
      <path d="M16 0V260" stroke="white" />
      <rect width="16" height="1" fill="white" />
      <rect y="259" width="16" height="1" fill="white" />
    </Icon>
  );
};

const DecoFilterGap = (iconProps: any) => {
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

const DecoBotRoof = (iconProps: any) => {
  return (
    <Icon
      width="238"
      height="10"
      viewBox="0 0 238 10"
      fill="none"
      {...iconProps}
    >
      <g filter="url(#filter0_b_687_231352)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.37089 0H230.629L237.869 9.5H0.130859L7.37089 0Z"
          fill="white"
        />
        <path
          d="M0.635712 9.25L7.49468 0.25H230.505L237.364 9.25H0.635712Z"
          stroke="#BFBFBF"
          strokeWidth="0.5"
        />
      </g>
      <g filter="url(#filter1_b_687_231352)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3431 3H229.362L232.352 7H7.35254L10.3431 3Z"
          fill="#8C8C8C"
        />
      </g>
    </Icon>
  );
};

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

const DecoCenterBox = (iconProps: any) => {
  return (
    <Icon
      width="235"
      height="696"
      viewBox="0 0 235 696"
      fill="none"
      {...iconProps}
    >
      <path
        d="M182.754 685.18C127.307 646.903 82.4274 595.24 52.2791 534.986C22.1308 474.732 7.69091 407.838 10.2994 340.513C12.9079 273.188 32.4802 207.613 67.2002 149.872C101.92 92.1309 150.663 44.0957 208.905 10.2235L224.307 36.7075C170.526 67.9854 125.517 112.341 93.4562 165.66C61.3955 218.978 43.3223 279.531 40.9136 341.699C38.5049 403.868 51.8388 465.638 79.678 521.277C107.517 576.916 148.959 624.621 200.159 659.967L182.754 685.18Z"
        fill="white"
      />
    </Icon>
  );
};

const DecoCenterBox02 = (iconProps: any) => {
  return (
    <Icon
      width="278"
      height="56"
      viewBox="0 0 278 56"
      fill="none"
      {...iconProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8506 45.0226L10.3154 39.1076C92.1382 4.03833 184.249 1.46543 267.902 31.9126L265.701 37.9598C241.071 28.995 215.693 22.9465 190.065 19.8003L189.143 27.3095C161.167 23.8745 132.871 23.9733 104.92 27.6035L103.945 20.1014C72.8315 24.1416 42.1682 32.457 12.8506 45.0226Z"
        fill="white"
      />
    </Icon>
  );
};

const DecoCenterBox03 = (iconProps: any) => {
  return (
    <Icon
      width="780"
      height="744"
      viewBox="0 0 780 744"
      fill="none"
      {...iconProps}
    >
      <path
        d="M225.832 6.69507C146.884 43.9303 82.9781 106.951 44.6461 185.372C6.31409 263.793 -4.15645 352.933 14.9601 438.102C34.0767 523.271 81.6395 599.386 149.81 653.901C217.98 708.417 302.69 738.081 389.978 738.004C477.265 737.927 561.922 708.113 629.996 653.477C698.07 598.84 745.498 522.642 764.464 437.44C783.43 352.237 772.802 263.115 734.331 184.762C695.86 106.41 631.843 43.5015 552.83 6.40597"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        shapeRendering="crispEdges"
      />
    </Icon>
  );
};

const DecoFrameL = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex
      p="6rem 0"
      w="20%"
      h="100%"
      direction="column"
      justify="space-between"
      pointerEvents="fill"
    >
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)"
        flex="none"
      />
      {children}
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)"
        flex="none"
      />
    </Flex>
  );
};

const DecoFrameR = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex
      p="6rem 0"
      w="20%"
      h="100%"
      direction="column"
      justify="space-between"
      pointerEvents="fill"
    >
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)"
        flex="none"
      />
      {children}
      <Box
        w="100%"
        h="1px"
        bg="linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)"
        flex="none"
      />
    </Flex>
  );
};

const DecoFrameCenter = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <Flex
      pos="relative"
      p="6rem 0"
      w="80%"
      h="100%"
      direction="row"
      justify="space-between"
      gap="0.625rem"
      _before={{
        content: '""',
        pos: "absolute",
        top: "6rem",
        left: "1.625rem",
        display: "inline-block",
        w: "20%",
        h: "1px",
        bg: "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)",
        flex: "none",
      }}
      _after={{
        content: '""',
        pos: "absolute",
        top: "6rem",
        right: "1.625rem",
        display: "inline-block",
        w: "20%",
        h: "1px",
        bg: "linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 90%)",
        flex: "none",
      }}
    >
      {/* 좌측 박스 */}
      <Box
        pos="relative"
        w="16px"
        h="100%"
        borderLeft="1px solid"
        borderColor="neutral.gray8"
        _before={{
          content: '""',
          pos: "absolute",
          top: "0",
          left: "0",
          display: "inline-block",
          w: "100%",
          h: "4px",
          bgColor: "neutral.gray8",
          flex: "none",
        }}
        _after={{
          content: '""',
          pos: "absolute",
          bottom: "0",
          left: "0",
          display: "inline-block",
          w: "100%",
          h: "4px",
          bgColor: "neutral.gray8",
          flex: "none",
        }}
      />
      {/* 중앙 박스 */}
      <Flex ref={boxRef} pos="relative" w="100%" h="auto" pointerEvents="none">
        {/* 중앙 원형 */}
        <Box
          as={motion.div}
          pos="absolute"
          top="50%"
          left="50%"
          maxW="90vh"
          maxH="90vh"
          transform="translate(-50%, -50%)"
          borderRadius="50%"
          border="1px solid"
          borderColor="#26232380"
          boxShadow="0px 0px 10px 2px #00000040"
          transition="0.3s easeIn"
          initial={{
            width: 0,
            height: 0,
          }}
          animate={{
            width: "60vw",
            height: "60vw",
          }}
          exit={{
            width: "60vw",
            height: "60vw",
          }}
        >
          {/* 중앙 미들 원형 */}
          <Box
            as={motion.div}
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="93%"
            h="93%"
            transition="0.3s linear"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <DecoCenterBox03
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -48%)"
              width="100%"
              height="100%"
              filter="drop-shadow(0px 0px 4px #00000080)"
            />
            {/* 중앙 좌측 미들 박스 */}
            <Flex
              as={motion.div}
              pos="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              transition="0.2s linear"
              initial={{
                transform: "rotate(0deg)",
              }}
              animate={{
                transform: "rotate(-90deg)",
              }}
            >
              <DecoCenterBox
                position="absolute"
                bottom="-32%"
                left="50%"
                transform="translateX(-52%) rotate(271.4deg)"
                width="92%"
                height="92%"
                filter="drop-shadow(0px 0px 10px #00000040)"
              />
            </Flex>
            {/* 중앙 우측 미들 박스 */}
            <Flex
              as={motion.div}
              pos="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              transition="0.2s linear"
              initial={{
                transform: "rotate(0deg)",
              }}
              animate={{
                transform: "rotate(84deg)",
              }}
            >
              <DecoCenterBox
                position="absolute"
                bottom="-32%"
                left="50%"
                transform="translateX(-52%) rotate(271.4deg)"
                width="92%"
                height="92%"
                filter="drop-shadow(0px 0px 10px #00000040)"
              />
            </Flex>
            {/* 중앙 중심 원형 */}
            <Box
              as={motion.div}
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="90%"
              h="90%"
              borderRadius="50%"
              border="3px solid"
              borderColor="#26232380"
              borderTop="none"
              borderBottom="none"
              transition="0.2s 0.2s linear"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <Flex
                as={motion.div}
                pos="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                transition="0.3s 0.1s linear"
                initial={{
                  transform: "rotate(0deg)",
                }}
                animate={{
                  transform: "rotate(89deg)",
                }}
              >
                <DecoCenterBox02
                  pos="absolute"
                  top="-2%"
                  left="50%"
                  transform="translateX(-50%) rotate(1.5deg)"
                  width="50%"
                  height="8%"
                  filter="drop-shadow(0px 0px 10px #00000040)"
                />
              </Flex>
              <Flex
                as={motion.div}
                pos="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="100%"
                transition="0.3s 0.1s linear"
                initial={{
                  transform: "rotate(0deg)",
                }}
                animate={{
                  transform: "rotate(89deg)",
                }}
              >
                <DecoCenterBox02
                  pos="absolute"
                  bottom="-2%"
                  left="50%"
                  transform="translateX(-50%) rotate(181.5deg)"
                  width="50%"
                  height="8%"
                  filter="drop-shadow(0px 0px 10px 0px #00000040)"
                />
              </Flex>
              <Box
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="95%"
                h="95%"
                borderRadius="50%"
                border="1px dashed"
                borderColor="#26232380"
              />
            </Box>
          </Box>
        </Box>
      </Flex>
      {/* 우측 박스 */}
      <Box
        pos="relative"
        w="16px"
        h="100%"
        borderRight="1px solid"
        borderColor="neutral.gray8"
        _before={{
          content: '""',
          pos: "absolute",
          top: "0",
          right: "0",
          display: "inline-block",
          w: "100%",
          h: "4px",
          bgColor: "neutral.gray8",
          flex: "none",
        }}
        _after={{
          content: '""',
          pos: "absolute",
          bottom: "0",
          right: "0",
          display: "inline-block",
          w: "100%",
          h: "4px",
          bgColor: "neutral.gray8",
          flex: "none",
        }}
      />
    </Flex>
  );
};

export {
  DecoBoxL,
  DecoBoxR,
  DecoFilterGap,
  DecoCardBg,
  DecoTop,
  DecoFilterBg,
  DecoBotBox,
  DecoFrameL,
  DecoFrameR,
  DecoFrameCenter,
};
