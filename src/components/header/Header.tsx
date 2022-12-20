//  Lib
import { Link as RoutLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Flex, Link, Grid } from "@chakra-ui/react";
//  Components
import ThemeBox from "@components/header/ThemeBox";
//  State
import {
  mainRoute,
  indexChecker,
  MainRouteType,
} from "@states/route/stateRoute";

const Header = ({ rootState }: { rootState: string }) => {
  const headerMenu = useRecoilValue(mainRoute);

  return (
    <Flex w="100%" h="5rem" zIndex={999}>
      <Flex
        position="fixed"
        top="0"
        gap="1rem"
        w="100%"
        h="inherit"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="primary.main.bdColor"
      >
        <Grid
          h="inherit"
          gridTemplateColumns={`repeat(${headerMenu.length}, minmax(0, auto))`}
        >
          {headerMenu.map((menu: MainRouteType) => {
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
        <ThemeBox />
      </Flex>
    </Flex>
  );
};

export default Header;
