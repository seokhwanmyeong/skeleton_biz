//  Lib
import React, { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomSlctDong } from "@states/sementicMap/mapState";

type Props = {};

const MapFlowDong = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [dong, setDong] = useRecoilState(atomSlctDong);

  useEffect(() => {
    state.map?.setOptions({
      minZoom: 0,
      maxZoom: 16,
    });
    state.map?.fitBounds(dong.slctPath);

    let curZoom = state.map?.getZoom();

    state.map?.setOptions({
      minZoom: curZoom,
      maxZoom: curZoom,
    });
  }, []);

  return (
    <>
      <InteractArea
        key={dong.name}
        onClick={(val) => {
          console.log("click");
          setDong({
            slctName: dong.slctName,
            slctCode: dong.slctCode,
            slctIdx: `area${dong.slctCode}`,
            slctPath: dong.path,
          });
          setFlow(2);
        }}
        name={dong.slctName}
        num={Number(dong.slctCode)}
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
    </>
  );
};

export default MapFlowDong;
