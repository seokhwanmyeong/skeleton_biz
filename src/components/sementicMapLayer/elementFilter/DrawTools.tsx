//  Lib
import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Components
import ModalDaumAddr from "@components/modal/common/ModalDaumAddr";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Icons
import {
  IcoAppStore,
  IcoCheck,
  IcoCloseCircle,
  IcoEnvironment,
  IcoGateWay,
  IcoReset,
} from "@assets/icons/icon";
import markerIcon from "@assets/icons/marker.png";
//  Deco
import { DecoTop } from "@components/sementicMapLayer/elementDeco/Deco";

const ToggleButtonGroup = ({ toolOpen }: any) => {
  const { state } = useContext(NaverMapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConOpen,
    onOpen: onConOpen,
    onClose: onConClose,
  } = useDisclosure();
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const setCreateArea = useSetRecoilState(atomCreateArea);
  const resetCreateArea = useResetRecoilState(atomCreateArea);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [event, setEvent] = useState<any>(null);
  const [moveEvent, setMoveEvent] = useState<any>(null);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  // const [poly, setpoly] = useState<naver.maps.Polyline | undefined>();
  const [rangeCenter, setRangeCenter] = useState<any>();
  const [addr, setAddr] = useState({
    address: "",
    point: {
      lat: 0,
      lng: 0,
    },
  });
  const polyRef = useRef<naver.maps.Polyline | undefined>();
  const markerRef = useRef<any[]>([]);
  const markerAddrRef = useRef<any>();
  const markerRangeRef = useRef<any>();
  const circleRef = useRef<naver.maps.Circle | undefined>();

  const resetDraw = () => {
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    naver.maps.Event.removeListener(event);
    naver.maps.Event.removeListener(moveEvent);
    setEvent(null);
    setMoveEvent(null);

    polyRef.current?.setMap(null);
    polyRef.current = new naver.maps.Polyline({
      map: state.map,
      path: [],
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      clickable: true,
    });
    circleRef.current?.setMap(null);
    circleRef.current = new naver.maps.Circle({
      map: state.map,
      center: new naver.maps.LatLng(0, 0),
      radius: 0,
      strokeColor: "#5347AA",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#E51D1A",
      fillOpacity: 0.3,
    });
    setDistance(0);
    setActiveIdx(-1);
    resetCreateArea();
  };

  const resetAllElement = () => {
    markerRef.current.map((marker: any) => marker.setMap(null));
    markerRef.current = [];
    // poly?.setMap(null);
    polyRef.current?.setMap(null);
    polyRef.current = undefined;
    markerRangeRef.current?.setMap(null);
    markerRangeRef.current = null;
    markerAddrRef.current?.setMap(null);
    markerAddrRef.current = null;
    circleRef.current?.setMap(null);
    circleRef.current = undefined;
    naver.maps.Event.removeListener(event);
    naver.maps.Event.removeListener(moveEvent);
    resetCreateArea();
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

      // poly?.setMap(null);
      polyRef.current?.setMap(null);

      const polyline = new naver.maps.Polyline({
        map: state.map,
        path: [],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        clickable: true,
      });

      polyRef.current = polyline;
      // setpoly(polyline);
    }

    if (idx === 2) {
      if (addr.address) {
        state.map?.setCenter(addr.point);
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
            if (markerAddrRef.current && e.latlng) {
              let point01 = markerAddrRef.current.getPosition();
              let point02 = e.latlng;
              distance = calDist(point01, point02);
              setDistance(distance);
            }

            setCursorPo(e.latlng);
            onInfoOpen();
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
    if (polyRef.current === undefined) return;
    const point: naver.maps.LatLng = e.coord;
    const path: any = polyRef.current.getPath();
    setCursorPo(point);
    onInfoOpen();
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

    const moveEvent = naver.maps.Event.addListener(
      state.map,
      "mousemove",
      (e) => {
        if (e.latlng) {
        }

        setCursorPo(e.latlng);
        onInfoOpen();
      }
    );

    setMoveEvent(moveEvent);

    const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
      naver.maps.Event.removeListener(event);
      naver.maps.Event.removeListener(moveEvent);
      naver.maps.Event.removeListener(tmp);
      onInfoClose();
      onConOpen();
    });
  };

  const OnRangePolygon = (e: any) => {
    if (polyRef.current === undefined) return;

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
    if (activeIdx === 1 && markerRangeRef.current && rangeCenter) {
      circleRef.current?.setCenter(rangeCenter);
      const moveEvent = naver.maps.Event.addListener(
        state.map,
        "mousemove",
        (e) => {
          if (markerRangeRef.current && e.latlng) {
            let point01 = markerRangeRef.current.getPosition();
            let point02 = e.latlng;
            let distance = calDist(point01, point02);

            setDistance(distance);
            setCursorPo(e.latlng);
            onInfoOpen();
          }
        }
      );

      setMoveEvent(moveEvent);
    }
  }, [markerRangeRef, activeIdx, rangeCenter]);

  useEffect(() => {
    if (!(activeIdx === 1 && markerRangeRef?.current && moveEvent)) return;

    const center = markerRangeRef.current.getPosition();

    circleRef.current?.setCenter(center);
    circleRef.current?.setRadius(distance);
    const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
      naver.maps.Event.removeListener(moveEvent);
      naver.maps.Event.removeListener(tmp);
      onInfoClose();
      onConOpen();
    });
  }, [activeIdx, distance, markerRangeRef, moveEvent]);

  useEffect(() => {
    if (!addr.address) return;

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
  }, [addr, markerAddrRef]);

  useEffect(() => {
    onConClose();
    setCursorPo(undefined);
  }, [activeIdx]);

  useEffect(() => {
    if (addr.address && activeIdx === 2 && markerAddrRef?.current) {
      const center = markerAddrRef.current.getPosition();

      circleRef.current?.setCenter(center);
      circleRef.current?.setRadius(distance);
      const tmp = naver.maps.Event?.addListener(state.map, "rightclick", () => {
        naver.maps.Event.removeListener(moveEvent);
        naver.maps.Event.removeListener(tmp);
        onInfoClose();
        onConOpen();
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
    polyRef.current = polyline;
    // setpoly(polyline);
    markerRef.current = [];
    resetCreateArea();

    return () => {
      resetAllElement();
      resetCreateArea();
    };
  }, [toolOpen]);

  return (
    <Fragment>
      <Button
        variant="filterTop02"
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
          <IcoGateWay width="1.125rem" height="1.125rem" color="font.primary" />
        </Box>
        그리기
      </Button>
      <Button
        variant="filterTop02"
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
          <IcoAppStore
            width="1.125rem"
            height="1.125rem"
            color="font.primary"
          />
        </Box>
        반경
      </Button>
      <Button
        variant="filterTop02"
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
          <IcoEnvironment
            width="1.125rem"
            height="1.125rem"
            color="font.primary"
          />
        </Box>
        주소지
      </Button>
      <Button
        variant="filterTop02"
        onClick={() => {
          handleClick(-1);
          resetAllElement();
          toolOpen(false);
        }}
      >
        <Box>
          <IcoCloseCircle
            width="1.125rem"
            height="1.125rem"
            color="font.primary"
          />
        </Box>
        취소
      </Button>
      <Flex pos="fixed" bottom="calc(100vh - 2.8rem - 8rem)" direction="column">
        <Button
          variant="filterTopMain"
          onClick={() => {
            isOpen ? onClose() : onOpen();
          }}
        >
          {addr.address || "주소를 검색하세요"}
        </Button>
        <DecoTop width="10rem" />
      </Flex>
      {/* ------------------------------ 모달 ------------------------------*/}
      <ModalDaumAddr
        isOpen={isOpen}
        onClose={onClose}
        onComplete={addrSlctHandler}
      />
      {isConOpen && cursorPo && activeIdx !== -1 && (
        <OverlayView id={`confirmBox`} position={cursorPo}>
          <Flex
            gap="1rem"
            w="15rem"
            h="3rem"
            bgColor="#FFFFFF"
            justify="center"
            align="center"
          >
            <Button
              variant="filterSearch"
              aria-label="영역확정"
              onClick={() => {
                if (activeIdx === 0) {
                  // const path: any = poly?.getPath();
                  // const bounds: any = poly?.getBounds();
                  const path: any = polyRef.current?.getPath();
                  const bounds: any = polyRef.current?.getBounds();
                  const center: any = bounds?.getCenter();

                  if (!path || path.length - 1 <= 2) {
                    alert("영역을 제대로 설정해주세요");
                    return;
                  }

                  setCreateArea({
                    path: path._array,
                    center: center,
                    pathType: "bounds",
                  });

                  onConClose();
                  // resetAllElement();
                  // toolOpen(false);
                } else if (activeIdx === 1) {
                  if (!circleRef.current) {
                    alert("범위를 설정해주세요");
                    return;
                  }
                  const bounds: any = circleRef.current?.getBounds();
                  const center: any = circleRef.current?.getCenter();

                  setCreateArea({
                    path: bounds,
                    center: center,
                    pathType: "circle",
                  });

                  onConClose();
                  // resetAllElement();
                  // toolOpen(false);
                } else if (activeIdx === 2) {
                  if (!circleRef.current) {
                    alert("범위를 설정해주세요");
                    return;
                  }
                  const bounds: any = circleRef.current?.getBounds();
                  const center: any = circleRef.current?.getCenter();

                  setCreateArea({
                    path: bounds,
                    center: center,
                    pathType: "circle",
                  });

                  onConClose();
                  // resetAllElement();
                  // toolOpen(false);
                }
              }}
              top="1px"
            >
              <IcoCheck
                width="0.875rem"
                height="0.875rem"
                color="primary.inverse"
              />
              영역확정
            </Button>
            <Button
              variant="filterSearch"
              aria-label="다시 그리기"
              onClick={() => {
                resetDraw();
                onConClose();
              }}
              top="1px"
            >
              <IcoReset
                width="0.875rem"
                height="0.875rem"
                color="primary.inverse"
              />
              다시 그리기
            </Button>
          </Flex>
        </OverlayView>
      )}
      {isInfoOpen && cursorPo && activeIdx !== -1 && (
        <OverlayView id={`infoBox`} position={cursorPo}>
          <Flex
            w="10rem"
            h="3rem"
            bgColor="#FFFFFF"
            justify="center"
            align="center"
            textStyle="base"
            fontSize="xs"
          >
            완료되셨으면 마우스 우측을 눌러주세요
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const DrawTools = ({ toolOpen }: any) => {
  const { state, dispatch } = useContext(NaverMapContext);

  useEffect(() => {
    state.map?.setOptions({
      minZoom: 0,
      maxZoom: 22,
    });
  }, []);

  return <ToggleButtonGroup toolOpen={toolOpen} />;
};

export default DrawTools;
