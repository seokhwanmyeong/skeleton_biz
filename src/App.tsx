//  Lib
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
//  Router
import RouterOutlet from "@router/RouterOutlet";
//  Style
import { createTheme } from "@styles/theme/index";
//  State
import { atomThemeColor } from "./states/theme/themeState";

const App = () => {
  const currentTheme = useRecoilValue(atomThemeColor);
  const theme = useMemo(() => {
    return createTheme(currentTheme);
  }, [currentTheme]);

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <BrowserRouter>
        <RouterOutlet />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
