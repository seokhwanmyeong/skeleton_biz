//  Lib
import { Flex, Heading, Link, useTheme } from "@chakra-ui/react";
//  Components
import MenuHeader from "@components/menu/MenuHeader";
import ThemeBox from "@components/header/ThemeBox";
//  CustomHooks
import useLocationState from "@hook/useLocationState";
//  Icon
import { IcoMy, Logo } from "@assets/icons/icon";

const Header = () => {
  const { pathState } = useLocationState();
  const theme = useTheme();

  return (
    <Flex
      zIndex={999}
      padding="0 18px"
      w="100%"
      h="2.875rem"
      justify="space-between"
      alignItems="center"
      bgColor="bg.primary"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <Flex h="100%" gap="2rem">
        <Flex alignItems="center" gap="0.5rem">
          <Logo w="36px" h="36px" color={theme.colors.bg.inverse} />
          <Heading variant="serviceName">ON THE MAP</Heading>
        </Flex>
        {pathState !== "/" && <MenuHeader />}
      </Flex>
      {pathState !== "/" && (
        <Flex
          alignItems="center"
          pr={{ base: "10rem", mobile: 0, tablet: "8rem", pc: "10rem" }}
          h="100%"
          gap="2rem"
        >
          <ThemeBox />
          <Link
            isExternal={true}
            href="https://www.bizrecipe.co.kr/"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="2rem"
            h="2rem"
            borderRadius="50%"
            bgColor="neutral.gray6"
          >
            <IcoMy w="1.125rem" h="1.125rem" color="neutral.gray1" />
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
