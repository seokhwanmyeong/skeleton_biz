//  Lib
import { useContext, useEffect, useRef, useCallback } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  state
import { infoComFlowDepth } from "@states/sementicMap/stateFilter";
import { atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Api
import { apiMapNice } from "@api/bizSub/config";
//  Util
import { flowColor, lvHandler } from "@util/define/map";
import { searchRange } from "@util/define/map";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowDong = () => {
  const { getFlowPop } = apiMapNice;
  const { state } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const resetSv = useResetRecoilState(sementicViewState);
  const geoRef = useRef<any | null>(null);
  const flowPoint = useRef<TypePoint[] | null>(null);

  const resetRef = useCallback(() => {
    if (state.map && flowPoint.current && flowPoint.current.length > 0) {
      flowPoint.current.map((point: any) => point.setMap(null));
      flowPoint.current = null;
    }
  }, [state, flowShow, flowActive]);

  useEffect(() => {
    if (!state?.map || !flowActive || !dong?.slctPath) return;

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
            if (
              res.data &&
              res.data.length > 0 &&
              state?.map &&
              dong?.slctId !== undefined
            ) {
              const markerLi: any[] = [];
              const obj = state.map.data.getFeatureById(dong.slctId);
              const objBounds: any = obj.getBounds();
              const circle = new naver.maps.Circle({
                map: state.map,
                center: center,
                radius: searchRange[zoom],
              });
              const circleBounds: any = circle.getBounds();

              res.data.map((list: any) => {
                list.map((li: TypeNiceFlowData) => {
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
                  if (
                    res.data &&
                    res.data.length > 0 &&
                    state?.map &&
                    dong?.slctId !== undefined
                  ) {
                    const markerLi: any[] = [];
                    const obj = state.map.data.getFeatureById(dong.slctId);
                    const objBounds: any = obj.getBounds();
                    const circle = new naver.maps.Circle({
                      map: state.map,
                      center: center,
                      radius: searchRange[zoom],
                    });
                    const circleBounds: any = circle.getBounds();

                    res.data.map((list: any) => {
                      list.map((li: TypeNiceFlowData) => {
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
  }, [flowList, flowShow, flowActive, state.map, dong]);

  useEffect(() => {
    if (dong.slctPath && state.map) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 22,
        scrollWheel: true,
        draggable: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });

      if (geoRef.current) {
        state.map?.data.removeGeoJson(geoRef.current);
      }
      console.log(dong.slctPath);
      const feature: any = {
        ...dong.slctPath,
        id: dong.slctId,
      };
      // @ts-ignore
      state.map.data.addGeoJson(feature);

      state.map.data.setStyle({
        fillColor: "#36CFC9",
        fillOpacity: 0.2,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.5,
      });

      geoRef.current = feature;

      const bounds = dong.slctBounds;
      if (bounds && bounds.length > 0) {
        const transLatLng = bounds.map(
          (li) => new naver.maps.LatLng(li[0], li[1])
        );
        // @ts-ignore
        const latLngB = new naver.maps.LatLngBounds(...transLatLng);
        state.map.fitBounds(latLngB);
        if (dong.slctLat && dong.slctLng) {
          state.map?.setCenter(
            new naver.maps.LatLng(dong.slctLat, dong.slctLng)
          );
        }
        const zoom = state.map.getZoom();
        state.map?.setZoom(zoom - 1);
      } else {
        dong.slctLat &&
          dong.slctLng &&
          state.map?.setCenter(
            new naver.maps.LatLng(dong.slctLat, dong.slctLng)
          );
        dong.slctZoom && state.map?.setZoom(Number(dong.slctZoom));
      }
    }

    return () => {
      resetSv();
      if (state.map && geoRef.current) {
        state.map?.data.removeGeoJson(geoRef.current);
      }
    };
  }, [state.map, dong]);

  return null;
};

export default MapFlowDong;
