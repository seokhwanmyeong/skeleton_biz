//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Link, Grid } from "@chakra-ui/react";
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
    <Grid
      h="inherit"
      gridTemplateColumns={`repeat(${menuList.length}, minmax(0, auto))`}
    >
      {menuList.map((menu: MainRouteType) => {
        return (
          <Link
            as={RoutLink}
            to={indexChecker(menu.path) ? "" : menu.path}
            key={`head-${menu.title}`}
            style={rootState === menu.root ? { fontWeight: "bolder" } : {}}
            variant={"linkBtn"}
            data-text={menu.title}
          >
            {menu.title}
          </Link>
        );
      })}
    </Grid>
  );
};

export default MenuHeader;
