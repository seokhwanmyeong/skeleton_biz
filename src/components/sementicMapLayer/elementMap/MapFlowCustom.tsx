//  Lib
import { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Components
import InteractArea from "./InteractArea";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";

type Props = {};

const MapFlowCustom = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const cutomArea = useRecoilValue(atomSlctCustom);
  const [circleOP, setCircleOP] = useState({});
  const [curZoom, setCurZoom] = useState(16);

  useEffect(() => {
    if (cutomArea.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 16,
      });

      state.map?.fitBounds(cutomArea.slctPath);

      let curZoom = state.map?.getZoom();

      if (curZoom) {
        state.map?.setZoom(curZoom);
        setCurZoom(curZoom);

        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: 16,
        });
      }
    }
  }, [cutomArea]);

  return (
    <>
      {cutomArea.pathType === "circle" ? (
        <Circle
          opts={{
            radius: cutomArea.range,
            center: cutomArea.center,
            fillColor: "#fadb14",
            fillOpacity: 0.3,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
          }}
        />
      ) : (
        <InteractArea
          key={"customArea"}
          setClickable={false}
          name={cutomArea.slctName}
          num={0}
          path={cutomArea.slctPath}
          style={{
            fillColor: "#fadb14",
            fillOpacity: 0.3,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
          }}
          hoverStyle={{
            fillColor: "#fadb14",
            fillOpacity: 0.4,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
          }}
        />
      )}
    </>
  );
};

export default MapFlowCustom;
