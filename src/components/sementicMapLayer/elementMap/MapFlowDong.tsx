//  Lib
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  Fragment,
  memo,
  useRef,
} from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Marker, NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
import { BoxRankingDong } from "@components/sementicMapLayer/elementFilter/BoxRanking";
import FlowPopInfo from "@components/sementicMapLayer/elementFilter/FlowPopInfo";
import DepthListBox from "@components/sementicMapLayer/elementFilter/DepthListBox";
//  state
import {
  infoComBrand,
  infoComFlowDepth,
  infoComNiceRank,
} from "@states/sementicMap/stateFilter";
import { atomFlowEnterArea, atomSlctDong } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { flowColor } from "@util/define/map";
//  Icon
import { Flex } from "@chakra-ui/react";
//  Deco
import {
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/DecoCenter";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import type { RankType } from "@states/sementicMap/stateFilter";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowDong = () => {
  const { state } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);
  const { show: brandShow, data: brandList } = useRecoilValue(infoComBrand);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const rankList = useRecoilValue(infoComNiceRank);
  const resetSv = useResetRecoilState(sementicViewState);
  const [centerView, setCenterView] = useState<boolean>(true);
  const [flowData, setFlowData] = useState<TypePoint[] | null>([]);
  const [dongRank, setDongRank] = useState<RankType | null>(null);
  const markerFlow = useRef<any[] | null>(null);
  const geoRef = useRef<any | null>(null);

  useEffect(() => {
    if (!state.map) return;

    if (flowList.length > 0 && flowShow && flowActive) {
      if (markerFlow.current && markerFlow.current.length > 0) {
        markerFlow.current.map((marker: any) => marker.setMap(null));
        markerFlow.current = [];
      }
      const markerLi: any[] = [];
      console.log(flowList);
      flowList.map((list: any, idx: number) => {
        list.map((li: TypeNiceFlowData) => {
          const { flowLv, xAxis, yAxis } = li;

          const marker = new naver.maps.Marker({
            map: state.map,
            position: new naver.maps.LatLng(yAxis, xAxis),
            icon: {
              content: `<div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${flowColor[flowLv]}"/>`,
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
      // state.map?.fitBounds(dong.slctPath[0]);

      // let curZoom = state.map?.getZoom();

      // if (curZoom) {
      //   state.map?.setZoom(curZoom);
      //   state.map?.setOptions({
      //     minZoom: curZoom,
      //     maxZoom: 22,
      //   });
      // }

      if (geoRef.current) {
        state.map?.data.removeGeoJson(geoRef.current);
      }
      // @ts-ignore
      state.map.data.addGeoJson(dong.slctPath);

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
        if (dong.slctLat && dong.slctLng)
          state.map?.setCenter(
            new naver.maps.LatLng(dong.slctLat, dong.slctLng)
          );
      } else {
        dong.slctLat &&
          dong.slctLng &&
          state.map?.setCenter(
            new naver.maps.LatLng(dong.slctLat, dong.slctLng)
          );
        dong.slctZoom && state.map?.setZoom(Number(dong.slctZoom));
      }
    }

    const zoomHandler = naver.maps.Event.addListener(
      state.map,
      "zoom_changed",
      (zoom) => {
        const min = state.map?.getMinZoom() || 16;
        // zoom > min ? setCenterView(false) : setCenterView(true);
      }
    );

    // setCenterView(true);

    return () => {
      resetSv();
      naver.maps.Event.removeListener(zoomHandler);
      if (state.map && geoRef.current) {
        state.map?.data.removeGeoJson(geoRef.current);
      }
    };
  }, [state.map, dong]);

  // const createPolyHandler = (coordinates: any) => {
  //   return coordinates[0].map((coordinate: any) => {
  //     return coordinate.map((arr: any) => {
  //       return new naver.maps.LatLng(arr[1], arr[0]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   // console.log(sampleData.length);
  //   let bCnt = 0;
  //   let polyList: any[] = [];

  //   sampleData.map((data: any, idx: number) => {
  //     if (!data?.buildings || data?.buildings?.length === 0) return;
  //     const buildings = data?.buildings;
  //     bCnt += buildings.length;

  //     if (buildings.length > 1) {
  //       const test = buildings.map((b: any) => {
  //         if (b.geometry) {
  //           const coordinates = b.geometry.coordinates;
  //           const path = createPolyHandler(coordinates);
  //           const poly = new naver.maps.Polygon({
  //             map: state.map,
  //             paths: path,
  //             fillColor: "#36CFC9",
  //             fillOpacity: 0.75,
  //             strokeColor: "#FFFFFF",
  //             strokeOpacity: 0.6,
  //             strokeWeight: 1,
  //           });
  //           polyList.push(poly);
  //         }
  //       });
  //     } else {
  //       if (buildings[0].geometry) {
  //         const coordinates = buildings[0].geometry.coordinates;
  //         const path = createPolyHandler(coordinates);
  //         const poly = new naver.maps.Polygon({
  //           map: state.map,
  //           paths: path,
  //           fillColor: "#36CFC9",
  //           fillOpacity: 0.75,
  //           strokeColor: "#FFFFFF",
  //           strokeOpacity: 0.6,
  //           strokeWeight: 1,
  //         });
  //         polyList.push(poly);
  //       }
  //     }
  //   });

  //   // console.log(bCnt);
  //   // console.log(polyList);
  // }, [sampleData]);

  // useEffect(() => {
  //   setSampleData(sample);
  //   return () => {
  //     setSampleData([]);
  //   };
  // }, []);

  return (
    <Fragment>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex
        w="100%"
        h="100%"
        zIndex={1}
        gap="0.625rem"
        pointerEvents="none"
        justify="space-between"
      >
        <DecoFrameL pl="1rem" align="flex-end">
          {dongRank && <BoxRankingDong rankData={dongRank} />}
          {flowActive && flowShow && <FlowPopInfo />}
        </DecoFrameL>
        {/* <DecoFrameCenter isOpen={centerView} activeAni={false} /> */}
        <DecoFrameR pr="0.25rem">
          <DepthListBox brandShow={brandShow} brandList={brandList || []} />
        </DecoFrameR>
      </Flex>
      {/* --------------------------- 맵 Object ---------------------------*/}
      {/* <InteractArea
        key={dong.name}
        setClickable={false}
        name={dong.slctName}
        num={dong.slctCode}
        path={dong.slctPath}
        style={{
          fillColor: "#36CFC9",
          fillOpacity: 0.2,
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.5,
        }}
        hoverStyle={{
          fillColor: "#36CFC9",
          fillOpacity: 0.2,
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.5,
        }}
      /> */}
      {/* {flowActive && flowShow && flowData && flowData?.length > 0 && (
        <MarkerFlowPopList flowList={flowData} />
      )} */}
    </Fragment>
  );
};

// const MarkerFlowPopList = memo(({ flowList }: { flowList: TypePoint[] }) => {
//   return (
//     <Fragment>
//       {flowList.map(({ lv, point }, idx: number) => {
//         return (
//           <Marker
//             key={`flow-${idx}`}
//             id={`flow-${idx}`}
//             opts={{
//               position: new naver.maps.LatLng(point[0], point[1]),
//               icon: {
//                 content: `<div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${flowColor[lv]}"/>`,
//                 size: new naver.maps.Size(6, 6),
//                 anchor: new naver.maps.Point(3, 3),
//               },
//             }}
//             onClick={() => {}}
//           />
//         );
//       })}
//     </Fragment>
//   );
// });

export default MapFlowDong;
