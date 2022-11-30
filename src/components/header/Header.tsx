//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Flex,
  Button,
  useColorMode,
  Link,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";
//  Components
import Tag from "@components/common/Tag";
//  State
import { mainMenu } from "@src/states/menu/stateMenu";
import { themeList, atomThemeColor } from "@src/states/theme/themeState";
//  Type
import { MainMenuType } from "@util/type/menuType";

const Header = ({ rootState }: { rootState: string }) => {
  const headerMenu = useRecoilValue(mainMenu);
  const themeArr = useRecoilValue(themeList);
  const setThemeColor = useSetRecoilState(atomThemeColor);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const themeHandler = (theme: string) => {
    onToggle();
    setThemeColor(theme);
  };

  return (
    <Flex w="100%" h="5rem" zIndex={999}>
      <Flex
        position="fixed"
        top="0"
        gap="10"
        w="100%"
        h="inherit"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="primary.main.bdColor"
      >
        {headerMenu.map((menu: MainMenuType) => {
          return (
            <Link
              as={RoutLink}
              to={menu.path}
              className={rootState === menu.root ? "active" : ""}
              key={`head-${menu.title}`}
              style={rootState === menu.root ? { fontWeight: "bolder" } : {}}
              color="primary.main.font"
            >
              {menu.title}
            </Link>
          );
        })}
        <Flex position="relative">
          <Button
            color="primary.reverse.font"
            borderColor="primary.main.color"
            backgroundColor="primary.main.color"
            _hover={{
              backgroundColor: "primary.reverse.hover",
            }}
            onClick={onToggle}
          >
            Theme
          </Button>
          <Flex
            position="absolute"
            bottom="-50px"
            right="0"
            display={isOpen ? "flex" : "none"}
            opacity={isOpen ? 1 : 0}
            h="auto"
            p="10px"
            backgroundColor="primary.main.color"
            border="1px solid"
            borderColor="primary.main.bdColor"
            borderRadius="5px"
            gap="5px"
            transition="0.5s"
          >
            {themeArr.map((li) => (
              <Tag
                key={`tag-theme-${li.key}`}
                tagBtn={true}
                text={li.title}
                onClick={() => {
                  themeHandler(li.key);
                }}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
