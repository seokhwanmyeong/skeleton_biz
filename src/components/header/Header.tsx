//  Lib
import { Flex, Link, useTheme } from "@chakra-ui/react";
//  Components
import MenuHeader from "@components/menu/MenuHeader";
import ThemeBox from "@components/header/ThemeBox";
//  CustomHooks
import useLocationState from "@hook/useLocationState";
//  Icon
import { IcoLogoMain, IcoLogoText, IcoMy } from "@assets/icons/icon";

const Header = () => {
  const { pathState } = useLocationState();
  const theme = useTheme();

  return (
    <Flex
      zIndex={999}
      p="0 1rem"
      w="100%"
      h="2.875rem"
      justify="space-between"
      alignItems="center"
      bgColor="neutral.gray1"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <Flex h="100%" alignItems="center" gap="0.5rem">
        <IcoLogoMain w="2rem" h="1rem" color={theme.colors.bg.inverse} />
        <IcoLogoText
          width="4.875rem"
          height="0.625rem"
          color="neutral.gray10"
        />
      </Flex>
      {pathState !== "/" && <MenuHeader />}
      {pathState !== "/" && (
        <Flex
          alignItems="center"
          h="100%"
          gap="2rem"
          display={{ pc: "flex", tablet: "none", mobile: "none" }}
        >
          <ThemeBox />
          <Link
            isExternal={true}
            href="https://www.onthemap.kr/"
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
