// Lib
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { CubeProvider } from "@cubejs-client/react";
//  Style
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
// Components
import App from "@src/App";
//  API
import cubejsApi from "@api/cubeApi/config";
//  Util
import DebugObserver from "@util/debug/DebugObserver";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <CubeProvider cubejsApi={cubejsApi}>
        <App />
      </CubeProvider>
    </RecoilRoot>
  </StrictMode>
);
