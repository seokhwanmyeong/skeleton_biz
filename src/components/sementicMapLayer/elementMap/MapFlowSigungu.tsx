//  Lib
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import GuPanel from "./GuPanel";
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow, dataCollector } from "@states/sementicMap/stateFilter";
import {
  atomDongLi,
  atomFlowEnterArea,
  atomSlctDong,
} from "@states/sementicMap/stateMap";

type Props = {};

const MapFlowSigungu = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dongli = useRecoilValue(atomDongLi);
  const setDong = useSetRecoilState(atomSlctDong);
  const [slctDong, setSlctDong] = useState(-1);
  const filterData = useRecoilValue(dataCollector);
  const [range, setRange] = useState({
    latMax: 0,
    latMin: 0,
    lngMax: 0,
    lngMin: 0,
  });

  const getCenterPath = (path: any) => {
    const length = path.length;
    let xcos = 0;
    let ycos = 0;
    let area = 0;

    for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
      let p1 = path[i];
      let p2 = path[j];

      let f = p1.y * p2.x - p2.y * p1.x;
      xcos += (p1.x + p2.x) * f;
      ycos += (p1.y + p2.y) * f;
      area += f * 3;
    }
    return {
      center: [xcos / area, ycos / area],
    };
  };

  useEffect(() => {
    if (sigungu?.slctCode && sigungu?.slctName && sigungu?.slctPath) {
      state.map?.fitBounds(sigungu.slctPath[0]);

      let latLngRange = {
        latMax: 0,
        latMin: 0,
        lngMax: 0,
        lngMin: 0,
      };

      sigungu.slctPath[0].map((lngLat: any) => {
        if (lngLat[1] > latLngRange.latMax || latLngRange.latMax === 0) {
          latLngRange.latMax = lngLat[1];
        } else if (lngLat[1] < latLngRange.latMin || latLngRange.latMin === 0) {
          latLngRange.latMin = lngLat[1];
        }

        if (lngLat[0] > latLngRange.lngMax || latLngRange.lngMax === 0) {
          latLngRange.lngMax = lngLat[0];
        } else if (lngLat[0] < latLngRange.lngMin || latLngRange.lngMin === 0) {
          latLngRange.lngMin = lngLat[0];
        }
      });

      setRange(latLngRange);
    }
  }, [sigungu]);

  const onClickArea = (areaIdx: number) => {
    setDong({
      slctName: dongli[areaIdx].name,
      slctCode: dongli[areaIdx].code,
      slctIdx: `area${dongli[areaIdx].code}`,
      slctPath: dongli[areaIdx].path,
      slctData: filterData || [],
      slctRank: areaIdx,
    });
    setFlow("dong");
  };

  return (
    <>
      {dongli.length !== 0 &&
        dongli.map(
          (
            dong: {
              name: string;
              code: string;
              num: number;
              path: never[];
            },
            idx: number
          ) => {
            return (
              <InteractArea
                key={dong.name}
                onClick={() => {
                  setDong({
                    slctName: dong.name,
                    slctCode: dong.code,
                    slctIdx: `area${dong.code}`,
                    slctNum: idx,
                    slctPath: dong.path,
                    slctData: filterData || [],
                    slctRank: idx,
                  });
                  setFlow("dong");
                }}
                onMouse={() => {
                  setSlctDong(idx);
                }}
                onMouseOut={() => {
                  setSlctDong(-1);
                }}
                name={dong.name}
                num={idx}
                path={dong.path}
                style={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.35,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          }
        )}
      {sigungu && dongli.length !== 0 ? (
        <GuPanel
          range={range}
          dongList={dongli}
          onClickArea={onClickArea}
          selectDong={slctDong}
        />
      ) : null}
    </>
  );
};

export default MapFlowSigungu;
