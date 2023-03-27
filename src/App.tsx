//  Lib
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
//  Router
import RouterOutlet from "@router/RouterOutlet";
//  Style
import { createTheme } from "@styles/theme/index";
//  State
import { atomThemeColor } from "@states/theme/themeState";
import { NaverMapProvider } from "@src/lib/src";

const App = () => {
  const currentTheme = useRecoilValue(atomThemeColor);
  const theme = useMemo(() => {
    return createTheme(currentTheme);
  }, [currentTheme]);

  return (
    <BrowserRouter>
      <NaverMapProvider>
        <ChakraProvider theme={theme} resetCSS={true}>
          <RouterOutlet />
        </ChakraProvider>
      </NaverMapProvider>
    </BrowserRouter>
  );
};

export default App;
