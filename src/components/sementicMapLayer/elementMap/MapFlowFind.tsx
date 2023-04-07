//  Lib
import { useContext, useEffect, useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { NaverMapContext } from "@src/lib/src";
import { NaverMapShape } from "@src/lib/src/common/types";
//  Components
import DecoTop from "@components/sementicMapLayer/elementDeco/DecoTop";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { atomSlctCustom } from "@states/sementicMap/stateMap";
//  Icons
import { IcoAppStore } from "@assets/icons/icon";
import markerIcon from "@assets/icons/marker.png";

const ToggleButtonGroup = () => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setFlow = useSetRecoilState(atomFilterFlow);
  const setSlceCustom = useSetRecoilState(atomSlctCustom);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [event, setEvent] = useState<any>(null);
  const [moveEvent, setMoveEvent] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [poly, setpoly] = useState<naver.maps.Polyline | undefined>();
  const [rangeCenter, setRangeCenter] = useState<any>();
  const [addr, setAddr] = useState({
    address: "",
    point: {
      lat: 0,
      lng: 0,
    },
  });
  const markerRef = useRef<any[]>([]);
  const markerAddrRef = useRef<any>();
  const markerRangeRef = useRef<any>();
  const circleRef = useRef<naver.maps.Circle | undefined>();

  const resetAllElement = () => {
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    poly?.setMap(null);
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    markerAddrRef.current?.setMap(null);
    markerAddrRef.current = null;
    circleRef.current?.setMap(null);
    circleRef.current = undefined;
    naver.maps.Event.removeListener(event);
    naver.maps.Event.removeListener(moveEvent);
  };

  const calDist = (point01: any, point02: any) => {
    const { _lat: lat1, _lng: lon1 } = point01;
    const { _lat: lat2, _lng: lon2 } = point02;

    const EARTH_R = 6371000.0;
    const rad = Math.PI / 180;
    const radLat1 = rad * lat1;
    const radLat2 = rad * lat2;
    const radDist = rad * (lon1 - lon2);

    let distance = Math.sin(radLat1) * Math.sin(radLat2);
    distance =
      distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
    const ret = EARTH_R * Math.acos(distance);

    return Math.round(ret); // 미터 단위
  };

  const handleClick = (idx: number) => {
    if (activeIdx === idx) {
      setActiveIdx(-1);
    } else {
      setActiveIdx(idx);
    }
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRangeRef.current?.setMap(null);
    markerRef.current = [];
    markerRangeRef.current = null;
    circleRef.current?.setRadius(0);

    if (idx === 0) {
      console.log("폴리곤 그리기");
      const polyEvent = naver.maps.Event.addListener(
        state.map,
        "click",
        OnDrawPolygon
      );

      setEvent(polyEvent);
    } else {
      if (event) {
        naver.maps.Event.removeListener(event);
        naver.maps.Event.removeListener(moveEvent);
        setEvent(null);
        setMoveEvent(null);
      }

      poly?.setMap(null);

      const polyline = new naver.maps.Polyline({
        map: state.map,
        path: [],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        clickable: true,
      });

      setpoly(polyline);
    }

    if (idx === 2) {
      if (addr.address) {
        state.map?.setCenter(addr.point);
        state.map?.setZoom(12);
        let distance = 0;

        markerAddrRef.current && markerAddrRef.current?.setMap(null);

        const marker = new naver.maps.Marker({
          map: state.map,
          position: new naver.maps.LatLng(addr.point),
          icon: {
            url: markerIcon,
            size: new naver.maps.Size(21, 31),
            anchor: new naver.maps.Point(9, 22),
          },
        });

        markerAddrRef.current = marker;

        const moveEvent = naver.maps.Event.addListener(
          state.map,
          "mousemove",
          (e) => {
            console.log(e);
            if (markerAddrRef.current && e.latlng) {
              let point01 = markerAddrRef.current.getPosition();
              let point02 = e.latlng;

              distance = calDist(point01, point02);
              console.log(distance);
              setDistance(distance);
            }
          }
        );

        setMoveEvent(moveEvent);
      } else {
        alert("주소를 입력해주세요");
      }
    } else if (idx === 1) {
      const rangeEvent = naver.maps.Event.addListener(
        state.map,
        "click",
        OnRangePolygon
      );

      setEvent(rangeEvent);
    }
  };

  const OnDrawPolygon = (e: any) => {
    if (poly === undefined) return;
    const point: naver.maps.LatLng = e.coord;
    const path: any = poly.getPath();
    console.log(markerRef.current.length);
    if (markerRef.current.length === 2) {
      path.push(point);
      path.push(path._array[0]);
    } else if (markerRef.current.length > 2) {
      path.pop();
      path.push(point);
      path.push(path._array[0]);
    } else {
      path.push(point);
    }

    const marker = new naver.maps.Marker({
      map: state.map,
      position: point,
      icon: {
        url: markerIcon,
        size: new naver.maps.Size(21, 31),
        anchor: new naver.maps.Point(9, 22),
      },
    });
    markerRef.current.push(marker);
  };

  const OnRangePolygon = (e: any) => {
    if (poly === undefined) return;

    if (!markerRangeRef.current) {
      const point: naver.maps.LatLng = e.coord;
      const marker = new naver.maps.Marker({
        map: state.map,
        position: point,
        icon: {
          url: markerIcon,
          size: new naver.maps.Size(21, 31),
          anchor: new naver.maps.Point(9, 22),
        },
      });
      const center = marker.getPosition();
      setRangeCenter(center);
      markerRangeRef.current = marker;
    }
  };

  const addrSlctHandler = (addr: any) => {
    const { address } = addr;
    // @ts-ignore
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any, status: any) => {
      // @ts-ignore
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        console.log(x, y);
        setAddr({
          address: address,
          point: {
            lat: y,
            lng: x,
          },
        });

        state.map?.setCenter({
          lat: y,
          lng: x,
        });
        state.map?.setZoom(12);
      }
    });

    onClose();
  };

  useEffect(() => {
    console.log("test");
    if (activeIdx === 1 && markerRangeRef.current && rangeCenter) {
      circleRef.current?.setCenter(rangeCenter);
      const moveEvent = naver.maps.Event.addListener(
        state.map,
        "mousemove",
        (e) => {
          console.log(e);
          if (markerRangeRef.current && e.latlng) {
            let point01 = markerRangeRef.current.getPosition();
            let point02 = e.latlng;

            let distance = calDist(point01, point02);
            // console.log(distance);
            setDistance(distance);
          }
        }
      );

      setMoveEvent(moveEvent);
    }
  }, [markerRangeRef, activeIdx, rangeCenter]);

  useEffect(() => {
    console.log("test");
    if (activeIdx === 1 && markerRangeRef?.current && moveEvent) {
      const center = markerRangeRef.current.getPosition();

      console.log("test");
      circleRef.current?.setCenter(center);
      circleRef.current?.setRadius(distance);
      const tmp = naver.maps.Event?.addListener(state.map, "click", () => {
        naver.maps.Event.removeListener(moveEvent);
        naver.maps.Event.removeListener(tmp);
        console.log(circleRef.current?.getBounds());
      });
    }
  }, [activeIdx, distance, markerRangeRef, moveEvent]);

  useEffect(() => {
    if (addr.address) {
      markerAddrRef.current && markerAddrRef.current?.setMap(null);

      const marker = new naver.maps.Marker({
        map: state.map,
        position: new naver.maps.LatLng(addr.point),
        icon: {
          url: markerIcon,
          size: new naver.maps.Size(21, 31),
          anchor: new naver.maps.Point(9, 22),
        },
      });

      markerAddrRef.current = marker;
    }
  }, [addr, markerAddrRef]);

  useEffect(() => {
    if (addr.address && activeIdx === 2 && markerAddrRef?.current) {
      const center = markerAddrRef.current.getPosition();

      circleRef.current?.setCenter(center);
      circleRef.current?.setRadius(distance);
      const tmp = naver.maps.Event?.addListener(state.map, "click", () => {
        naver.maps.Event.removeListener(moveEvent);
        naver.maps.Event.removeListener(tmp);
        console.log(circleRef.current?.getBounds());
      });
    }
  }, [addr, activeIdx, distance, markerAddrRef]);

  useEffect(() => {
    if (state.map === undefined) return;
    const circle = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeColor: "#5347AA",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#E51D1A",
      fillOpacity: 0.3,
    });
    const polyline = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: true,
    });
    circleRef.current = circle;
    setpoly(polyline);
    markerRef.current = [];
  }, []);

  return (
    <Flex
      pos="absolute"
      top="1rem"
      left="50%"
      transform="translateX(-50%)"
      zIndex={999}
      gap={"0.5rem"}
      direction="column"
    >
      <Flex gap="1rem" justifyContent="center">
        <Button
          variant="filterTop"
          isActive={activeIdx === 0}
          onClick={() => {
            if (activeIdx === 0) {
              handleClick(-1);
            } else {
              handleClick(0);
            }
          }}
        >
          <Box>
            <IcoAppStore />
          </Box>
          그리기
        </Button>
        <Button
          variant="filterTop"
          isActive={activeIdx === 1}
          onClick={() => {
            if (activeIdx === 1) {
              handleClick(-1);
            } else {
              handleClick(1);
            }
          }}
        >
          <Box>
            <IcoAppStore />
          </Box>
          반경
        </Button>
        <Button
          variant="filterTop"
          isActive={activeIdx === 2}
          onClick={() => {
            if (activeIdx === 2) {
              handleClick(-1);
            } else if (addr.address) {
              handleClick(2);
            } else {
              alert("주소를 입력해주세요");
              handleClick(-1);
            }
          }}
        >
          <Box>
            <IcoAppStore />
          </Box>
          주소지
        </Button>
      </Flex>
      <Button
        variant="filterTopMain"
        onClick={() => {
          isOpen ? onClose() : onOpen();
        }}
      >
        {addr.address || "주소를 검색하세요."}
      </Button>
      <DecoTop width="13rem" />
      {activeIdx !== -1 && (
        <Button
          variant="search"
          onClick={() => {
            if (activeIdx === 0) {
              const path: any = poly?.getPath();
              const bounds: any = poly?.getBounds();
              const center: any = bounds?.getCenter();
              // @ts-ignore
              const geocoder = new kakao.maps.services.Geocoder();

              if (!path || path.length - 1 <= 2) {
                alert("영역을 제대로 설정해주세요");
                return;
              }

              geocoder.coord2RegionCode(
                center?._lng,
                center?._lat,
                (result: any) => {
                  setSlceCustom({
                    slctName: result[0].address_name || "",
                    slctPath: path._array,
                    range: undefined,
                    center: center,
                    pathType: "bounds",
                  });
                  resetAllElement();
                  setFlow("custom");
                }
              );
            } else if (activeIdx === 1) {
              if (!circleRef.current) {
                alert("범위를 설정해주세요");
                return;
              }
              const bounds: any = circleRef.current?.getBounds();
              const range = circleRef.current?.getRadius();
              const center: any = circleRef.current?.getCenter();
              // @ts-ignore
              const geocoder = new kakao.maps.services.Geocoder();

              geocoder.coord2RegionCode(
                center?._lng,
                center?._lat,
                (result: any) => {
                  setSlceCustom({
                    slctName: result[0].address_name || "",
                    slctPath: bounds,
                    range: range,
                    center: center,
                    pathType: "circle",
                  });
                  resetAllElement();
                  setFlow("custom");
                }
              );
            } else if (activeIdx === 2) {
              if (!circleRef.current) {
                alert("범위를 설정해주세요");
                return;
              }
              const bounds: any = circleRef.current?.getBounds();
              const range = circleRef.current?.getRadius();
              const center: any = circleRef.current?.getCenter();

              setSlceCustom({
                slctName: addr.address,
                slctPath: bounds,
                range: range,
                center: center,
                pathType: "circle",
              });
              resetAllElement();
              setFlow("custom");
            }
          }}
        >
          설정완료
        </Button>
      )}
      {/* ------------------------------ 모달 ------------------------------*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="50vw">
          <ModalBody
            p="0"
            w="100%"
            h="40vh"
            borderRadius="base"
            overflow="hidden"
          >
            <DaumPostcodeEmbed onComplete={addrSlctHandler} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const MapFlowFind = () => {
  const { state, dispatch } = useContext(NaverMapContext);
  const drawingPolyId = "drawingPoly-manager";
  const [shapeCount, setShapeCount] = useState(0);
  const shapeCountRef = useRef(0);
  const [values, setValues] = useState<string[]>([]);

  const handleToggle = (values: string[]) => {
    setValues(values);
  };

  const addShape = (shape: NaverMapShape) => {
    setShapeCount((shapeCount) => {
      dispatch({
        type: "add_object",
        object: shape,
        id: `${drawingPolyId}-${shapeCount}`,
      });
      return shapeCount + 1;
    });
  };

  const removeShapes = () => {
    for (let i = 0; i < shapeCountRef.current; i++) {
      dispatch({ type: "remove_object", id: `${drawingPolyId}-${i}` });
    }
  };

  useEffect(() => {
    state.map?.setOptions({
      minZoom: 0,
      maxZoom: 16,
    });
  }, []);

  return (
    <ToggleButtonGroup />
    // <CustomControl id={"draw"} bindingPosition="TOP_CENTER">
    //   <div>
    //     <ToggleButtonGroup />
    //   </div>
    // </CustomControl>
  );
};

export default MapFlowFind;
