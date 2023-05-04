//  Lib
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  Fragment,
  memo,
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
import { Flex, useDisclosure } from "@chakra-ui/react";
//  Deco
import {
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";
import type { RankType } from "@states/sementicMap/stateFilter";
import sample from "@src/util/data/sampleBuilding";

type TypePoint = { lv: number; point: [number, number] };

const MapFlowDong = () => {
  const { state } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
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
  // const [sampleData, setSampleData] = useState<any>([]);

  const dongTopData = useMemo(() => {
    return dong.slctData || [];
  }, [dong]);

  useEffect(() => {
    if (flowList.length > 0) {
      const point: TypePoint[] = [];

      flowList.map((list: any, idx: number) => {
        list.map((li: TypeNiceFlowData, depthIdx: number) => {
          const { flowLv, xAxis, yAxis } = li;
          point.push({
            lv: flowLv,
            point: [yAxis, xAxis],
          });
        });
      });
      setFlowData(point);
    } else {
      setFlowData([]);
    }

    return () => {
      setFlowData(null);
    };
  }, [flowList]);

  useEffect(() => {
    const dongName = dong.slctName.replace(`${sigungu?.slctName} `, "");
    let rank;

    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].dongName === dongName) {
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

    const zoomHandler = naver.maps.Event.addListener(
      state.map,
      "zoom_changed",
      (zoom) => {
        const min = state.map?.getMinZoom() || 16;
        zoom > min ? setCenterView(false) : setCenterView(true);
      }
    );

    setCenterView(true);

    return () => {
      resetSv();
      naver.maps.Event.removeListener(zoomHandler);
    };
  }, [state.map]);

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
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL pl="1rem" align="flex-end">
          {dongRank && <BoxRankingDong rankData={dongRank} />}
          {flowActive && flowShow && <FlowPopInfo />}
        </DecoFrameL>
        <DecoFrameCenter isOpen={centerView} activeAni={false} />
        <DecoFrameR pr="0.25rem">
          <DepthListBox brandShow={brandShow} brandList={brandList || []} />
        </DecoFrameR>
      </Flex>
      {/* --------------------------- 맵 Object ---------------------------*/}
      <InteractArea
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
      />
      {flowActive && flowShow && flowData && flowData?.length > 0 && (
        <MarkerFlowPopList flowList={flowData} />
      )}
    </Fragment>
  );
};

const MarkerFlowPopList = memo(({ flowList }: { flowList: TypePoint[] }) => {
  return (
    <Fragment>
      {flowList.map(({ lv, point }, idx: number) => {
        return (
          <Marker
            key={`flow-${idx}`}
            id={`flow-${idx}`}
            opts={{
              position: new naver.maps.LatLng(point[0], point[1]),
              icon: {
                content: `<div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${flowColor[lv]}"/>`,
                size: new naver.maps.Size(6, 6),
                anchor: new naver.maps.Point(3, 3),
              },
            }}
            onClick={() => {}}
          />
        );
      })}
    </Fragment>
  );
});

export default MapFlowDong;
