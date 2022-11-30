// Lib
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// Components
import App from "@src/App";
// Style
import { theme } from "@styles/theme/index";
//  Util
import DebugObserver from "@util/debug/DebugObserver";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </StrictMode>
);
