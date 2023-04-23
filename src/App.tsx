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
import "@fontsource/oxanium/300.css";
import "@fontsource/oxanium/400.css";
import "@fontsource/oxanium/500.css";
import "@fontsource/oxanium/600.css";
import "@fontsource/oxanium/700.css";
import "@fontsource/oxanium/800.css";

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
