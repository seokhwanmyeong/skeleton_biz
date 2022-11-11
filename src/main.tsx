// Lib
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import {
  ChakraProvider as ThemeProvider,
  ColorModeScript,
} from "@chakra-ui/react";
// Components
import App from "./App";
// Style
import theme from "./styles/theme/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme} resetCSS={true}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>
);
