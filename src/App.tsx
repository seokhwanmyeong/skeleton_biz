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

const App = () => {
  const currentTheme = useRecoilValue(atomThemeColor);
  const theme = useMemo(() => {
    return createTheme(currentTheme);
  }, [currentTheme]);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS={true}>
        <RouterOutlet />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
