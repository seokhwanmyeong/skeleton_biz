//  Lib
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
//  Components
import MenuSide from "@components/menu/MenuSide";
//  image
import bgImg from "/src/assets/background.png";

const FrameSub = () => {
  return (
    <Flex
      pos="relative"
      p="8px 16px 11px 5px"
      w="100%"
      gap="13px"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgImage={bgImg}
      _before={{
        content: '""',
        bgSize: "cover",
        bgColor: "bg.deco",
        pos: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.9,
        w: "100%",
        h: "100%",
        zIndex: 0,
      }}
    >
      <MenuSide />
      <Flex zIndex={1} w="calc(100% - 13px - 4.5rem)" h="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default FrameSub;
