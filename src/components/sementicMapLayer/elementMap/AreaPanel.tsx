//  Lib
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Marker, Polygon, NaverMapContext, Polyline } from "@src/lib/src";
import CustomControl from "@src/lib/src/components/Control/CustomControl";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import { Centroid } from "@src/lib/src/util/Polygon";
//  Components
import InteractDong from "./InteractDong";
//  Util
import areaData from "@util/data/area/sido.json";
import sidoData from "@util/data/area/sigungu.json";
import dongData from "@util/data/area/dong.json";

interface areaLocal {
  name: string;
  path:
    | naver.maps.ArrayOfCoords[]
    | naver.maps.KVOArrayOfCoords[]
    | naver.maps.ArrayOfCoordsLiteral[];
}

interface AreaPanelProps {
  localEvent: (sido: boolean) => any;
  num: number;
  selectDong: (num: number) => any;
}
interface donareaData {}
const AreaPanel = ({ localEvent, num, selectDong }: AreaPanelProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [sido, setSido] = useState(true);
  const [localarea, setLocalarea] = useState([]);
  const [dongarea, setDongArea] = useState([]);
  const [dongclick, setDongClick] = useState(false);
  const [numb, setNumb] = useState(-1);
  const [poly, setpoly] = useState<naver.maps.Polygon | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const polyref = useRef(null);
  useEffect(() => {
    const datas = [] as any;
    sidoData.forEach((e) => {
      if (e.parent == "11") {
        const local = JSON.parse(e.polygon);
        //console.log(Centroid(local));
        datas.push({ name: e.name, path: Object.values(local) });
      }
    });

    setLocalarea(datas);

    const dongs = [] as any;
    dongData.forEach((e) => {
      if (e.gu == 11110) {
        const poly = JSON.parse(e.polygon);
        const center = Centroid(poly);

        dongs.push({
          name: e.name,
          center: { lat: e.lat, lng: e.lng },
          path: Object.values(poly),
          zoom: e.zoom === undefined ? 17 : e.zoom,
        });
      }
    });
    setDongArea(dongs);
  }, []);
  useEffect(() => {
    if (num === -1) return;
    localEvent(false);
    if (!dongclick) {
      setDongClick(true);
      console.log("동단위");
      setDongArea(dongarea.filter((el) => el == dongarea[num]));
      state.map?.setOptions({
        minZoom: 16,
        maxZoom: 16,
        center: {
          lng: dongarea[num].center.lat,
          lat: dongarea[num].center.lng,
        },
      });
      state.map?.setZoom(16, true);
    } else {
      setDongClick(false);
      console.log("구단위");
      const dongs = [] as any;
      dongData.forEach((e) => {
        if (e.gu == 11110) {
          dongs.push({
            name: e.name,
            center: { lat: e.lat, lng: e.lng },
            path: Object.values(JSON.parse(e.polygon)),
          });
        }
      });
      setDongArea(dongs);
      state.map?.setOptions({
        minZoom: 13,
        maxZoom: 13,
        center: {
          lat: 37.5991103,
          lng: 126.983882,
        },
      });
      state.map?.setZoom(13, true);
      localEvent(true);
      setSido(false);
    }
  }, [num]);
  useEffect(() => {
    if (state.map === undefined) return;
    const polygon = new naver.maps.Polygon({
      map: state.map,
      paths: [[]],
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      strokeColor: "#ff0000",
      strokeOpacity: 0.6,
      strokeWeight: 3,
      clickable: true,
    });
    setpoly(polygon);
  }, [state.map]);
  const handleClick = (num: number) => {
    setLocalarea(localarea.filter((el) => el == localarea[num]));
    state.map?.setOptions({
      minZoom: 13,
      maxZoom: 13,
      center: {
        lat: 37.5991103,
        lng: 126.983882,
      },
    });
    state.map?.setZoom(13, true);
    localEvent(true);
    setSido(false);
    state.map?.setOptions({
      //draggable: false,
    });
  };
  const handleDongClick = (num: number) => {
    localEvent(false);
    if (!dongclick) {
      setDongClick(true);
      setNumb(num);
      setDongArea(dongarea.filter((el) => el == dongarea[num]));
      state.map?.setOptions({
        minZoom: 16,
        maxZoom: 16,
        center: {
          lng: dongarea[num].center.lat,
          lat: dongarea[num].center.lng,
        },
      });
      state.map?.setZoom(16, true);
    } else {
      setNumb(-1);
      setDongClick(false);
      const dongs = [] as any;
      dongData.forEach((e) => {
        if (e.gu == 11110) {
          dongs.push({
            name: e.name,
            center: { lat: e.lat, lng: e.lng },
            path: Object.values(JSON.parse(e.polygon)),
          });
        }
      });
      setDongArea(dongs);
      state.map?.setOptions({
        minZoom: 13,
        maxZoom: 13,
        center: {
          lat: 37.5991103,
          lng: 126.983882,
        },
      });
      state.map?.setZoom(13, true);
      localEvent(true);
      setSido(false);
    }
  };
  const handlesi = () => {
    setNumb(-1);
    const datas = [] as any;
    sidoData.forEach((e) => {
      if (e.parent == "11") {
        const local = JSON.parse(e.polygon);
        datas.push({ name: e.name, path: Object.values(local) });
      }
    });
    setLocalarea(datas);
    state.map?.setOptions({
      center: {
        lat: 37.5641103,
        lng: 126.983882,
      },
      minZoom: 11,
      maxZoom: 11,
      draggable: true,
    });
    const dongs = [] as any;
    dongData.forEach((e) => {
      if (e.gu == 11110) {
        dongs.push({
          name: e.name,
          center: { lat: e.lat, lng: e.lng },
          path: Object.values(JSON.parse(e.polygon)),
          zoom: e.zoom === undefined ? 17 : e.zoom,
        });
      }
    });
    setDongArea(dongs);
    state.map?.setZoom(11, true);
    setDongClick(false);
    localEvent(false);
    setSido(true);
  };

  const OnDrawPolygon = () => {
    console.log("드로우");
    if (poly === undefined) return;

    naver.maps.Event.addListener(state.map, "click", function (e) {
      const point: naver.maps.LatLng = e.coord;
      const path = poly.getPaths();
      console.log(path);
      path.push(point);
      //console.log(polygon)
      new naver.maps.Marker({
        map: state.map,
        position: point,
      });
    });
  };
  /*   const handleButton = () => {
    console.log("버튼");
    //localEvent(false);
    //setSido(true);
    /* const datas = [] as any;
    sidoData.forEach((e) => {
      if (e.parent == "11") {
        const local = JSON.parse(e.polygon);
        datas.push({ name: e.name, path: Object.values(local) });
      }
    });
    setLocalarea(datas);
  }; */
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="auto" maxW="auto">
          <ModalHeader>다이얼로그 박스</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            maxH="75vh"
            overflowY="auto"
            __css={{
              "::-webkit-scrollbar": {
                w: "3px",
              },
              "::-webkit-scrollbar-thumb": {
                borderRadius: "5",
                bg: `bg.primary`,
              },
            }}
          >
            다이얼로그
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CustomControl id={"Control"} bindingPosition="BOTTOM_CENTER">
        <div style={{ position: "relative", right: "125px", top: "-100px" }}>
          <button
            style={{
              color: "red",
              height: "50px",
            }}
            onClick={() => OnDrawPolygon()}
          >
            좌 버튼 컨트롤
          </button>
          <button
            style={{
              color: "black",
              height: "50px",
            }}
            onClick={() => console.log("우")}
          >
            우 버튼 컨트롤
          </button>
          <button
            style={{
              color: "black",
              height: "50px",
            }}
            onClick={() => console.log("매")}
          >
            먀ㅐ 버튼 컨트롤
          </button>
        </div>
      </CustomControl>
      <CustomControl id={"Control1"} bindingPosition="TOP_CENTER">
        <div style={{ position: "relative", right: "125px" }}>
          <button
            style={{
              color: "red",
              height: "50px",
            }}
            onClick={() => {
              // setModalIsOpen(true);
              onOpen();
            }}
          >
            좌 버튼 컨트롤
          </button>
          <button
            style={{
              color: "black",
              height: "50px",
            }}
            onClick={() => {
              handlesi();
            }}
          >
            우 버튼 컨트롤
          </button>
          <button
            style={{
              color: "black",
              height: "50px",
            }}
            onClick={() => console.log("매")}
          >
            먀ㅐ 버튼 컨트롤
          </button>
        </div>
      </CustomControl>

      {sido ? (
        <ul style={{ position: "absolute" }}>
          {Array.from(
            { length: localarea.length },
            (value, index) => index
          ).map((num) => (
            <li hidden key={num}>
              <InteractDong
                onClick={(event: MouseEvent) => {
                  handleClick(num);
                }}
                selectDong={() => {}}
                name={localarea[num].name}
                num={num}
                path={localarea[num].path}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul style={{ position: "absolute" }}>
            {Array.from(
              { length: dongarea.length },
              (value, index) => index
            ).map((num) => (
              <li hidden key={num}>
                <InteractDong
                  onClick={(event: MouseEvent) => {
                    handleDongClick(num);
                  }}
                  name={dongarea[num].name}
                  num={num}
                  selectDong={selectDong}
                  center={dongarea[num].center}
                  path={dongarea[num].path}
                />
              </li>
            ))}
          </ul>
          {numb === -1 ? (
            <OverlayView
              id={"Over1"}
              position={{
                y: 37.6460103,
                x: 126.927882,
              }}
              pointerevent={false}
            >
              {/* <img
                src={Rounding}
                width={"700px"}
                height={"700px"}
                alt="testB"
              /> */}
            </OverlayView>
          ) : (
            <>
              <OverlayView
                id={"Over2"}
                position={{
                  y: Number(dongarea[0].center.lng) + 0.007,
                  x: Number(dongarea[0].center.lat) - 0.009,
                }}
                pointerevent={false}
              >
                {/* <img
                  src={Rounding}
                  width={"800px"}
                  height={"800px"}
                  alt="testA"
                /> */}
              </OverlayView>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AreaPanel;
