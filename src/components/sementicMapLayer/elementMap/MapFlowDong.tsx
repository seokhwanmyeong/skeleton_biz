//  Lib
import { useContext, useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
import DongPanel from "./DongPanel";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { atomSlctDong } from "@states/sementicMap/stateMap";

type Props = {};

const MapFlowDong = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);

  useEffect(() => {
    if (dong.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 16,
        scrollWheel: true,
        draggable: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });
      state.map?.fitBounds(dong.slctPath[0]);

      let curZoom = state.map?.getZoom();

      if (curZoom) {
        state.map?.setZoom(curZoom);
        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: 16,
        });
      }
    }
  }, []);

  const dongTopData = useMemo(() => {
    return dong.slctData || [];
  }, [dong]);

  return (
    <>
      <InteractArea
        key={dong.name}
        setClickable={false}
        name={dong.slctName}
        num={dong.slctCode}
        path={dong.slctPath}
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
      {/* {dongTopData ? (
        <DongPanel
          range={range}
          dong={dong}
          center={center}
          zoom={curZoom}
          // onClickArea={test}
        />
      ) : null} */}
    </>
  );
};

export default MapFlowDong;
