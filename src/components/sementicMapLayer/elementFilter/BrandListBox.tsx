//  Lib
import { useState, memo, Fragment, useEffect, useContext, useRef } from "react";
import { useSetRecoilState } from "recoil";
import {
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Circle from "@src/lib/src/components/Overlay/Circle";
import { Marker, NaverMapContext, Polygon } from "@src/lib/src";
//  State
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { getCenterPolygon } from "@util/map/distance";
import { bsDisColor } from "@util/define/map";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Ani
import { infoAnimation } from "@styles/animation/keyFremes";

type Props = {
  storeShow: boolean;
  bsDisShow: boolean;
  rentShow: boolean;
  store: any[];
  rent: any[];
  bsDis: TypeBsDis[];
};

type TypeBsDis = {
  _id: string;
  bisName: string;
  bsDisType: string;
  polygon_type: "circle" | "single" | "multi";
  polygon: any[];
  range: string;
  center: [number, number];
};

type BsDisList = {
  isShow: boolean;
  // isIn: boolean;
  // curZoom: number | null;
  // maxMin: any;
  idx: number;
  _id: string;
  bsDisName: string;
  bsDisType: string;
  polygonType: "circle" | "single" | "multi";
  polygon: any[];
  range: string;
  center: [number, number];
};

const BrandListBox = memo(
  ({ storeShow, bsDisShow, rentShow, store, rent, bsDis }: Props) => {
    const { state } = useContext(NaverMapContext);
    const [polyList, setPolyList] = useState<any[]>([]);
    const polyListRef = useRef<any[]>([]);

    useEffect(() => {
      // @ts-ignore
      if (!state.map || !bsDis || bsDis.length === 0) {
        return;
      }
      if (!state?.map) return;
      let zoom = state.map.getZoom();

      if (zoom < 13 && polyListRef.current.length > 0) {
        // setPolyList([]);
        polyListRef.current.map((poly: any) => poly.setMap(null));
        polyListRef.current = [];
      } else if (zoom >= 13) {
        const mapBounds: any = state.map.getBounds();
        const minLat = mapBounds._min._lat;
        const minLng = mapBounds._min._lng;
        const maxLat = mapBounds._max._lat;
        const maxLng = mapBounds._max._lng;

        const list: any = [];
        bsDis.map((li) => {
          if (li.polygon_type === "single") {
            const pos = li.center;

            if (
              pos[1] >= minLat &&
              pos[1] <= maxLat &&
              pos[0] >= minLng &&
              pos[0] <= maxLng
            ) {
              const poly = new naver.maps.Polygon({
                map: state.map,
                paths: li.polygon,
                fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
                fillOpacity: 0.35,
                strokeWeight: 2,
                clickable: true,
              });

              list.push(poly);
            }
          }
        });

        polyListRef.current = list;
      } else {
        if (polyListRef.current.length > 0) {
          // setPolyList([]);
          polyListRef.current.map((poly: any) => poly.setMap(null));
          polyListRef.current = [];
        }
      }

      let timer: any;
      const panningEventHandelr = naver.maps.Event.addListener(
        state.map,
        "bounds_changed",
        (e) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            if (!state?.map) return;
            let zoom = state.map.getZoom();

            if (zoom < 13 && polyListRef.current.length > 0) {
              // setPolyList([]);
              polyListRef.current.map((poly: any) => poly.setMap(null));
              polyListRef.current = [];
            } else if (zoom >= 13) {
              const mapBounds: any = e;
              const minLat = mapBounds._min._lat;
              const minLng = mapBounds._min._lng;
              const maxLat = mapBounds._max._lat;
              const maxLng = mapBounds._max._lng;

              polyListRef.current.map((poly: any) => poly.setMap(null));
              polyListRef.current = [];

              const list: any = [];
              bsDis.map((li) => {
                if (li.polygon_type === "single") {
                  const pos = li.center;

                  if (
                    pos[1] >= minLat &&
                    pos[1] <= maxLat &&
                    pos[0] >= minLng &&
                    pos[0] <= maxLng
                  ) {
                    const poly = new naver.maps.Polygon({
                      map: state.map,
                      paths: li.polygon,
                      fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
                      fillOpacity: 0.35,
                      strokeWeight: 2,
                      clickable: true,
                    });

                    list.push(poly);
                  }
                }
              });

              polyListRef.current = list;

              // @ts-ignore
              // const list = bsDis.filter((li) => {
              //   if (li.polygon_type === "single") {
              //     const pos = li.center;
              //     return (
              //       pos[1] >= minLat &&
              //       pos[1] <= maxLat &&
              //       pos[0] >= minLng &&
              //       pos[0] <= maxLng
              //     );
              //   } else return false;
              // });
              // setPolyList(list);
            } else {
              if (polyListRef.current.length > 0) {
                // setPolyList([]);
                polyListRef.current.map((poly: any) => poly.setMap(null));
                polyListRef.current = [];
              }
            }
          }, 500);
        }
      );

      return () => {
        polyListRef.current.map((poly: any) => poly.setMap(null));
        polyListRef.current = [];
        naver.maps.Event.removeListener(panningEventHandelr);
      };
    }, [state, bsDis]);

    return (
      <Flex
        pos="relative"
        m="0.1875rem 0"
        p="1rem 1.375rem 1rem"
        w="100%"
        h="100%"
        direction="column"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRight="none"
        bg="linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
        backdropFilter="blur(2px)"
      >
        <Flex
          w="100%"
          h="fit-content"
          justify="center"
          align="center"
          gap="0.75rem"
        >
          <Heading
            as={"h5"}
            bg="none"
            fontSize="sm"
            lineHeight="1px"
            color="font.title"
            textAlign="center"
          >
            매장 조회
          </Heading>
        </Flex>
        <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
        <Tabs variant="depthListBox">
          <TabList border="none">
            {store && store.length > 0 && <Tab>매장</Tab>}
            {bsDis && bsDis.length > 0 && <Tab>상권</Tab>}
            {rent && rent.length > 0 && <Tab>매물</Tab>}
          </TabList>
          <TabPanels>
            {store && store.length > 0 && (
              <TabPanel>
                <ListStore storeShow={storeShow} storeList={store} />
              </TabPanel>
            )}
            {bsDisShow && bsDis && bsDis.length > 0 && (
              <TabPanel>
                <ListBsDis bsDisShow={bsDisShow} bsDisList={bsDis} />
              </TabPanel>
            )}
            {rent && rent.length > 0 && (
              <TabPanel>
                <ListRent rentShow={rentShow} rentList={rent} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
        {/* {polyList &&
          polyList.length > 0 &&
          polyList.map((poly, idx) => {
            const { polygon_type, center, range, polygon, bsDisType } = poly;
            return polygon_type === "circle" ? (
              <Circle
                id={`circle-${idx}`}
                key={`circle-${idx}`}
                // onMouseOver={(e: any) => onHover(true)}
                // onMouseOut={(e: any) => onHover(false)}
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
                // onMouseOver={(e: any) => onHover(true)}
                // onMouseOut={(e: any) => onHover(false)}
                opts={{
                  paths: polygon,
                  fillColor: bsDisColor[bsDisType] || "#FF7A45",
                  fillOpacity: 0.35,
                  strokeWeight: 2,
                  clickable: true,
                }}
              />
            ) : null;
          })} */}
      </Flex>
    );
  }
);

const ListStore = memo(({ storeShow, storeList }: any) => {
  return storeList ? (
    <List display="flex" flexDirection="column">
      {storeList.map(
        ({ _id, storeName, addr, storePhone, lat, lng }: any, idx: number) => (
          <ListItemStore
            key={`storeList-${idx}`}
            isShow={storeShow}
            idx={idx}
            _id={_id}
            storeName={storeName}
            addr={addr}
            storePhone={storePhone}
            lat={lat}
            lng={lng}
          />
        )
      )}
    </List>
  ) : null;
});

const ListItemStore = ({
  isShow,
  idx,
  _id,
  storeName,
  addr,
  storePhone,
  lat,
  lng,
}: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerStore-${idx}`);

      if (obj) {
        const pos = obj.getPosition();
        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  return (
    <Fragment>
      <ListItem
        key={`storeListItem-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="1.25rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        bg={
          isHover
            ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
            : "transparent"
        }
        _hover={{
          fontWeight: "strong",
          cursor: "pointer",
        }}
        onClick={() => {
          setSv({
            viewId: "storeInfo",
            props: {
              id: _id,
              name: storeName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex justify="center" align="center" flex="none">
          <Image src={markerStore} w="auto" bg="transparent" border="0" />
        </Flex>
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1"
            color="font.primary"
          >
            {storeName}
          </Text>
          <Text
            mt="0.3rem"
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
            noOfLines={1}
          >
            {addr}
          </Text>
          <Text
            mt="0.3rem"
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
          >
            {storePhone}
          </Text>
        </Flex>
      </ListItem>
      {isShow && lat && lng && (
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
          onMouseOver={() => onHover(true)}
          onMouseOut={() => onHover(false)}
        />
      )}
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
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
              {storeName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const ListBsDis = ({
  bsDisShow,
  bsDisList,
}: {
  bsDisShow: boolean;
  bsDisList: TypeBsDis[];
}) => {
  const { state } = useContext(NaverMapContext);
  // const [curZoom, setCurZoom] = useState<number | null>(null);
  // const [maxMin, setMaxMin] = useState<{
  //   max: [number, number];
  //   min: [number, number];
  // } | null>(null);

  // useEffect(() => {
  //   if (!state?.map) return;
  //   if (!curZoom) {
  //     let zoom = state.map.getZoom();
  //     setCurZoom(zoom);
  //   }

  //   const zoomEventHandelr = naver.maps.Event.addListener(
  //     state.map,
  //     "zoom_changed",
  //     (e: number) => {
  //       console.log("zoom", e);
  //       setCurZoom(e);
  //     }
  //   );
  //   let timer: any;
  //   const panningEventHandelr = naver.maps.Event.addListener(
  //     state.map,
  //     "bounds_changed",
  //     (e) => {
  //       if (timer) clearTimeout(timer);

  //       timer = setTimeout(function () {
  //         setMaxMin({ max: [e._max.y, e._max.x], min: [e._min.y, e._min.x] });
  //       }, 500);
  //     }
  //   );

  //   return () => {
  //     naver.maps.Event.removeListener(zoomEventHandelr);
  //     naver.maps.Event.removeListener(panningEventHandelr);
  //   };
  // }, [state]);
  console.log("render");
  return bsDisList ? (
    <List display="flex" flexDirection="column">
      {bsDisList.map(
        (
          {
            _id,
            bisName,
            bsDisType,
            polygon,
            polygon_type,
            range,
            center,
          }: TypeBsDis,
          idx: number
        ) => {
          return (
            <ListItemBsDis
              key={`bsDisList-${idx}`}
              isShow={bsDisShow}
              // curZoom={curZoom}
              // maxMin={maxMin}
              // isIn={isIn && curZoom && curZoom >= 13 ? true : false}
              idx={idx}
              _id={_id}
              bsDisName={bisName}
              bsDisType={bsDisType}
              polygonType={polygon_type}
              polygon={polygon}
              range={range}
              center={center}
            />
          );
        }
      )}
    </List>
  ) : null;
};

const ListItemBsDis = ({
  isShow,
  // isIn,
  // curZoom,
  // maxMin,
  idx,
  _id,
  bsDisName,
  bsDisType,
  polygonType,
  polygon,
  range,
  center,
}: BsDisList) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  // const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);
  // const [isIn, setIsIn] = useState<boolean>(false);
  const polygonRef = useRef<any>(null);

  const getCenter = (paths: [number, number][]): [number, number] => {
    const arr = paths;
    const length = arr.length;
    let xcos = 0;
    let ycos = 0;
    let area = 0;

    for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
      let p1 = arr[i];
      let p2 = arr[j];

      let f = p1[1] * p2[0] - p2[1] * p1[0];
      xcos += (p1[0] + p2[0]) * f;
      ycos += (p1[1] + p2[1]) * f;
      area += f * 3;
    }

    return [xcos / area, ycos / area];
  };

  // useEffect(() => {
  //   if (isHover && state?.objects && state.objects.size !== 0) {
  //     let obj: any = state?.objects.get(`bsDisArea-${idx}`);

  //     if (obj) {
  //       const pos = getCenterPolygon(obj);

  //       setCursorPo(pos);
  //     }
  //   } else {
  //     setCursorPo(null);
  //   }
  // }, [isHover]);

  // useEffect(() => {
  //   if (!state?.map) return;
  //   if (polygonType !== "single") return;

  //   let timer: any;
  //   const panningEventHandelr = naver.maps.Event.addListener(
  //     state.map,
  //     "bounds_changed",
  //     (e) => {
  //       if (timer) clearTimeout(timer);
  //       timer = setTimeout(function () {
  //         if (!state?.map) return;
  //         let zoom = state.map.getZoom();

  //         if (zoom < 13 && polygonRef.current) {
  //           if (polygonRef.current.getVisible()) {
  //             polygonRef.current.setVisible(false);
  //             // polygonRef.current.setMap(null);
  //             polygonRef.current = null;
  //           }
  //           // else {
  //           //   polygonRef.current.setMap(null);
  //           //   polygonRef.current = null;
  //           // }
  //         } else if (zoom >= 13) {
  //           const mapBounds: any = e;
  //           const minLat = mapBounds._min._lat;
  //           const minLng = mapBounds._min._lng;
  //           const maxLat = mapBounds._max._lat;
  //           const maxLng = mapBounds._max._lng;
  //           const pos = center;

  //           if (!polygonRef.current) {
  //             const poly = new naver.maps.Polygon({
  //               map: state.map,
  //               paths: polygon,
  //             });
  //             polygonRef.current = poly;
  //             const isVisible = polygonRef.current.getVisible();

  //             pos[1] >= minLat &&
  //             pos[1] <= maxLat &&
  //             pos[0] >= minLng &&
  //             pos[0] <= maxLng
  //               ? !isVisible && polygonRef.current.setVisible(true)
  //               : isVisible && polygonRef.current.setVisible(false);
  //           } else {
  //             const isVisible = polygonRef.current.getVisible();

  //             pos[1] >= minLat &&
  //             pos[1] <= maxLat &&
  //             pos[0] >= minLng &&
  //             pos[0] <= maxLng
  //               ? !isVisible && polygonRef.current.setVisible(true)
  //               : isVisible && polygonRef.current.setVisible(false);
  //           }
  //         } else {
  //           if (polygonRef.current && polygonRef.current.getVisible()) {
  //             polygonRef.current.setVisible(false);
  //             // polygonRef.current = null;
  //           }
  //         }
  //       }, 500);
  //     }
  //   );

  //   return () => {
  //     polygonRef.current && polygonRef.current?.setMap(null);
  //     polygonRef.current = null;
  //     naver.maps.Event.removeListener(panningEventHandelr);
  //   };
  // }, [state]);

  return (
    <Fragment>
      <ListItem
        key={`bsDisListItem-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="1rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        bg={
          isHover
            ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
            : "transparent"
        }
        _hover={{
          fontWeight: "strong",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log("click");
          setSv({
            viewId: "bsDisInfo",
            props: {
              id: _id,
              name: bsDisName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex
          w="20px"
          h="20px"
          flex="none"
          justify="center"
          align="center"
          bgColor={bsDisColor[bsDisType]}
          borderRadius="50%"
        />
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            color="font.primary"
            noOfLines={1}
          >
            {bsDisName}
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
          >
            {bsDisType}
          </Text>
        </Flex>
      </ListItem>
      {/* {isShow &&
        (polygonType === "circle" ? (
          <Circle
            id={`circle-${idx}`}
            key={`circle-${idx}`}
            onMouseOver={(e: any) => onHover(true)}
            onMouseOut={(e: any) => onHover(false)}
            opts={{
              fillColor: "#fadb14",
              center: center,
              radius: Number(range) || 0,
              fillOpacity: 0.3,
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.5,
            }}
          />
        ) : polygonType === "single" ? (
          <Polygon
            key={`bsDisArea-${idx}`}
            id={`bsDisArea-${idx}`}
            onMouseOver={(e: any) => onHover(true)}
            onMouseOut={(e: any) => onHover(false)}
            opts={{
              paths: polygon,
              fillColor: bsDisColor[bsDisType] || "#FF7A45",
              fillOpacity: 0.35,
              strokeWeight: 2,
              clickable: true,
              visible: isIn ? true : false,
            }}
          />
        ) : null)}
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
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
              {bsDisName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )} */}
    </Fragment>
  );
};

const ListRent = memo(({ rentShow, rentList }: any) => {
  return rentList ? (
    <List display="flex" flexDirection="column">
      {rentList.map(({ _id, rentName, addr, lat, lng }: any, idx: number) => (
        <ListItemRent
          key={`rentList-${idx}`}
          isShow={rentShow}
          idx={idx}
          _id={_id}
          rentName={rentName}
          addr={addr}
          lat={lat}
          lng={lng}
        />
      ))}
    </List>
  ) : null;
});

const ListItemRent = ({ isShow, idx, _id, rentName, addr, lat, lng }: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerRent-${idx}`);

      if (obj) {
        const pos = obj.getPosition();
        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  console.log(isShow && lat && lng);
  console.log(lat, lng);

  return (
    <Fragment>
      <ListItem
        key={`rentListItem-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="0.75rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        bg={
          isHover
            ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
            : "transparent"
        }
        _hover={{
          fontWeight: "strong",
          cursor: "pointer",
        }}
        onClick={() => {
          setSv({
            viewId: "rentInfo",
            props: {
              id: _id,
              name: rentName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex justify="center" align="center" flex="none">
          <Image src={markerRent} w="auto" bg="transparent" border="0" />
        </Flex>
        <Flex direction="column" gap="0.5rem">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1"
            color="font.primary"
          >
            {rentName}
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
            noOfLines={1}
          >
            {addr}
          </Text>
        </Flex>
      </ListItem>
      {isShow && lat && lng && (
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
          onMouseOver={() => onHover(true)}
          onMouseOut={() => onHover(false)}
        />
      )}
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
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
              {rentName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default BrandListBox;
