// Lib
import { Link } from "react-router-dom";
// Style & Lib
import { Flex, Button, useColorMode } from "@chakra-ui/react";

type Props = {
  rootState: string;
};

const Header = (props: any) => {
  const { rootState } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const headerMenu = [
    {
      to: "/",
      title: "Home",
      root: "",
    },
    {
      to: "/maps",
      title: "Map",
      root: "maps",
    },
    {
      to: "/erp",
      title: "ERP",
      root: "erp",
    },
    {
      to: "/guide",
      title: "Guide",
      root: "guide",
    },
  ];

  return (
    <Flex w="100%" h="5rem">
      <Flex
        position="fixed"
        top="0"
        gap="10"
        w="100%"
        h="inherit"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid"
      >
        {headerMenu.map((menu) => {
          return (
            <Link
              to={menu.to}
              className={rootState === menu.root ? "active" : ""}
              key={`head-${menu.title}`}
              style={rootState === menu.root ? { fontWeight: "bolder" } : {}}
            >
              {menu.title}
            </Link>
          );
        })}
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
