//  Lib
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
//  Components
import MenuSide from "@components/menu/MenuSide";

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
      bgImage="url('src/assets/background.png')"
      _before={{
        content: '""',
        bgSize: "cover",
        bgColor: "bg.deco",
        pos: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.75,
        w: "100%",
        h: "100%",
      }}
    >
      <MenuSide />
      <Flex w="100%" h="100%" overflowY="hidden">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default FrameSub;
