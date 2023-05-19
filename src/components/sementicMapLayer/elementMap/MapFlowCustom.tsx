//  Lib
import {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import { useRecoilValue } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Components
import InteractArea from "./InteractArea";
//  Api
import { apiMapNice } from "@api/bizSub/config";
//  State
import { atomSlctCustom } from "@states/sementicMap/stateMap";
import { infoComFlowDepth } from "@src/states/sementicMap/stateFilter";
//  Util
import { lvHandler, searchRange, flowColor, flowSize } from "@util/define/map";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import { BaseSpinner } from "@src/components/common/Spinner";
import { Portal } from "@chakra-ui/react";

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
  const [isLoading, setLoading] = useState(false);
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

    if (zoom >= 16 && flowActive && flowShow) {
      setLoading(true);
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
              const circle = new naver.maps.Circle({
                map: state.map,
                center: center,
                radius: searchRange[zoom],
              });
              const circleBounds: any = circle.getBounds();
              const tmp: any[] = [];
              const arr: any[] = [];
              let obj: any;
              let objBounds: any;

              if (customArea.enterPath === "custom") {
                obj = state.objects.get("customArea");
                objBounds = obj.getBounds();
              } else if (customArea.enterPath === "erp") {
                if (customArea.areaType === "polygon" && customArea.slctPath) {
                  objBounds = new naver.maps.LatLngBounds(
                    // @ts-ignore
                    customArea.slctPath
                  );
                } else if (customArea.areaType === "circle") {
                  objBounds = customArea.slctPath;
                }
              }

              if (!objBounds) {
                objBounds = state.map?.getBounds();
              }

              res.data.map((list: any) => {
                list.map((li: TypeNiceFlowData) => {
                  tmp.push(li);
                });
              });

              tmp.sort((x, y) => x.xAxis + x.yAxis - (y.xAxis + y.yAxis));

              const divide =
                zoom === 16 ? 6 : zoom === 16 ? 5 : zoom === 17 ? 4 : 3;
              for (let i = 0; i < tmp.length; i++) {
                if (i % divide === 0) {
                  arr.push(tmp[i]);
                }
              }

              arr.map((li: TypeNiceFlowData) => {
                const { flowPop, xAxis, yAxis } = li;

                if (
                  objBounds._max.x > xAxis &&
                  circleBounds._max.x > xAxis &&
                  objBounds._min.x < xAxis &&
                  circleBounds._min.x < xAxis &&
                  objBounds._max.y > yAxis &&
                  circleBounds._max.y > yAxis &&
                  objBounds._min.y < yAxis &&
                  circleBounds._min.y < yAxis
                ) {
                  const lv = lvHandler(flowPop);

                  const marker = new naver.maps.Marker({
                    map: state.map,
                    position: new naver.maps.LatLng(yAxis, xAxis),
                    icon: {
                      content: `<div style="width: ${
                        flowSize[zoom] || flowSize[19]
                      }px; height: ${
                        flowSize[zoom] || flowSize[19]
                      }px; border-radius: 50%; background-color: ${
                        flowColor[lv]
                      }"/>`,
                      size: new naver.maps.Size(6, 6),
                      anchor: new naver.maps.Point(3, 3),
                    },
                  });

                  markerLi.push(marker);
                }
              });

              circle.setMap(null);
              setLoading(false);
              resetRef();
              flowPoint.current = markerLi;
            } else {
              setLoading(false);
            }
          })
          .catch(() => {
            resetRef();
            setLoading(false);
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

          if (zoom < 16) {
            resetRef();
            return;
          } else if (zoom >= 16) {
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
                    const circle = new naver.maps.Circle({
                      map: state.map,
                      center: center,
                      radius: searchRange[zoom],
                    });
                    const circleBounds: any = circle.getBounds();
                    const tmp: any[] = [];
                    const arr: any[] = [];
                    let obj: any;
                    let objBounds: any;

                    if (customArea.enterPath === "custom") {
                      obj = state.objects.get("customArea");
                      objBounds = obj.getBounds();
                    } else if (customArea.enterPath === "erp") {
                      if (
                        customArea.areaType === "polygon" &&
                        customArea.slctPath
                      ) {
                        objBounds = new naver.maps.LatLngBounds(
                          // @ts-ignore
                          customArea.slctPath
                        );
                      } else if (customArea.areaType === "circle") {
                        objBounds = customArea.slctPath;
                      }
                    }

                    if (!objBounds) {
                      objBounds = state.map?.getBounds();
                    }

                    res.data.map((list: any) => {
                      list.map((li: TypeNiceFlowData) => {
                        tmp.push(li);
                      });
                    });

                    tmp.sort((x, y) => x.xAxis + x.yAxis - (y.xAxis + y.yAxis));

                    const divide =
                      zoom === 16 ? 6 : zoom === 16 ? 5 : zoom === 17 ? 4 : 3;
                    for (let i = 0; i < tmp.length; i++) {
                      if (i % divide === 0) {
                        arr.push(tmp[i]);
                      }
                    }

                    arr.map((li: TypeNiceFlowData) => {
                      const { flowPop, xAxis, yAxis } = li;

                      if (
                        objBounds._max.x > xAxis &&
                        circleBounds._max.x > xAxis &&
                        objBounds._min.x < xAxis &&
                        circleBounds._min.x < xAxis &&
                        objBounds._max.y > yAxis &&
                        circleBounds._max.y > yAxis &&
                        objBounds._min.y < yAxis &&
                        circleBounds._min.y < yAxis
                      ) {
                        const lv = lvHandler(flowPop);

                        const marker = new naver.maps.Marker({
                          map: state.map,
                          position: new naver.maps.LatLng(yAxis, xAxis),
                          icon: {
                            content: `<div style="width: ${
                              flowSize[zoom] || flowSize[19]
                            }px; height: ${
                              flowSize[zoom] || flowSize[19]
                            }px; border-radius: 50%; background-color: ${
                              flowColor[lv]
                            }"/>`,
                            size: new naver.maps.Size(6, 6),
                            anchor: new naver.maps.Point(3, 3),
                          },
                        });

                        markerLi.push(marker);
                      }
                    });

                    console.log(markerLi);
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
        }, 700);
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
      {isLoading && (
        <Portal appendToParentPortal={true}>
          <BaseSpinner zIndex={999} />
        </Portal>
      )}
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
