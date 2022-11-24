//  Lib
import { useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";
//  Components
import infoBoxMaker from "./sementicMapControll/mapInfobox";
//  State
import {
  collectSementicState,
  atomSementicMapState,
  selectorSementicMapState,
  atomMapControllState,
} from "@states/searchState/stateSearch";

type Props = {};

const SementicMap = (props: Props) => {
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const { pointer, area } = useRecoilValue(atomSementicMapState);
  const setSementicMapState = useSetRecoilState(selectorSementicMapState);
  const determineState = useSetRecoilState(collectSementicState);
  const [controllState, setControllState] =
    useRecoilState(atomMapControllState);
  // const [pointerMarker, setPointerMarker] = useState<any | null>(null);

  const CustomInfoBox = () => {
    return <Button onClick={() => determineState("area")}>설정완료</Button>;
  };

  const mapBasePointHandler = (e: any, baseMap: any) => {
    const point = e.coord;
    if (markerRef.current === undefined) {
      const marker = new naver.maps.Marker({
        position: point,
        map: baseMap,
      });
      markerRef.current = marker;
    } else {
      markerRef.current.setPosition(point);
    }

    const infoBox = infoBoxMaker();
    if (infoBox.getMap()) {
      infoBox.close();
    } else {
      infoBox.open(baseMap, markerRef.current);
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: point,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("address api error");
        }
        const result = response.v2; // 검색 결과의 컨테이너
        setSementicMapState({
          key: "pointer",
          val: {
            coord: point,
            address: result.address.jibunAddress,
            isCheck: false,
          },
        });
      }
    );
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.3614483, 127.1114883),
        zoom: 13,
      });

      //  SementicMap 지점 클릭
      naver.maps.Event.addListener(mapRef.current, "click", (e) => {
        mapBasePointHandler(e, mapRef.current);
      });
    }
  }, [mapRef]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

export default SementicMap;
