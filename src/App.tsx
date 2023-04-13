//  Lib
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
//  Router
import RouterOutlet from "@router/RouterOutlet";
//  State
import { atomThemeColor } from "@states/theme/stateTheme";
import { NaverMapProvider } from "@src/lib/src";
//  Style
import { createTheme } from "@styles/theme/index";
import "@fontsource/roboto/latin.css";
import "@fontsource/noto-sans-kr/korean.css";

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
