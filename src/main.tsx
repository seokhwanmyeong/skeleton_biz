// Lib
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { CubeProvider } from "@cubejs-client/react";
// Components
import App from "@src/App";
//  API
import cubejsApi from "@api/cubeApi/config";
//  Util
import DebugObserver from "@util/debug/DebugObserver";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <DebugObserver />
    <CubeProvider cubejsApi={cubejsApi}>
      <App />
    </CubeProvider>
  </RecoilRoot>
  //   <StrictMode>
  // </StrictMode>
);
