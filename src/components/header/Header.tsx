//  Lib
import { Flex } from "@chakra-ui/react";
//  Components
import MenuHeader from "@components/menu/MenuHeader";
import ThemeBox from "@components/header/ThemeBox";

const Header = () => {
  return (
    <Flex w="100%" h="5rem" zIndex={999}>
      <Flex
        position="fixed"
        top="0"
        gap="1rem"
        w="100%"
        h="inherit"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="primary.main.bdColor"
      >
        <MenuHeader />
        <ThemeBox />
      </Flex>
    </Flex>
  );
};

export default Header;
