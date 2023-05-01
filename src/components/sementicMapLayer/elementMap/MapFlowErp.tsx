//  Lib
import { Fragment, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Marker, NaverMapContext } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
import BrandListBox from "@components/sementicMapLayer/elementFilter/BrandListBox";
//  State
import {
  atomFilterFlow,
  infoComErpBsnsD,
  infoComErpRent,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiErpMap } from "@api/biz/config";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
import { IcoLineCurve } from "@assets/icons/icon";
//  Deco
import { DecoFrameR } from "@components/sementicMapLayer/elementDeco/Deco";
//  Util
import { bsDisColor } from "@util/define/bsDis";
import { atomSlctErp } from "@src/states/sementicMap/stateMap";

type Props = {};

const MapFlowErp = (props: Props) => {
  const { getStoreList, getRentList, getBsDisList } = apiErpMap;
  const { state, dispatch } = useContext(NaverMapContext);
  const [slctErp, setSlctErp] = useRecoilState(atomSlctErp);
  const { show: storeShow, data: storeList } = useRecoilValue(infoComErpStore);
  const { show: rentShow, data: rentList } = useRecoilValue(infoComErpRent);
  const { show: bsDisShow, data: bsDisList } = useRecoilValue(infoComErpBsnsD);
  const [store, setStore] = useState<any[]>([]);
  const [rent, setRent] = useState<any[]>([]);
  const [bsDis, setBsDis] = useState<any[]>([]);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (storeList.length > 0) {
      console.log(storeList);
      setStore(storeList);
    } else setStore([]);
  }, [storeList]);

  useEffect(() => {
    if (rentList.length > 0) {
      console.log(rentList);
      setRent(rentList);
    } else setRent([]);
  }, [rentList]);

  useEffect(() => {
    if (bsDisList.length > 0) {
      console.log(bsDisList);
      setBsDis(bsDisList);
    } else setBsDis([]);
  }, [bsDisList]);

  useEffect(() => {
    if (!state?.objects && !slctErp?.hoverId && state.objects.size === 0) {
      return;
    } else if (slctErp?.hoverId) {
      let marker: any;
      marker = state?.objects.get(slctErp?.hoverId);

      if (marker) {
        const pos = marker.getPosition();
        setCursorPo([pos.x, pos.y]);
        onOpen();
      }
    } else {
      cursorPo && setCursorPo(null);
      onClose();
    }
  }, [slctErp.hoverId]);

  return (
    <Fragment>
      <Flex
        w="100%"
        h="100%"
        justify="flex-end"
        zIndex={1}
        pointerEvents="none"
      >
        {(store.length > 0 || rent.length > 0 || bsDis.length > 0) && (
          <DecoFrameR pr="0.25rem">
            <BrandListBox
              store={store || []}
              rent={rent || []}
              bsDis={bsDis || []}
            />
          </DecoFrameR>
        )}
      </Flex>
      {storeShow &&
        store?.length > 0 &&
        store.map((store, idx: number) => {
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
                setCursorPo([lng, lat]);
                setSlctErp({
                  ...slctErp,
                  name: storeName,
                  hoverId: `markerStore-${idx}`,
                });
                onOpen();
              }}
              onMouseOut={() => {
                onClose();
                setCursorPo(null);
                setSlctErp({ ...slctErp, name: "", hoverId: "" });
              }}
            />
          );
        })}
      {bsDisShow &&
        bsDis?.length > 0 &&
        bsDis.map((bs: any, idx: number) => {
          const { bisName, bsDisType, polygon } = bs;
          return (
            <InteractArea
              key={`bsDisArea-${idx}`}
              onClick={() => {
                console.log("click");
              }}
              name={bisName}
              num={idx}
              path={polygon}
              style={{
                fillColor: bsDisColor[bsDisType] || "#FF7A45",
                fillOpacity: 0.35,
                strokeWeight: 0,
              }}
              hoverStyle={{
                fillColor: bsDisColor[bsDisType] || "#FF7A45",
                fillOpacity: 0.35,
                strokeWeight: 0,
              }}
              onMouse={() => {
                setSlctErp({ ...slctErp, hoverId: `bsDisArea-${idx}` });
              }}
              onMouseOut={() => {
                setSlctErp({ ...slctErp, hoverId: "" });
              }}
            />
          );
        })}
      {rentShow &&
        rent?.length > 0 &&
        rent.map((li, idx: number) => {
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
                setCursorPo([lng, lat]);
                setSlctErp({
                  ...slctErp,
                  name: rentName,
                  hoverId: `markerRent-${idx}`,
                });
                onOpen();
              }}
              onMouseOut={() => {
                onClose();
                setCursorPo(null);
                setSlctErp({ ...slctErp, name: "", hoverId: "" });
              }}
            />
          );
        })}
      {isOpen && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
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
            transition="0.3s"
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
