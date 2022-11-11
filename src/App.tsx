// Lib
import { BrowserRouter } from "react-router-dom";
// Router
import RouterOutlet from "./router/RouterOutlet";

const App = () => {
  return (
    <BrowserRouter>
      <RouterOutlet />
    </BrowserRouter>
  );
};

export default App;
