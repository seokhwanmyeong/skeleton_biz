//  Lib
import { useLocation } from "react-router-dom";

const useLocationState = () => {
  const location = useLocation();
  const rootState = location.pathname.split("/")[1] ?? "/";

  return {
    location: location,
    rootState: rootState,
    pathState: location.pathname,
  };
};

export default useLocationState;
