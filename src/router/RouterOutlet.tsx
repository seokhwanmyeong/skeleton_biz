//  Lib
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Route, Routes } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
//  Pages
import ErrorPage from "@page/ErrorPage";
//  Pages: Frame
import FrameMain from "@page/frame/FrameMain";
import FrameSub from "@page/frame/FrameSub";
//  State & Pages
import {
  mainRouteSelector,
  subRoute as _subRoute,
  indexChecker,
  MainRouteType,
  SubRouteType,
  DepthRouteType,
} from "@states/route/stateRoute";
import { atomThemeColor } from "@states/theme/stateTheme";

const RouterOutlet = () => {
  const mainRoute = useRecoilValue(mainRouteSelector);
  const subRoute = useRecoilValue(_subRoute);
  const { colorMode, toggleColorMode } = useColorMode();
  const [themeColor, setThemeColor] = useRecoilState(atomThemeColor);

  useEffect(() => {
    if (themeColor !== colorMode) {
      colorMode === "light" ? setThemeColor("light") : setThemeColor("dark");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FrameMain />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          {mainRoute.map((main: MainRouteType) => {
            return main.hasSub ? (
              <Route
                key={`route-main-${main.root}`}
                path={main.root}
                element={<FrameSub />}
              >
                {subRoute[main.root]?.map((sub: SubRouteType) => {
                  if (sub.isExternal) return;
                  else {
                    return sub.hasChild
                      ? sub.children &&
                          sub.children.map((depth: DepthRouteType) => (
                            <Route
                              index={indexChecker(depth.path)}
                              key={`route-${depth.path}`}
                              path={indexChecker(depth.path) ? "" : depth.path}
                              element={<depth.page />}
                            />
                          ))
                      : sub.page && (
                          <Route
                            index={indexChecker(sub.path)}
                            key={`route-${sub.path}`}
                            path={indexChecker(sub.path) ? "" : sub.path}
                            element={<sub.page />}
                          />
                        );
                  }
                })}
              </Route>
            ) : (
              main.page && (
                <Route
                  key={`route-main-${main.root}`}
                  index={indexChecker(main.path)}
                  path={indexChecker(main.path) ? "/" : main.root}
                  element={<main.page />}
                />
              )
            );
          })}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterOutlet;
