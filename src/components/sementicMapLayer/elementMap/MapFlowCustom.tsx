//  Lib
import { useContext, useEffect, useCallback, Fragment, useRef } from "react";
import { useRecoilValue } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Components
import InteractArea from "./InteractArea";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { infoComFlowDepth } from "@src/states/sementicMap/stateFilter";
//  Util
import { lvHandler, searchRange } from "@util/define/map";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import { flowColor } from "@src/util/define/map";
import { apiMapNice } from "@src/api/bizSub/config";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowCustom = () => {
  const { getFlowPop } = apiMapNice;
  const { state } = useContext(NaverMapContext);
  const customArea = useRecoilValue(atomSlctCustom);
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
    if (!state.map || !state.objects || !flowActive) return;

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
        const center = state.map.getCenter();

        getFlowPop({
          upjongCd: "Q01005",
          wkt: [[transBounds]],
        })
          .then((res: any) => {
            if (res.data) {
              const markerLi: any[] = [];
              const obj: any = state.objects.get("customArea");
              const objBounds = obj.getBounds();
              const circle = new naver.maps.Circle({
                map: state.map,
                center: center,
                radius: searchRange[zoom],
              });
              const circleBounds: any = circle.getBounds();
              res.data.map((list: any) => {
                list.map((li: TypeNiceFlowData) => {
                  const { flowPop, xAxis, yAxis } = li;
                  const point = new naver.maps.LatLng(yAxis, xAxis);

                  if (
                    objBounds.hasLatLng(point) &&
                    circleBounds.hasLatLng(point)
                  ) {
                    const lv = lvHandler(flowPop);

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

              res.data.map((list: any) => {
                list.map((li: TypeNiceFlowData) => {
                  const { flowPop, xAxis, yAxis } = li;
                  const point = new naver.maps.LatLng(yAxis, xAxis);

                  if (
                    objBounds.hasLatLng(point) &&
                    circleBounds.hasLatLng(point)
                  ) {
                    const lv = lvHandler(flowPop);

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
                  } else {
                    return null;
                  }
                });
              });

              circle.setMap(null);
              resetRef();
              flowPoint.current = markerLi;
            }
          })
          .catch(() => {
            resetRef();
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

            if (e) {
              transBounds.push([e._max.x, e._max.y]);
              transBounds.push([e._min.x, e._max.y]);
              transBounds.push([e._min.x, e._min.y]);
              transBounds.push([e._max.x, e._min.y]);
              transBounds.push([e._max.x, e._max.y]);
              const center = state.map.getCenter();

              getFlowPop({
                upjongCd: "Q01005",
                wkt: [[transBounds]],
              })
                .then((res: any) => {
                  if (res.data) {
                    const markerLi: any[] = [];
                    const obj: any = state.objects.get("customArea");
                    const objBounds = obj.getBounds();
                    const circle = new naver.maps.Circle({
                      map: state.map,
                      center: center,
                      radius: searchRange[zoom],
                    });
                    const circleBounds: any = circle.getBounds();

                    res.data.map((list: any) => {
                      list.map((li: TypeNiceFlowData) => {
                        const { flowPop, xAxis, yAxis } = li;
                        const point = new naver.maps.LatLng(yAxis, xAxis);

                        if (
                          objBounds.hasLatLng(point) &&
                          circleBounds.hasLatLng(point)
                        ) {
                          const lv = lvHandler(flowPop);

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
                })
                .catch(() => {
                  resetRef();
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
    if (state?.map && customArea && customArea?.slctPath) {
      if (customArea.pathType === "circle") {
        state.map.fitBounds(customArea?.slctPath);
      } else {
        state.map.fitBounds(customArea?.slctPath);
      }
    }
  }, [customArea, state]);

  return (
    <Fragment>
      {customArea.pathType === "circle" ? (
        <Circle
          id={"customArea"}
          opts={{
            radius: customArea.range,
            center: customArea.center,
            fillColor: "#36CFC9",
            fillOpacity: 0.2,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
          }}
        />
      ) : (
        <InteractArea
          key={"customArea"}
          id={"customArea"}
          setClickable={false}
          name={customArea.slctName}
          num={0}
          path={customArea.slctPath || []}
          style={{
            fillColor: "#36CFC9",
            fillOpacity: 0.2,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
          }}
        />
      )}
    </Fragment>
  );
};

export default MapFlowCustom;
