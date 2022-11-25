//  Lib
import { useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Flex, keyframes } from "@chakra-ui/react";
//  State
import {
  selectorSementicMapState,
  atomMapControllState,
  mapControllHandler,
} from "@states/searchState/stateSearch";

const SementicMap = () => {
  const { event } = useRecoilValue(atomMapControllState);
  const setSementicMapState = useSetRecoilState(selectorSementicMapState);
  const setMapControll = useSetRecoilState(mapControllHandler);
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const [activeEvent, setActiveEvent] = useState<any>();
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [markerTest, setMarker] = useState<any>();
  const [basePointer, setPointer] = useState<any>({
    pointer: {
      coord: {},
      address: "",
      isCheck: false,
    },
    area: {
      polygon: {},
      isCheck: true,
    },
  });

  const MapController = (props: any) => {
    const { offset } = props;
    const polygonType = [
      {
        title: "ROUND",
        key: "round",
      },
      {
        title: "BOX",
        key: "box",
      },
      {
        title: "CUSTOM",
        key: "custom",
      },
    ];

    const boxAniKetframe = keyframes`
      0% {bottom: -50px}
      100% {bottom: 20px}
    `;

    return (
      <Flex
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        p="20px"
        bg="#ffffff"
        border="1px solid #555555"
        borderRadius="10px"
        gap="10px"
        animation={`${boxAniKetframe} 0.3s linear`}
      >
        {polygonType.map((list) => {
          const { title, key } = list;
          return (
            <Button
              key={key}
              onClick={() => {
                console.log("click");
              }}
              bg="#555555"
              fontWeight="bold"
              _hover={{
                backgroundColor: "#000000",
              }}
            >
              {title}
            </Button>
          );
        })}
        <Button
          key={"polygon-cancle"}
          onClick={() => {
            setMapControll("");
          }}
          bg="#ff6161"
          fontWeight="bold"
          _hover={{
            backgroundColor: "#ff2121",
          }}
        >
          CANCEL
        </Button>
      </Flex>
    );
  };

  const Test = (props: any) => {
    const { offset } = props;

    return (
      <Button
        style={{
          padding: "5px 10px",
          position: "absolute",
          left: `${offset.left}px`,
          top: `${offset.top - 60}px`,
          color: "#ffffff",
          borderRadius: "5px",
          backgroundColor: "#555555",
        }}
        onClick={() => {
          setMapControll("");
          setSementicMapState(basePointer);
          setOffset({ left: 0, top: 0 });
          setPointer({
            pointer: {
              coord: {},
              address: "",
              isCheck: false,
            },
            area: {
              polygon: {},
              isCheck: true,
            },
          });
        }}
      >
        설정완료
      </Button>
    );
  };

  const mapBasePointHandler = (e: any, baseMap: any) => {
    const point = e.coord;

    if (markerRef.current === undefined) {
      const marker = new naver.maps.Marker({
        position: point,
        map: baseMap,
      });
    } else {
      markerRef.current.setPosition(point);
    }
    // if (!markerTest) {
    //   const marker = new naver.maps.Marker({
    //     position: point,
    //     map: baseMap,
    //   });
    //   setMarker(marker);
    // } else {
    //   markerTest.setPosition(point);
    // }

    const position: { x: number; y: number } = mapRef.current
      .getProjection()
      .fromCoordToOffset(point);

    setOffset({
      left: Math.floor(position.x),
      top: Math.floor(position.y),
    });

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
        const result = response.v2;
        setPointer({
          ...basePointer,
          pointer: {
            coord: point,
            address: result.address.jibunAddress,
            isCheck: true,
          },
        });
      }
    );
  };

  const mapBasePolygonHandler = (e: any, baseMap: any) => {
    const point = e.coord;
    console.log(point);
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.3614483, 127.1114883),
        zoom: 13,
      });
    }
  }, [mapRef]);

  useEffect(() => {
    console.log("Event State Change");
    console.log("Reset Map Event");
    naver.maps.Event.removeListener(activeEvent);

    if (event === "activePoint") {
      console.log("Event activePoint Start");
      let pointer = naver.maps.Event.addListener(
        mapRef.current,
        "click",
        (e) => {
          mapBasePointHandler(e, mapRef.current);
        }
      );
      setActiveEvent(pointer);
    } else if (event === "activePolygon") {
      console.log("Event activePolygon Start");
      let polygon = naver.maps.Event.addListener(
        mapRef.current,
        "click",
        (e) => {
          mapBasePolygonHandler(e, mapRef.current);
        }
      );

      setActiveEvent(polygon);
    }

    return naver.maps.Event.removeListener(activeEvent);
  }, [event]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {event === "activePoint" && <Test offset={offset} />}
        {event === "activePolygon" && <MapController />}
      </div>
    </>
  );
};

export default SementicMap;
