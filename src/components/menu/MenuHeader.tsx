//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, Flex, useTheme, Icon } from "@chakra-ui/react";
//  State
import {
  mainRoute,
  indexChecker,
  MainRouteType,
} from "@states/route/stateRoute";
//  Custom Hook
import useLocationState from "@hook/useLocationState";

const MenuHeader = () => {
  const menuList = useRecoilValue(mainRoute);
  const theme = useTheme();
  const { rootState } = useLocationState();

  return (
    <Flex h="inherit" gap="2rem">
      {menuList.map((menu: MainRouteType) => {
        return (
          <Link
            as={RoutLink}
            to={indexChecker(menu.path) ? "" : menu.path}
            key={`head-${menu.title}`}
            variant={
              "/" + rootState === menu.path ? "headMenuOn" : "headMenuOff"
            }
            data-text={menu.title}
          >
            {menu.icon && menu.icon()}
            {menu.title}
          </Link>
        );
      })}
    </Flex>
  );
};

export default MenuHeader;
