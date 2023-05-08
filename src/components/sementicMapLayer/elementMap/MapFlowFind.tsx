//  Lib
import { useContext, useEffect, Fragment } from "react";
import { NaverMapContext } from "@src/lib/src";
//  Components
import DrawBox from "@components/sementicMapLayer/drawBox/DrawBox";

const MapFlowFind = () => {
  const { state } = useContext(NaverMapContext);

  useEffect(() => {
    state.map?.setOptions({
      minZoom: 0,
      maxZoom: 22,
    });
  }, []);

  return (
    <Fragment>
      <DrawBox />
    </Fragment>
  );
};

export default MapFlowFind;
