//  Lib
import { useContext, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import CustomControl from "@src/lib/src/components/Control/CustomControl";
//  Components
import DecoTop from "@components/sementicMapLayer/sementicFilter/DecoTop";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
//  Icons
import { IcoAppStore } from "@assets/icons/icon";

type Props = {};

const MapFlowFind = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [addr, setAddr] = useState<any>(null);

  const drawingPolyId = "drawingPoly-manager";
  const [toggle, setToggle] = useState(false);
  const [shapeCount, setShapeCount] = useState(0);
  const shapeCountRef = useRef(0);
  const [values, setValues] = useState<string[]>([]);

  const handleToggle = (values: string[]) => {
    setValues(values);
  };

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    // if(prev)
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
    <CustomControl id={"Draw"} bindingPosition="TOP_CENTER">
      <div style={{ position: "relative", top: "1rem" }}>
        <ToggleButtonGroup />
      </div>
    </CustomControl>
  );
};

const ToggleButtonGroup = () => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useContext(NaverMapContext);
  const [poly, setpoly] = useState<naver.maps.Polygon | undefined>();
  const markerRef = useRef<any[]>([]);

  const mapClickEvent = (e?: any) => {
    console.log(e.coord);
  };

  const handleClick = (idx: number) => {
    if (activeIdx === idx) {
      setActiveIdx(-1);
    } else {
      setActiveIdx(idx);
    }

    if (idx === 0) {
      console.log("폴리곤 그리기");
      naver.maps.Event.addListener(state.map, "click", OnDrawPolygon);
    } else {
      alert("폴리곤 그리기 중단");
      naver.maps.Event.removeListener(OnDrawPolygon);
      console.log(markerRef.current);
    }
  };

  const OnDrawPolygon = () => {
    console.log("드로우");
    if (poly === undefined) return;

    naver.maps.Event.addListener(state.map, "click", function (e) {
      const point: naver.maps.LatLng = e.coord;
      const path: any = poly.getPaths();
      console.log(path);
      path.push(point);
      //console.log(polygon)
      const marker = new naver.maps.Marker({
        map: state.map,
        position: point,
      });
      markerRef.current.push(marker);
    });
  };

  const addrSlctHandler = (addr: any) => {
    const { address } = addr;
    console.log(addr);
    onClose();
  };

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
    markerRef.current = [];
  }, [state.map]);

  return (
    <>
      <Flex
        pos="absolute"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"0.5rem"}
        direction="column"
      >
        <Flex gap="1rem">
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
              } else {
                handleClick(2);
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
          주소를 검색하세요.
        </Button>
        <DecoTop width="13rem" />
      </Flex>
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
    </>
  );
};

export default MapFlowFind;
