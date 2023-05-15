//  Lib
import {
  useContext,
  useEffect,
  useCallback,
  memo,
  Fragment,
  useRef,
} from "react";
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
import { apiMapNice } from "@src/api/bizSub/config";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowCustom = () => {
  const { getFlowPop } = apiMapNice;
  const { state } = useContext(NaverMapContext);
  const cutomArea = useRecoilValue(atomSlctCustom);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const flowPoint = useRef<TypePoint[] | null>(null);

  const resetRef = useCallback(() => {
    if (state.map && flowPoint.current && flowPoint.current.length > 0) {
      flowPoint.current.map((point: any) => point.setMap(null));
      flowPoint.current = null;
    }
  }, [state, flowShow, flowActive, flowPoint?.current]);

  useEffect(() => {
    if (!state.map || !state.objects) return;

    let zoom = state.map?.getZoom() || 0;
    resetRef();

    if (zoom >= 17 && flowActive && flowShow) {
      const bounds: any = state.map.getBounds();
      const transBounds: any[] = [];

      if (bounds) {
        transBounds.push([bounds._max.x, bounds._max.y]);
        transBounds.push([bounds._min.x, bounds._max.y]);
        transBounds.push([bounds._min.x, bounds._min.y]);
        transBounds.push([bounds._max.x, bounds._min.y]);
        transBounds.push([bounds._max.x, bounds._max.y]);

        getFlowPop({
          upjongCd: "Q01005",
          wkt: [[transBounds]],
        }).then((res: any) => {
          if (res.data && res.data.length > 0) {
            const markerLi: any[] = [];
            const obj = state.objects.get("customArea");
            res.data.map((list: any) => {
              list.map((li: TypeNiceFlowData) => {
                const { flowPop, xAxis, yAxis } = li;
                if (obj) {
                  const point = new naver.maps.LatLng(yAxis, xAxis);
                  // @ts-ignore
                  const objBounds = obj.getBounds();

                  if (!objBounds.hasLatLng(point)) return;
                }
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

            flowPoint.current = markerLi;
          }
        });
      }
    }

    let timer: any;
    const zoomEvent = naver.maps.Event.addListener(
      state.map,
      "bounds_changed",
      (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          if (!state.map || !flowActive || !flowShow) {
            return;
          }
          let zoom = state.map?.getZoom() || 0;

          if (zoom < 17) {
            resetRef();
            return;
          } else if (zoom >= 17) {
            if (!state.map) return;
            const transBounds: any[] = [];
            const test: { [x: number]: number } = {
              16: 500,
              17: 250,
              18: 150,
              19: 100,
            };

            if (e) {
              transBounds.push([e._max.x, e._max.y]);
              transBounds.push([e._min.x, e._max.y]);
              transBounds.push([e._min.x, e._min.y]);
              transBounds.push([e._max.x, e._min.y]);
              transBounds.push([e._max.x, e._max.y]);
              const center = state.map.getCenter();

              getFlowPop({
                upjongCd: "Q01005",
                range: test[zoom],
                xAxis: center.x,
                yAxis: center.y,
                // wkt: [[transBounds]],
              }).then((res: any) => {
                if (res.data) {
                  const markerLi: any[] = [];
                  const obj = state.objects.get("customArea");
                  const circle = new naver.maps.Circle({
                    map: state.map,
                    center: center,
                    radius: test[zoom],
                  });

                  res.data.map((list: any) => {
                    list.map((li: TypeNiceFlowData, idx: number) => {
                      const { flowPop, xAxis, yAxis } = li;
                      if (
                        xAxis < e._max.x &&
                        xAxis > e._min.x &&
                        yAxis < e._max.y &&
                        yAxis > e._min.y
                      ) {
                        if (obj) {
                          const point = new naver.maps.LatLng(yAxis, xAxis);
                          const objBounds = circle.getBounds();

                          // @ts-ignore
                          if (!objBounds.hasLatLng(point)) return;
                        }
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
                      }
                    });
                  });

                  circle.setMap(null);
                  resetRef();
                  flowPoint.current = markerLi;
                }
              });
            }
          }
        }, 500);
      }
    );

    return () => {
      naver.maps.Event.removeListener(zoomEvent);
      resetRef();
    };
  }, [flowList, flowShow, flowActive, state.map]);

  useEffect(() => {
    if (!state.map) return;
    console.log(state.objects);
  }, [cutomArea, state.map]);

  return (
    <Fragment>
      {cutomArea.pathType === "circle" ? (
        <Circle
          id={"customArea"}
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
          id={"customArea"}
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
