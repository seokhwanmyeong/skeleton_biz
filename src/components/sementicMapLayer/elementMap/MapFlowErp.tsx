//  Lib
import { Fragment, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Marker, NaverMapContext, Polygon } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Circle from "@src/lib/src/components/Overlay/Circle";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
import BrandListBox from "@components/sementicMapLayer/elementFilter/BrandListBox";
//  State
import {
  infoComErpBsnsD,
  infoComErpRent,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
import { atomSlctErp } from "@states/sementicMap/stateMap";
//  Util
import { bsDisColor } from "@util/define/bsDis";
import { getCenterPolygon } from "@util/map/distance";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
//  Deco
import { DecoFrameR } from "@components/sementicMapLayer/elementDeco/Deco";
//  Ani
import { infoAnimation, toolAnimation } from "@src/styles/animation/keyFremes";

const MapFlowErp = () => {
  const { state } = useContext(NaverMapContext);
  // const [slctErp, setSlctErp] = useRecoilState(atomSlctErp);
  const [slctErp, setSlctErp] = useState<{
    erpType?: "store" | "rent" | "bsDis";
    name: string;
    hoverId?: string;
    cursorPo: any;
  }>({
    erpType: undefined,
    name: "",
    hoverId: "",
    cursorPo: null,
  });
  const { show: storeShow, data: storeList } = useRecoilValue(infoComErpStore);
  const { show: rentShow, data: rentList } = useRecoilValue(infoComErpRent);
  const { show: bsDisShow, data: bsDisList } = useRecoilValue(infoComErpBsnsD);
  // const [cursorPo, setCursorPo] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetSlct = () => {
    setSlctErp({
      erpType: undefined,
      name: "",
      hoverId: "",
      cursorPo: null,
    });
  };

  useEffect(() => {
    isOpen && onClose();

    if (!state?.objects && !slctErp?.hoverId && state.objects.size === 0) {
      return;
    } else if (slctErp?.hoverId) {
      let obj: any = state?.objects.get(slctErp?.hoverId);
      if (
        obj &&
        (slctErp?.hoverId?.includes("markerStore") ||
          slctErp?.hoverId?.includes("markerRent"))
      ) {
        const pos = obj.getPosition();
        // setCursorPo([pos.x, pos.y]);
        setSlctErp({ ...slctErp, cursorPo: [pos.x, pos.y] });
      } else if (obj && slctErp?.hoverId?.includes("bsDisArea")) {
        const pos = getCenterPolygon(obj);
        // setCursorPo(pos);
        setSlctErp({ ...slctErp, cursorPo: pos });
      }
      onOpen();
    } else {
      // cursorPo && setCursorPo(null);
      resetSlct();
      onClose();
    }

    return () => {
      // setCursorPo(null);
      resetSlct();
    };
  }, [slctErp.hoverId]);

  // useEffect(() => {
  //   let single = 0;
  //   let circle = 0;
  //   let multi = 0;

  //   bsDisList.map((bs: any, idx: number) => {
  //     const { bisName, bsDisType, polygon, polygon_type, range, center } = bs;
  //     if (polygon_type === "circle") {
  //       if (!range || !center) {
  //         console.log("no range or center!", bs);
  //         console.log(range);
  //         console.log(center);
  //       } else {
  //         circle++;
  //       }
  //     }

  //     if (polygon_type === "single" && !polygon) {
  //       console.log("no polygon!", bs);
  //       console.log(polygon);
  //     } else if (polygon_type === "single") {
  //       single++;
  //     }
  //     if (polygon_type === "multi" && !polygon) {
  //       console.log("no multi polygon!", bs);
  //       console.log(polygon);
  //     } else if (polygon_type === "multi") {
  //       multi++;
  //     }
  //   });
  //   console.log(single, circle, multi);
  // }, [bsDisList]);

  return (
    <Fragment>
      <Flex
        w="100%"
        h="100%"
        justify="flex-end"
        zIndex={1}
        pointerEvents="none"
      >
        {(storeList.length > 0 ||
          rentList.length > 0 ||
          bsDisList.length > 0) && (
          <DecoFrameR pr="0.25rem">
            <BrandListBox
              store={storeList || []}
              rent={rentList || []}
              bsDis={bsDisList || []}
              slctErp={slctErp}
              setSlctErp={setSlctErp}
              reset={resetSlct}
            />
          </DecoFrameR>
        )}
      </Flex>
      {storeShow &&
        storeList?.length > 0 &&
        storeList.map((store, idx: number) => {
          const { storeName, lat, lng } = store;
          return (
            <Marker
              key={`markerStore-${idx}`}
              id={`markerStore-${idx}`}
              opts={{
                position: [lng, lat],
                icon: {
                  url: markerStore,
                },
              }}
              onClick={() => {}}
              onMouseOver={() => {
                setSlctErp({
                  erpType: "store",
                  cursorPo: null,
                  name: storeName,
                  hoverId: `markerStore-${idx}`,
                });
              }}
              onMouseOut={() => {
                resetSlct();
              }}
            />
          );
        })}
      {bsDisShow &&
        bsDisList?.length > 0 &&
        bsDisList.map((bs: any, idx: number) => {
          const { bisName, bsDisType, polygon, polygon_type, range, center } =
            bs;

          // if (polygon_type === "circle") {
          //   if (!range || !center) {
          //     console.log("no range or center!", bs);
          //     console.log(range);
          //     console.log(center);
          //   }
          // }

          // if (polygon_type === "single" && !polygon) {
          //   console.log("no polygon!", bs);
          //   console.log(polygon);
          // } else if (polygon_type === "single") {
          //   console.log("single polygon!", bs);
          //   console.log(polygon);
          // }

          // if (polygon_type === "multi" && !polygon) {
          //   console.log("no multi polygon!", bs);
          //   console.log(polygon);
          // } else if (polygon_type === "multi") {
          //   console.log("multi polygon!", bs);
          //   console.log(polygon);
          // }
          return polygon_type === "circle" ? (
            <Circle
              id={`circle-${idx}`}
              key={`circle-${idx}`}
              onMouseOver={(e: any) => {
                setSlctErp({
                  erpType: "bsDis",
                  cursorPo: null,
                  name: bisName,
                  hoverId: `markerStore-${idx}`,
                });
              }}
              onMouseOut={(e: any) => resetSlct()}
              opts={{
                fillColor: "#fadb14",
                center: center,
                radius: Number(range) || 0,
                fillOpacity: 0.3,
                strokeColor: "#FFFFFF",
                strokeOpacity: 0.5,
              }}
            />
          ) : polygon_type === "single" ? (
            <Polygon
              key={`bsDisArea-${idx}`}
              id={`bsDisArea-${idx}`}
              onMouseOver={(e: any) => {
                setSlctErp({
                  erpType: "bsDis",
                  cursorPo: null,
                  name: bisName,
                  hoverId: `markerStore-${idx}`,
                });
              }}
              onMouseOut={(e: any) => resetSlct()}
              opts={{
                paths: polygon,
                fillColor: bsDisColor[bsDisType] || "#FF7A45",
                fillOpacity: 0.35,
                strokeWeight: 2,
                clickable: false,
              }}
            />
          ) : null;
        })}
      {rentShow &&
        rentList?.length > 0 &&
        rentList.map((li, idx: number) => {
          const { rentName, lat, lng } = li;

          return (
            <Marker
              key={`markerRent-${idx}`}
              id={`markerRent-${idx}`}
              opts={{
                position: [Number(lng), Number(lat)],
                icon: {
                  url: markerRent,
                },
                title: rentName,
              }}
              onClick={() => {
                console.log(rentName);
              }}
              onMouseOver={() => {
                setSlctErp({
                  ...slctErp,
                  name: rentName,
                  hoverId: `markerRent-${idx}`,
                });
              }}
              onMouseOut={() => {
                setSlctErp({ ...slctErp, name: "", hoverId: "" });
              }}
            />
          );
        })}
      {isOpen && slctErp?.cursorPo && slctErp?.name && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(slctErp?.cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
            as={motion.div}
            animation={infoAnimation}
            pos="relative"
            top="-4.5rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="flex-start"
            align="flex-start"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
            whiteSpace="nowrap"
          >
            <Text
              textStyle="base"
              fontSize="sm"
              fontWeight="strong"
              lineHeight="normal"
              transition="0.3s"
              color="font.primary"
              whiteSpace="nowrap"
            >
              {slctErp?.name || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default MapFlowErp;
