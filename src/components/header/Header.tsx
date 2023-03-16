//  Lib
import { Flex, Heading, Image } from "@chakra-ui/react";
//  Components
import MenuHeader from "@components/menu/MenuHeader";
import ThemeBox from "@components/header/ThemeBox";
//  CustomHooks
import useLocationState from "@hook/useLocationState";

const Header = () => {
  const { pathState } = useLocationState();

  return (
    <Flex
      padding="9px 16px"
      w="100%"
      h="3rem"
      justify="space-between"
      alignItems="center"
      zIndex={999}
      bgColor="primary.main.bg"
      borderBottom="1px solid"
      borderColor="primary.main.bdColor"
    >
      <Flex alignItems="center" gap="8px">
        <Image w="26.99px" h="30.5px" src="logo.png" />
        <Heading variant="serviceName">ON THE MAP</Heading>
      </Flex>
      {pathState !== "/" && (
        <Flex>
          <MenuHeader />
          {/* <ThemeBox /> */}
        </Flex>
      )}
      {/* <Flex
        position="fixed"
        top="0"
        justify="space-between"
        alignItems="center"
        w="100%"
        h="inherit"
        bgColor="primary.main.bg"
        borderBottom="1px solid"
        borderColor="primary.main.bdColor"
      >
        <Flex>
          <Heading>ON THE MAP</Heading>
        </Flex>
        {pathState !== "/" && (
          <Flex>
            <MenuHeader />
            <ThemeBox />
          </Flex>
        )}
      </Flex> */}
    </Flex>
  );
};

export default Header;
