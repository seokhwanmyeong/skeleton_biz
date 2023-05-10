//  Lib
import { useContext, useEffect } from "react";
import { NaverMapContext } from "@src/lib/src";
//  Components
import DrawBox from "@components/sementicMapLayer/boxDraw/DrawBox";

const MapFlowFind = () => {
  const { state } = useContext(NaverMapContext);

  useEffect(() => {
    state.map?.setOptions({
      minZoom: 0,
      maxZoom: 22,
    });
  }, []);

  return <DrawBox />;
};

export default MapFlowFind;
