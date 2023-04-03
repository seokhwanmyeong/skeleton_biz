//  Lib
import { useContext, useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
import DongPanel from "./DongPanel";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomSlctDong } from "@states/sementicMap/mapState";

type Props = {};

const MapFlowCustom = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const dong = useRecoilValue(atomSlctDong);
  const [center, setCenter] = useState<any>(null);
  const [curZoom, setCurZoom] = useState(16);
  const [range, setRange] = useState({
    xMax: 0,
    xMin: 0,
    yMax: 0,
    yMin: 0,
  });

  useEffect(() => {
    if (dong.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 16,
      });
      state.map?.fitBounds(dong.slctPath);

      let curZoom = state.map?.getZoom();

      if (curZoom) {
        state.map?.setZoom(curZoom);
        setCurZoom(curZoom);

        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: curZoom,
        });
      }

      let xyRange = {
        xMax: 0,
        xMin: 0,
        yMax: 0,
        yMin: 0,
      };

      dong.slctPath.map((xy: any) => {
        if (xy.x > xyRange.xMax || xyRange.xMax === 0) {
          xyRange.xMax = xy.x;
        } else if (xy.x < xyRange.xMin || xyRange.xMin === 0) {
          xyRange.xMin = xy.x;
        }

        if (xy.y > xyRange.yMax || xyRange.yMax === 0) {
          xyRange.yMax = xy.y;
        } else if (xy.y < xyRange.yMin || xyRange.yMin === 0) {
          xyRange.yMin = xy.y;
        }
      });
      setRange(xyRange);

      const curCenter = state.map?.getCenter();

      if (curCenter) {
        setCenter([curCenter.x, curCenter.y]);
      }
    }
  }, [dong]);

  const dongTopData = useMemo(() => {
    return dong.slctData || [];
  }, [dong]);

  return (
    <>
      <InteractArea
        key={dong.name}
        onClick={(val) => {
          console.log("click");
        }}
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
      {dongTopData ? (
        <DongPanel
          range={range}
          dong={dong}
          center={center}
          zoom={curZoom}
          // onClickArea={test}
        />
      ) : null}
    </>
  );
};

export default MapFlowCustom;
