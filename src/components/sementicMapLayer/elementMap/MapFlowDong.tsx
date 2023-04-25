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
import sample from "@src/util/data/sampleBuilding";

type Props = {};

const MapFlowDong = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);

  useEffect(() => {
    if (dong.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 22,
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
          maxZoom: 22,
        });
      }
    }
  }, []);

  const dongTopData = useMemo(() => {
    return dong.slctData || [];
  }, [dong]);

  const [sampleData, setSampleData] = useState<any>([]);

  const createPolyHandler = (coordinates: any) => {
    return coordinates[0].map((coordinate: any) => {
      return coordinate.map((arr: any) => {
        return new naver.maps.LatLng(arr[1], arr[0]);
      });
    });
  };

  useEffect(() => {
    console.log(sampleData.length);
    let bCnt = 0;
    let polyList: any[] = [];

    sampleData.map((data: any, idx: number) => {
      if (!data?.buildings || data?.buildings?.length === 0) return;
      const buildings = data?.buildings;
      bCnt += buildings.length;

      if (buildings.length > 1) {
        const test = buildings.map((b: any) => {
          if (b.geometry) {
            const coordinates = b.geometry.coordinates;
            const path = createPolyHandler(coordinates);
            const poly = new naver.maps.Polygon({
              map: state.map,
              paths: path,
              fillColor: "#36CFC9",
              fillOpacity: 0.75,
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.6,
              strokeWeight: 1,
            });
            polyList.push(poly);
          }
        });
      } else {
        if (buildings[0].geometry) {
          const coordinates = buildings[0].geometry.coordinates;
          const path = createPolyHandler(coordinates);
          const poly = new naver.maps.Polygon({
            map: state.map,
            paths: path,
            fillColor: "#36CFC9",
            fillOpacity: 0.75,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.6,
            strokeWeight: 1,
          });
          polyList.push(poly);
        }
      }
    });

    console.log(bCnt);
    console.log(polyList);
  }, [sampleData]);

  useEffect(() => {
    setSampleData(sample);
  }, []);

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
