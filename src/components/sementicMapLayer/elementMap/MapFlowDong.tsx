//  Lib
import {
  useContext,
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import { BoxRankingDong } from "@components/sementicMapLayer/elementFilter/BoxRanking";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthListBox from "@components/sementicMapLayer/elementFilter/DepthListBox";
//  state
import {
  infoComBrand,
  infoComBuilding,
  infoComFlowDepth,
  infoComNiceRank,
} from "@states/sementicMap/stateFilter";
import { atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Api
import { apiMapNice } from "@api/bizSub/config";
//  Util
import { flowColor } from "@util/define/map";
//  Icon
import { Flex } from "@chakra-ui/react";
//  Deco
import {
  DecoFrameL,
  DecoFrameR,
  BoxCenterFrameLeft,
  BoxCenterFrameRight,
} from "@components/sementicMapLayer/elementDeco/DecoCenter";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import type { RankType } from "@states/sementicMap/stateFilter";

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
  const {
    show: brandShow,
    active: brandActive,
    data: brandList,
  } = useRecoilValue(infoComBrand);
  const {
    show: buildShow,
    active: buildActive,
    fitler: buildFilter,
    data: buildList,
  } = useRecoilValue(infoComBuilding);
  const rankList = useRecoilValue(infoComNiceRank);
  const resetSv = useResetRecoilState(sementicViewState);
  const [dongRank, setDongRank] = useState<RankType | null>(null);
  const geoRef = useRef<any | null>(null);
  const flowPoint = useRef<TypePoint[] | null>(null);

  const resetRef = useCallback(() => {
    if (state.map && flowPoint.current && flowPoint.current.length > 0) {
      flowPoint.current.map((point: any) => point.setMap(null));
      flowPoint.current = null;
    }
  }, [state, flowShow, flowActive]);

  useEffect(() => {
    if (!state.map) return;

    let zoom = state.map?.getZoom() || 0;
    resetRef();

    if (zoom >= 18 && flowActive && flowShow) {
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

            res.data.map((list: any) => {
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
            resetRef();
            return;
          }
          let zoom = state.map?.getZoom() || 0;

          resetRef();

          if (zoom < 18) {
            return;
          } else if (zoom >= 18) {
            if (!state.map) return;
            const transBounds: any[] = [];

            if (e) {
              transBounds.push([e._max.x, e._max.y]);
              transBounds.push([e._min.x, e._max.y]);
              transBounds.push([e._min.x, e._min.y]);
              transBounds.push([e._max.x, e._min.y]);
              transBounds.push([e._max.x, e._max.y]);

              getFlowPop({
                upjongCd: "Q01005",
                wkt: [[transBounds]],
              }).then((res: any) => {
                if (res.data) {
                  const markerLi: any[] = [];

                  res.data.map((list: any) => {
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

                  flowPoint.current = markerLi;
                }
              });
            }
          }
        }, 300);
      }
    );

    return () => {
      naver.maps.Event.removeListener(zoomEvent);
      resetRef();
    };
  }, [flowList, flowShow, flowActive, state.map]);

  useEffect(() => {
    let rank;

    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].dongName === dong.slctName) {
        rank = rankList[i];
        break;
      }
    }
    if (rank) setDongRank(rank);

    return () => {
      setDongRank(null);
    };
  }, [rankList]);

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
      // @ts-ignore
      state.map.data.addGeoJson(dong.slctPath);

      state.map.data.setStyle({
        fillColor: "#36CFC9",
        fillOpacity: 0.2,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.5,
      });

      geoRef.current = dong.slctPath;

      const bounds = dong.slctBounds;
      console.log(bounds);
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

  return (
    <Fragment>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex
        w="100%"
        h="100%"
        zIndex={1}
        gap="0.625rem"
        pointerEvents="none"
        justify={
          (dongRank || (flowActive && flowShow)) &&
          ((brandShow && brandActive) || (buildShow && buildActive))
            ? "space-between"
            : dongRank || (flowActive && flowShow)
            ? "flex-start"
            : "flex-end"
        }
      >
        {(dongRank || (flowActive && flowShow)) && (
          <DecoFrameL pl="1rem" align="flex-end">
            {dongRank && <BoxRankingDong rankData={dongRank} />}
            {flowActive && flowShow && <FlowPopInfo />}
          </DecoFrameL>
        )}
        <Flex
          pos="relative"
          p="6rem 0"
          w="50%"
          h="100%"
          direction="row"
          justify={
            (dongRank || (flowActive && flowShow)) &&
            ((brandShow && brandActive) || (buildShow && buildActive))
              ? "space-between"
              : dongRank || (flowActive && flowShow)
              ? "flex-start"
              : "flex-end"
          }
          gap="0.625rem"
          zIndex={1}
        >
          {(dongRank || (flowActive && flowShow)) && <BoxCenterFrameLeft />}
          {((brandShow && brandActive) || (buildShow && buildActive)) && (
            <BoxCenterFrameRight />
          )}
        </Flex>
        {/* <DecoFrameCenter isOpen={centerView} activeAni={false} /> */}
        {((brandShow && brandActive) || (buildShow && buildActive)) && (
          <DecoFrameR pr="0.25rem">
            {((brandShow && brandActive) || (buildShow && buildActive)) && (
              <DepthListBox
                brandShow={brandShow}
                brandList={brandList || []}
                buildShow={buildShow}
                buildList={buildList || []}
                buildFilter={buildFilter}
              />
            )}
          </DecoFrameR>
        )}
      </Flex>
    </Fragment>
  );
};

export default MapFlowDong;
