// Lib
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import {
  ChakraProvider as ThemeProvider,
  ColorModeScript,
} from "@chakra-ui/react";
// Components
import App from "@src/App";
// Style
import theme from "@styles/theme/index";
//  Util
import DebugObserver from "@util/debug/DebugObserver";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme} resetCSS={true}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RecoilRoot>
        <DebugObserver />
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>
);
