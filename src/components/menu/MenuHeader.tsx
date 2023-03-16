//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, Flex } from "@chakra-ui/react";
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
  const { rootState } = useLocationState();

  return (
    <Flex
      h="inherit"
      gridTemplateColumns={`repeat(${menuList.length}, minmax(0, auto))`}
    >
      {menuList.map((menu: MainRouteType) => {
        return (
          <Link
            as={RoutLink}
            to={indexChecker(menu.path) ? "" : menu.path}
            key={`head-${menu.title}`}
            fontWeight={rootState === menu.root ? "bold" : "normal"}
            variant={"linkBtn"}
            data-text={menu.title}
          >
            {menu.title}
          </Link>
        );
      })}
    </Flex>
  );
};

export default MenuHeader;
