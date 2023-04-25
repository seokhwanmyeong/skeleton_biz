//  Lib
import { Fragment, useState, useEffect, useContext } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Flex } from "@chakra-ui/react";
import { NaverMapContext, Polygon } from "@src/lib/src";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/stateMap";
//  Api
import { apiErpMap } from "@api/biz/config";
import sample from "@src/util/data/sampleBuilding";

type Props = {};

const MapFlowInit = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const [sampleData, setSampleData] = useState<any>([]);

  // const createPolyHandler = (coordinates: any) => {
  //   return coordinates[0].map((coordinate: any) => {
  //     return coordinate.map((arr: any) => {
  //       return new naver.maps.LatLng(arr[1], arr[0]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   console.log(sampleData.length);
  //   let bCnt = 0;
  //   const polyList = sampleData.map((data: any, idx: number) => {
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
  //             fillColor: "#ff0000",
  //             fillOpacity: 0.3,
  //             strokeColor: "#ff0000",
  //             strokeOpacity: 0.6,
  //             strokeWeight: 3,
  //           });
  //           return poly;
  //         } else return;
  //       });
  //       return test;
  //     } else {
  //       if (buildings[0].geometry) {
  //         const coordinates = buildings[0].geometry.coordinates;
  //         const path = createPolyHandler(coordinates);
  //         const poly = new naver.maps.Polygon({
  //           map: state.map,
  //           paths: path,
  //           fillColor: "#ff0000",
  //           fillOpacity: 0.3,
  //           strokeColor: "#ff0000",
  //           strokeOpacity: 0.6,
  //           strokeWeight: 3,
  //         });
  //         return poly;
  //       } else return;
  //     }
  //   });

  //   console.log(bCnt);
  //   console.log(polyList);
  // }, [sampleData]);

  // useEffect(() => {
  //   setSampleData(sample);
  // }, []);

  return (
    <Fragment>
      {/* {sampleData.length !== 0 &&
        sampleData.map((data: any, idx: number) => {
          if (idx === 0) console.log(data);
          return (
            <Polygon
              id={data.admcd}
              onClick={() => {
                console.log(data);
              }}
              opts={{
                paths: data.buildings[0].geometry.coordinates[0][0],
                fillColor: "#4446ff",
                fillOpacity: 0.2,
                strokeColor: "#6badf5",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: true,
              }}
            />
          );
        })} */}
    </Fragment>
  );
};

export default MapFlowInit;
