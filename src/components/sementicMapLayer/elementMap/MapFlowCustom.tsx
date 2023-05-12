//  Lib
import { useContext, useEffect, useState, memo, Fragment, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Marker, NaverMapContext } from "@src/lib/src";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Components
import InteractArea from "./InteractArea";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { infoComFlowDepth } from "@src/states/sementicMap/stateFilter";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import { flowColor } from "@src/util/define/map";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowCustom = () => {
  const { state } = useContext(NaverMapContext);
  const cutomArea = useRecoilValue(atomSlctCustom);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const [flowData, setFlowData] = useState<TypePoint[] | null>([]);
  const [circleOP, setCircleOP] = useState({});
  const [curZoom, setCurZoom] = useState(16);
  const markerFlow = useRef<any[] | null>(null);

  useEffect(() => {
    if (!state.map) return;

    if (flowList.length > 0 && flowShow && flowActive) {
      if (markerFlow.current && markerFlow.current.length > 0) {
        markerFlow.current.map((marker: any) => marker.setMap(null));
        markerFlow.current = [];
      }
      const markerLi: any[] = [];

      flowList.map((list: any) => {
        list.map((li: TypeNiceFlowData) => {
          const { flowPop, xAxis, yAxis } = li;
          const lv =
            flowPop >= 18000
              ? 1
              : flowPop < 18000 && flowPop >= 13000
              ? 2
              : flowPop < 13000 && flowPop >= 10000
              ? 3
              : flowPop < 10000 && flowPop >= 6000
              ? 4
              : 5;

          const marker = new naver.maps.Marker({
            map: state.map,
            position: new naver.maps.LatLng(yAxis, xAxis),
            icon: {
              content: `<div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${flowColor[lv]}"/>`,
              size: new naver.maps.Size(6, 6),
              anchor: new naver.maps.Point(3, 3),
            },
          });

          markerLi.push(marker);
        });
      });

      markerFlow.current = markerLi;
    } else {
      if (markerFlow.current && markerFlow.current.length > 0) {
        markerFlow.current.map((marker: any) => marker.setMap(null));
        markerFlow.current = [];
      }
    }

    return () => {
      if (markerFlow.current && markerFlow.current.length > 0) {
        markerFlow.current.map((marker: any) => marker.setMap(null));
        markerFlow.current = [];
      }
    };
  }, [flowList, flowShow, flowActive, state.map]);

  // useEffect(() => {
  //   if (flowList.length > 0) {
  //     const point: TypePoint[] = [];

  //     flowList.map((list: any, idx: number) => {
  //       list.map((li: TypeNiceFlowData, depthIdx: number) => {
  //         const { flowLv, xAxis, yAxis } = li;
  //         point.push({
  //           lv: flowLv,
  //           point: [yAxis, xAxis],
  //         });
  //       });
  //     });
  //     setFlowData(point);
  //   } else {
  //     setFlowData([]);
  //   }

  //   return () => {
  //     setFlowData(null);
  //   };
  // }, [flowList]);

  useEffect(() => {
    if (cutomArea.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 22,
      });

      state.map?.fitBounds(cutomArea.slctPath);

      let curZoom = state.map?.getZoom();

      if (curZoom) {
        state.map?.setZoom(curZoom);
        setCurZoom(curZoom);

        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: 22,
        });
      }
    }
  }, [cutomArea]);

  return (
    <Fragment>
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
          path={cutomArea.slctPath || []}
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
    </Fragment>
  );
};

export default MapFlowCustom;
