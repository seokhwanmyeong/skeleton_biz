//  Lib
import { Fragment, useState, useContext } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Button, Flex } from "@chakra-ui/react";
import { NaverMapContext, Polygon } from "@src/lib/src";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Component
import DrawPolygon from "@components/sementicMapLayer/createDrawBox/DrawPolygon";
import DrawRange from "@components/sementicMapLayer/createDrawBox/DrawRange";
import DrawAddr from "@components/sementicMapLayer/createDrawBox/DrawAddr";
//  State
import { atomCreateArea } from "@states/sementicMap/stateMap";
//  Icon
import { IcoAppStore, IcoCloseCircle } from "@assets/icons/icon";

const DrawBox = ({ toolOpen, setLocalModalIdx, onOpen, onClose }: any) => {
  const { state } = useContext(NaverMapContext);
  const createArea = useRecoilValue(atomCreateArea);
  const resetCreateArea = useResetRecoilState(atomCreateArea);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <Fragment>
      {/* <Flex
        pos="absolute"
        bottom="5.25rem"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        p="0.5rem 0"
        w="29.5rem"
        justify="center"
        gap="1.5rem"
        bgColor="#FFFFFFBF"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="34px"
      > */}
      <Button
        variant="filterTop02"
        isActive={activeIdx === 0}
        onClick={() => {
          resetCreateArea();
          activeIdx === 0 ? setActiveIdx(-1) : setActiveIdx(0);
        }}
      >
        <Box>
          <IcoAppStore />
        </Box>
        그리기
      </Button>
      <Button
        variant="filterTop02"
        isActive={activeIdx === 1}
        onClick={() => {
          resetCreateArea();
          activeIdx === 1 ? setActiveIdx(-1) : setActiveIdx(1);
        }}
      >
        <Box>
          <IcoAppStore />
        </Box>
        반경
      </Button>
      <Button
        variant="filterTop02"
        isActive={activeIdx === 2}
        onClick={() => {
          resetCreateArea();
          activeIdx === 2 ? setActiveIdx(-1) : setActiveIdx(2);
        }}
      >
        <Box>
          <IcoAppStore />
        </Box>
        주소지
      </Button>
      <Button
        variant="filterTop02"
        onClick={() => {
          onClose();
          setLocalModalIdx(0);
          resetCreateArea();
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
      {/* </Flex> */}
      {activeIdx === 0 && (
        <DrawPolygon modalOpen={onOpen} setActiveIdx={setActiveIdx} />
      )}
      {activeIdx === 1 && (
        <DrawRange modalOpen={onOpen} setActiveIdx={setActiveIdx} />
      )}
      {activeIdx === 2 && (
        <DrawAddr modalOpen={onOpen} setTopActiveIdx={setActiveIdx} />
      )}
      {state.map && createArea && createArea.pathType === "polygon" ? (
        <Polygon
          key={`createArea`}
          id={`createArea`}
          opts={{
            paths: createArea.path,
            fillColor: "#000000",
            fillOpacity: 0.35,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
            clickable: false,
          }}
        />
      ) : state.map && createArea && createArea.pathType === "circle" ? (
        <Circle
          id={`createArea`}
          key={`createArea`}
          opts={{
            center: createArea.center,
            radius: Number(createArea.range) || 0,
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: "#000000",
            fillOpacity: 0.5,
            clickable: false,
          }}
        />
      ) : null}
    </Fragment>
  );
};

export default DrawBox;
