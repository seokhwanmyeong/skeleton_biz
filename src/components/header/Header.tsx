//  Lib
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Flex, Button, useColorMode } from "@chakra-ui/react";
//  State
import { mainMenu } from "@src/states/menu/stateMenu";
//  Type
import { MainMenuType } from "@util/type/menuType";

const Header = ({ rootState }: { rootState: string }) => {
  const headerMenu = useRecoilValue(mainMenu);
  const { colorMode, toggleColorMode } = useColorMode();
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
        {headerMenu.map((menu: MainMenuType) => {
          return (
            <Link
              to={menu.path}
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
