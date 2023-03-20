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
      zIndex={999}
      padding="0 19px"
      w="100%"
      h="2.5rem"
      justify="space-between"
      alignItems="center"
      bgColor="system.bg"
      borderBottom="1px solid"
      borderColor="primary.main.bdColor"
    >
      <Flex alignItems="center" gap="0.5rem">
        <Image w="26.99px" h="30.5px" src="logo.png" />
        <Heading variant="serviceName">ON THE MAP</Heading>
      </Flex>
      {pathState !== "/" && (
        <Flex h="100%">
          <MenuHeader />
        </Flex>
      )}
      {pathState !== "/" && (
        <Flex
          pr={{ base: "10rem", mobile: 0, tablet: 0, pc: "10rem" }}
          h="100%"
        >
          <ThemeBox />
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
