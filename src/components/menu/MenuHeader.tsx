//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, Flex, useTheme } from "@chakra-ui/react";
//  State
import { headerRouteList } from "@states/route/stateRoute";
import type { MainRouteType } from "@states/route/stateRoute";
//  Custom Hook
import useLocationState from "@hook/useLocationState";

const MenuHeader = () => {
  const menuList = useRecoilValue(headerRouteList);
  const { rootState } = useLocationState();

  return (
    <Flex h="inherit" gap="2rem">
      {menuList.map((menu: MainRouteType) => {
        return (
          <Link
            as={RoutLink}
            to={menu.path}
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
