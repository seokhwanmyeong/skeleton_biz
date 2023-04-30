//  Lib
import { useRef } from "react";
import type { ReactNode } from "react";
import { Box, Icon, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
//  Img
import Bg from "@assets/img/bg_map_init.png";
import botBg from "@assets/img/deco_filter_bot.png";
import botTop from "@assets/img/deco_filter_botTop.png";
import botLeft from "@assets/img/deco_filter_botLeft.png";
import botRight from "@assets/img/deco_filter_botRight.png";
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
      transition="0.3s linear"
      initial={{
        opacity: 0,
        bottom: "-200px",
      }}
      animate={{
        opacity: 1,
        bottom: "0px",
      }}
      exit={{
        opacity: 1,
        bottom: "0px",
      }}
    >
      <Flex
        as={motion.div}
        pos="relative"
        w="100%"
        h="100%"
        transition="0.4s linear"
        initial={{
          transform: "rotate(-45deg)",
          top: "30%",
          left: "-30%",
          opacity: 0,
        }}
        animate={{
          transform: "rotate(0deg)",
          top: "0",
          left: "0",
          opacity: 1,
        }}
        exit={{
          transform: "rotate(0deg)",
          top: "0",
          left: "0",
          opacity: 1,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};

//  최하단 상위 필터
const DecoBotHightBox = ({ children }: { children: ReactNode }) => {
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
      gap="4.25rem"
      bg={`center url(${botBg})`}
      transition="0.3s linear"
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

//  중앙 포커스 라운드 Element
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

//  중앙 포커스 라운드 Element
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

//  중앙 포커스 라운드 Element
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

//  상세 좌측 Frame
const DecoFrameL = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  [x: string]: any;
}) => {
  return (
    <Flex
      p="6rem 0"
      w="25%"
      h="100%"
      direction="column"
      justify="space-between"
      pointerEvents="fill"
      zIndex={2}
      {...rest}
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

// 좌우측 랭킹 박스 태그
const DecoRankTag = ({
  children,
  width,
  height,
  fillColor,
  ...rest
}: {
  children?: ReactNode;
  width?: any;
  height?: any;
  fillColor?: any;
  [x: string]: any;
}) => {
  return (
    <Flex
      pos="relative"
      width={width || "2.25rem"}
      height={height || "1.125rem"}
      justify="center"
      gap="2px"
      {...rest}
    >
      {children}
      <Icon
        pos="absolute"
        top={0}
        left={0}
        width={width || "2.25rem"}
        height={height || "1.125rem"}
        viewBox="0 0 35 18"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.19922 1H29.8764L34.1992 5.32282V17H5.52367L1.19922 12.6755V1Z"
          fill={fillColor || "currentColor"}
        />
        <path
          d="M29.8764 1L30.0532 0.823223L29.98 0.75H29.8764V1ZM1.19922 1V0.75H0.949219V1H1.19922ZM34.1992 5.32282H34.4492V5.21926L34.376 5.14604L34.1992 5.32282ZM34.1992 17V17.25H34.4492V17H34.1992ZM5.52367 17L5.34689 17.1768L5.42012 17.25H5.52367V17ZM1.19922 12.6755H0.949219V12.7791L1.02244 12.8523L1.19922 12.6755ZM29.8764 0.75H1.19922V1.25H29.8764V0.75ZM34.376 5.14604L30.0532 0.823223L29.6996 1.17678L34.0224 5.49959L34.376 5.14604ZM34.4492 17V5.32282H33.9492V17H34.4492ZM5.52367 17.25H34.1992V16.75H5.52367V17.25ZM1.02244 12.8523L5.34689 17.1768L5.70045 16.8232L1.376 12.4988L1.02244 12.8523ZM0.949219 1V12.6755H1.44922V1H0.949219Z"
          fill="#595959"
        />
      </Icon>
    </Flex>
  );
};

//  상세 우측 Frame
const DecoFrameR = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  [x: string]: any;
}) => {
  return (
    <Flex
      p="6rem 0"
      w="25%"
      h="100%"
      direction="column"
      justify="space-between"
      pointerEvents="fill"
      zIndex={2}
      {...rest}
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

//  중앙 포커스 라운드
const DecoFrameCenter = ({
  isOpen = true,
  activeAni = true,
}: {
  isOpen?: boolean;
  activeAni?: boolean;
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <Flex
      pos="relative"
      p="6rem 0"
      w="50%"
      h="100%"
      direction="row"
      justify="space-between"
      gap="0.625rem"
      zIndex={1}
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
      <Flex
        ref={boxRef}
        pos="relative"
        w="100%"
        h="auto"
        zIndex={-1}
        pointerEvents="none"
      >
        {/* 중앙 원형 */}
        {isOpen && (
          <Box
            as={motion.div}
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            border="1px solid"
            borderColor="#26232380"
            boxShadow="0px 0px 10px 2px #00000040"
            // transition="0.2s ease"
            initial={{
              width: 0,
              height: 0,
              maxWidth: "70vh",
              maxHeight: "70vh",
            }}
            animate={{
              width: "60vw",
              height: "60vw",
              maxWidth: "70vh",
              maxHeight: "70vh",
            }}
            exit={{
              width: "60vw",
              height: "60vw",
              maxWidth: "70vh",
              maxHeight: "70vh",
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
              transition="0.3s 0.2s linear"
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
                transition="0.2s 0.5s linear"
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
                transition="0.3s 0.5s linear"
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
                transition="0.3s 0.6s linear"
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
                  transition="0.3s 0.9s linear"
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
                  transition="0.3s 0.9s linear"
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
        )}
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
  DecoTopFilterModal,
  DecoTop,
  DecoFilterBg,
  DecoCardBg,
  DecoInitFilter,
  DecoBotBox,
  DecoBotHightBox,
  DecoFilterDivider,
  DecoFrameL,
  DecoFrameR,
  DecoFrameCenter,
  DecoRankTag,
};
