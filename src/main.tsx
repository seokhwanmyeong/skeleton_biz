// Lib
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
// Components
import App from "@src/App";
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
