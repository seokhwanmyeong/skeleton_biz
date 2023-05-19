//  Lib
import {
  useState,
  memo,
  Fragment,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
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
import { NaverMapContext, Polygon } from "@src/lib/src";
//  State
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { bsDisColor } from "@util/define/map";
import { pathAvg } from "@util/map/distance";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
import IcoListRent from "@assets/icons/list_rent.png";
import markerCluster from "@assets/icons/marker_cluster.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Ani
import { infoAnimation } from "@styles/animation/keyFremes";
import { RentList, StoreList } from "@src/api/bizSub/type";

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
  bsDisName: string;
  bsDisCode: string;
  polygonType: "circle" | "single" | "multi";
  geometry: {
    type: string;
    coordinates: any[];
  };
  range?: string;
  center: [number, number];
};

type BsDisList = {
  isShow: boolean;
  idx: number;
  _id: string;
  bsDisName: string;
  bsDisType: string;
  bsDisCode: string;
  polygonType: "circle" | "single" | "multi";
  geometry: any;
  range: Number;
  center: [number, number];
};

const BrandListBox = memo(
  ({ storeShow, bsDisShow, rentShow, store, rent, bsDis }: Props) => {
    const { state, dispatch } = useContext(NaverMapContext);
    const [bsList, setBsList] = useState<any[] | null>(null);
    const [cursorPo, setCursorPo] = useState<any>(null);
    const [name, setName] = useState<any>(null);
    const [tabList, setTabList] = useState<any[]>([]);
    const [tabIdx, setTabIdx] = useState<number>(0);
    const polygonRef = useRef<any[] | null>([]);

    useEffect(() => {
      let count = [];
      if (store.length > 0) count.push("store");
      if (bsDis.length > 0) count.push("bsDis");
      if (rent.length > 0) count.push("rent");

      setTabList(count);
    }, [store, bsDis, rent]);

    useEffect(() => {
      if (!state?.map) return;
      let zoom = state.map.getZoom();

      if (zoom < 13) {
        setBsList([]);
      } else if (zoom >= 13) {
        const list: any = [];

        if (bsDis && bsDis.length > 0) {
          bsDis.map((li) => {
            const mapBounds: any = state.map?.getBounds();
            const minLat = mapBounds._min._lat;
            const minLng = mapBounds._min._lng;
            const maxLat = mapBounds._max._lat;
            const maxLng = mapBounds._max._lng;

            if (li.polygonType === "single") {
              if (
                li.center[1] >= minLat &&
                li.center[1] <= maxLat &&
                li.center[0] >= minLng &&
                li.center[0] <= maxLng
              ) {
                list.push(li);
              }
            } else if (li.polygonType === "circle") {
              if (
                li.center[1] >= minLat &&
                li.center[1] <= maxLat &&
                li.center[0] >= minLng &&
                li.center[0] <= maxLng
              ) {
                list.push(li);
              }
            }
          });
        }
        setBsList(list);
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

            if (zoom < 13) {
              setBsList([]);
            } else if (zoom >= 13) {
              const mapBounds: any = e;
              const minLat = mapBounds._min._lat;
              const minLng = mapBounds._min._lng;
              const maxLat = mapBounds._max._lat;
              const maxLng = mapBounds._max._lng;

              const list: any = [];

              if (bsDis && bsDis.length > 0) {
                bsDis.map((li) => {
                  if (li.polygonType === "single") {
                    if (
                      li.center[1] >= minLat &&
                      li.center[1] <= maxLat &&
                      li.center[0] >= minLng &&
                      li.center[0] <= maxLng
                    ) {
                      list.push(li);
                    }
                  } else if (li.polygonType === "circle") {
                    if (
                      li.center[1] >= minLat &&
                      li.center[1] <= maxLat &&
                      li.center[0] >= minLng &&
                      li.center[0] <= maxLng
                    ) {
                      list.push(li);
                    }
                  }
                });
              }

              setBsList(list);
            } else {
              setBsList([]);
            }
          }, 300);
        }
      );

      return () => {
        setBsList(null);
        naver.maps.Event.removeListener(panningEventHandelr);
      };
    }, [state, bsDis, bsDisShow]);
    // useEffect(() => {
    //   if (!state?.map) return;
    //   let zoom = state.map.getZoom();

    //   if (zoom < 13 && polygonRef.current && polygonRef.current.length > 0) {
    //     polygonRef.current.map((poly) => poly.setMap(null));
    //     return;
    //   } else if (zoom >= 13) {
    //     if (polygonRef.current && polygonRef.current.length > 0) {
    //       polygonRef.current.map((poly) => poly.setMap(null));
    //     } else {
    //       const list: any = [];

    //       if (bsDis && bsDis.length > 0) {
    //         bsDis.map(
    //           (li: {
    //             _id: string;
    //             bisName: string;
    //             bsDisType: string;
    //             polygon_type: "circle" | "single" | "multi";
    //             polygon: any[];
    //             range: string;
    //             center: [number, number];
    //           }) => {
    //             const mapBounds: any = state.map?.getBounds();
    //             const minLat = mapBounds._min._lat;
    //             const minLng = mapBounds._min._lng;
    //             const maxLat = mapBounds._max._lat;
    //             const maxLng = mapBounds._max._lng;

    //             if (li.polygon_type === "single") {
    //               if (
    //                 li.center[1] >= minLat &&
    //                 li.center[1] <= maxLat &&
    //                 li.center[0] >= minLng &&
    //                 li.center[0] <= maxLng
    //               ) {
    //                 const poly = new naver.maps.Polygon({
    //                   map: state.map,
    //                   paths: li.polygon,
    //                   fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
    //                   fillOpacity: 0.5,
    //                   strokeWeight: 1,
    //                   strokeColor: "#FFFFFF",
    //                   clickable: true,
    //                 });

    //                 list.push(poly);
    //               }
    //             } else if (li.polygon_type === "circle") {
    //             }
    //           }
    //         );
    //       }

    //       polygonRef.current = list;
    //     }
    //   }

    //   let timer: any;
    //   const panningEventHandelr = naver.maps.Event.addListener(
    //     state.map,
    //     "bounds_changed",
    //     (e) => {
    //       if (timer) clearTimeout(timer);
    //       timer = setTimeout(function () {
    //         if (!state?.map) return;
    //         let zoom = state.map.getZoom();

    //         if (
    //           zoom < 13 &&
    //           polygonRef.current &&
    //           polygonRef.current.length > 0
    //         ) {
    //           polygonRef.current.map((poly) => poly.setMap(null));
    //           polygonRef.current = [];
    //         } else if (zoom >= 13) {
    //           const mapBounds: any = e;
    //           const minLat = mapBounds._min._lat;
    //           const minLng = mapBounds._min._lng;
    //           const maxLat = mapBounds._max._lat;
    //           const maxLng = mapBounds._max._lng;

    //           if (!polygonRef.current) {
    //             const list: any = [];

    //             if (bsDis && bsDis.length > 0) {
    //               bsDis.map(
    //                 (li: {
    //                   _id: string;
    //                   bisName: string;
    //                   bsDisType: string;
    //                   polygon_type: "circle" | "single" | "multi";
    //                   polygon: any[];
    //                   range: string;
    //                   center: [number, number];
    //                 }) => {
    //                   if (li.polygon_type === "single") {
    //                     if (
    //                       li.center[1] >= minLat &&
    //                       li.center[1] <= maxLat &&
    //                       li.center[0] >= minLng &&
    //                       li.center[0] <= maxLng
    //                     ) {
    //                       const poly = new naver.maps.Polygon({
    //                         map: state.map,
    //                         paths: li.polygon,
    //                         fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
    //                         fillOpacity: 0.5,
    //                         strokeWeight: 1,
    //                         strokeColor: "#FFFFFF",
    //                         clickable: true,
    //                       });

    //                       list.push(poly);
    //                     }
    //                   } else if (li.polygon_type === "circle") {
    //                   }
    //                 }
    //               );
    //             } else {
    //               return;
    //             }

    //             polygonRef.current = list;
    //           } else {
    //             const list: any = [];
    //             polygonRef.current.map((poly) => poly.setMap(null));
    //             polygonRef.current = [];

    //             if (bsDis && bsDis.length > 0) {
    //               bsDis.map(
    //                 (li: {
    //                   _id: string;
    //                   bisName: string;
    //                   bsDisType: string;
    //                   polygon_type: "circle" | "single" | "multi";
    //                   polygon: any[];
    //                   range: string;
    //                   center: [number, number];
    //                 }) => {
    //                   if (li.polygon_type === "single") {
    //                     if (
    //                       li.center[1] >= minLat &&
    //                       li.center[1] <= maxLat &&
    //                       li.center[0] >= minLng &&
    //                       li.center[0] <= maxLng
    //                     ) {
    //                       const poly = new naver.maps.Polygon({
    //                         map: state.map,
    //                         paths: li.polygon,
    //                         fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
    //                         fillOpacity: 0.5,
    //                         strokeWeight: 1,
    //                         strokeColor: "#FFFFFF",
    //                         clickable: true,
    //                       });

    //                       list.push(poly);
    //                     }
    //                   } else if (li.polygon_type === "circle") {
    //                   }
    //                 }
    //               );
    //             }

    //             polygonRef.current = list;
    //           }
    //         } else {
    //           if (polygonRef.current && polygonRef.current.length > 0) {
    //             polygonRef.current.map((poly) => poly.setMap(null));
    //             polygonRef.current = [];
    //           }
    //         }
    //       }, 300);
    //     }
    //   );

    //   return () => {
    //     polygonRef.current &&
    //       polygonRef.current.map((poly) => poly.setMap(null));
    //     polygonRef.current = null;
    //     naver.maps.Event.removeListener(panningEventHandelr);
    //   };
    // }, [state, bsDis]);
    console.log(state.map);
    return (
      <Flex
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
            브랜드 데이터
          </Heading>
        </Flex>
        <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
        <Tabs
          variant="depthListBox"
          index={tabIdx}
          onChange={(idx) => setTabIdx(idx)}
        >
          <TabList border="none">
            {store && store.length > 0 && <Tab>매장</Tab>}
            {bsDis && bsDis.length > 0 && <Tab>상권</Tab>}
            {rent && rent.length > 0 && <Tab>매물</Tab>}
          </TabList>
          <TabPanels
            overflowY="scroll"
            sx={{
              "::-webkit-scrollbar": {
                w: "0px",
              },
            }}
          >
            {store && store.length > 0 && (
              <TabPanel>
                <ListStore
                  tabList={tabList}
                  setTabIdx={setTabIdx}
                  storeShow={storeShow}
                  storeList={store}
                />
              </TabPanel>
            )}
            {bsDisShow && bsDis && bsDis.length > 0 && (
              <TabPanel>
                <ListBsDis bsDisShow={bsDisShow} bsDisList={bsDis} />
              </TabPanel>
            )}
            {rent && rent.length > 0 && (
              <TabPanel>
                <ListRent
                  tabList={tabList}
                  setTabIdx={setTabIdx}
                  rentShow={rentShow}
                  rentList={rent}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
        {bsList &&
          bsList.length > 0 &&
          bsList.map((li) => {
            const path =
              li.polygonType === "single"
                ? li.geometry.coordinates[0]
                : li.polygonType === "multi" &&
                  li.geometry.coordinates.length > 0
                ? li.geometry.coordinates.map((li: any) => li[0])
                : li.geometry.coordinates[0];

            return li.polygonType === "circle" ? (
              <Circle
                id={`bsDisArea-${li._id}`}
                key={`bsDisArea-${li._id}`}
                onClick={() => {
                  const element = document.getElementById(li._id);
                  const index = tabList.indexOf("bsDis");

                  if (element) {
                    setTabIdx(index);
                    setTimeout(() => {
                      element.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 10);
                  }
                }}
                onMouseOver={(e: any) => {
                  console.log(li, "over");
                  const bounds = e.overlay.getBounds();
                  const center = bounds.getCenter();
                  const element = document.getElementById(li._id);

                  setCursorPo(Object.values(center));
                  setName(li.bsDisName);

                  if (element) {
                    element.style.background =
                      "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                  }
                }}
                onMouseOut={(e: any) => {
                  console.log("out");
                  const element = document.getElementById(li._id);
                  setCursorPo(null);
                  setName(null);

                  if (element) {
                    // @ts-ignore
                    element.style.background = null;
                  }
                }}
                opts={{
                  center: li.center,
                  radius: Number(li.range) || 0,
                  fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                  clickable: true,
                }}
              />
            ) : li.polygonType === "single" ? (
              <Polygon
                key={`bsDisArea-${li._id}`}
                id={`bsDisArea-${li._id}`}
                onClick={() => {
                  const element = document.getElementById(li._id);
                  const index = tabList.indexOf("bsDis");

                  if (element) {
                    setTabIdx(index);
                    setTimeout(() => {
                      element.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 10);
                  }
                }}
                onMouseOver={(e: any) => {
                  console.log(li, "over");
                  const bounds = e.overlay.getBounds();
                  const center = bounds.getCenter();
                  const element = document.getElementById(li._id);

                  setCursorPo(Object.values(center));
                  setName(li.bsDisName);

                  if (element) {
                    element.style.background =
                      "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                  }
                }}
                onMouseOut={(e: any) => {
                  console.log("out");
                  const element = document.getElementById(li._id);

                  setCursorPo(null);
                  setName(null);

                  if (element) {
                    // @ts-ignore
                    element.style.background = null;
                  }
                }}
                opts={{
                  paths: path,
                  fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                  clickable: true,
                }}
              />
            ) : li.polygonType === "multi" ? (
              <Polygon
                key={`bsDisArea-${li._id}`}
                id={`bsDisArea-${li._id}`}
                onClick={() => {
                  const element = document.getElementById(li._id);
                  console.log(li, "over");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
                onMouseOver={(e: any) => {
                  const bounds = e.overlay.getBounds();
                  const center = bounds.getCenter();
                  const element = document.getElementById(li._id);

                  setCursorPo(Object.values(center));
                  setName(li.bsDisName);

                  if (element) {
                    element.style.background =
                      "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                  }
                }}
                onMouseOut={(e: any) => {
                  const element = document.getElementById(li._id);
                  console.log("out");
                  setCursorPo(null);
                  setName(null);

                  if (element) {
                    // @ts-ignore
                    element.style.background = null;
                  }
                }}
                opts={{
                  paths: path,
                  fillColor: bsDisColor[li.bsDisType] || "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                  clickable: true,
                }}
              />
            ) : null;
          })}
        {bsDisShow && cursorPo && name && (
          <OverlayView
            id={`infoBox`}
            position={new naver.maps.LatLng(cursorPo)}
            pane="floatPane"
            anchorPoint={{ x: 0, y: 10 }}
            pointerevent={false}
          >
            <Flex
              as={motion.div}
              animation={infoAnimation}
              pos="relative"
              top="-4.5rem"
              left="-50%"
              p="0.25rem 0.75rem"
              w="fit-content"
              justify="flex-start"
              align="flex-start"
              bgColor="#FFFFFFD9"
              gap="0.5rem"
              border="1px solid"
              borderColor="neutral.gray6"
              borderRadius="base"
              whiteSpace="nowrap"
              pointerEvents="none"
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
                {name || ""}
              </Text>
            </Flex>
          </OverlayView>
        )}
      </Flex>
    );
  }
);

const ListStore = memo(
  ({
    tabList,
    setTabIdx,
    storeShow,
    storeList,
  }: {
    tabList: any[];
    setTabIdx: any;
    storeShow: boolean;
    storeList: StoreList[];
  }) => {
    const { state } = useContext(NaverMapContext);
    const [isHover, onHover] = useState<boolean>(false);
    const [name, setName] = useState<string | null>("");
    const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);
    const markerRef = useRef<any[] | null>([]);
    const storeRef = useRef<any[] | null>([]);
    const eventRef = useRef<any[] | null>([]);

    const reset = useCallback(() => {
      if (markerRef.current && markerRef.current.length > 0) {
        markerRef.current.map((marker: any) => marker.setMap(null));
        markerRef.current = null;
      }
    }, [markerRef.current]);

    const resetObj = useCallback(() => {
      if (storeRef.current && storeRef.current.length > 0) {
        storeRef.current.map((li) => li.setMap(null));
        storeRef.current = null;
      }
      if (eventRef.current && eventRef.current.length > 0) {
        eventRef.current.map((event: any) =>
          naver.maps.Event.removeListener(event)
        );
        eventRef.current = null;
      }
      setCursorPo(null);
      onHover(false);
    }, [storeRef.current, eventRef.current]);

    useEffect(() => {
      if (!state.map) return;
      let zoom = state.map.getZoom();
      let bounds: any = state.map?.getBounds();

      if (10 < zoom && zoom < 13 && storeShow) {
        reset();
        resetObj();

        const markerLi: any[] = [];
        const area: { [x: string]: any } = {};

        storeList.map((store) => {
          if (store.location.coordinates) {
            const addr = store?.addr?.split(" ")[1];

            if (area[addr]) {
              area[addr].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else {
              area[addr] = [];
              area[addr].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            }
          }
        });

        Object.keys(area).map((key: string) => {
          const pos = area[key].length > 1 ? pathAvg(area[key]) : area[key][0];
          const marker = new naver.maps.Marker({
            map: state.map,
            position: new naver.maps.LatLng(pos[0], pos[1]),
            icon: {
              content:
                `<div style='padding-top: 5px;display: flex; flex-direction: column; justify-content: center; align-items: center; width: 7.125rem; height: 7.125rem; background: url(${markerCluster})'>` +
                `<p style='font-family:Roboto;font-size: 11px;font-weight: 500;color: #595959'>${key}</p><p style='font-family: Roboto;font-weight: 700;font-size: 20px;color: rgba(0, 0, 0, 0.8)'>` +
                `${area[key].length}</p></div>`,
            },
          });

          markerLi.push(marker);
        });

        markerRef.current = markerLi;
      } else if (zoom <= 10 && storeShow) {
        reset();
        resetObj();

        const markerLi: any[] = [];
        const area: { [x: string]: any } = {
          서울특별시: [],
          인천광역시: [],
          경기도: [],
          강원도: [],
          충청북도: [],
          충청남도: [],
          전라북도: [],
          전라남도: [],
          세종특별자치시: [],
          대전광역시: [],
          광주광역시: [],
          대구광역시: [],
          경상북도: [],
          경상남도: [],
          울산광역시: [],
          부산광역시: [],
        };

        storeList.map((store) => {
          if (store.location.coordinates) {
            const addr = store?.addr?.split(" ")[0];

            if (addr === "서울특별시" || addr === "서울시" || addr === "서울") {
              area["서울특별시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "인천" || addr === "인천광역시") {
              area["인천광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "경기도" || addr === "경기") {
              area["경기도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "강원도" || addr === "강원") {
              area["경기도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "충청북도" || addr === "충북") {
              area["충청북도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "충청남도" || addr === "충남") {
              area["충청남도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "전라북도" || addr === "전북") {
              area["전라북도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "전라남도" || addr === "전남") {
              area["전라남도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "대전광역시" || addr === "대전") {
              area["대전광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (
              addr === "세종특별자치시" ||
              addr === "세종" ||
              addr === "세종시"
            ) {
              area["세종특별자치시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "광주광역시" || addr === "광주") {
              area["광주광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "대구광역시" || addr === "대구") {
              area["대구광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "경상북도" || addr === "경북") {
              area["경상북도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "경상남도" || addr === "경남") {
              area["경상남도"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "부산광역시" || addr === "부산") {
              area["부산광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            } else if (addr === "울산광역시" || addr === "울산") {
              area["울산광역시"].push([
                Number(store.location.coordinates[1]),
                Number(store.location.coordinates[0]),
              ]);
            }
          }
        });

        Object.keys(area).map((key: string) => {
          if (area[key].length === 0) return;

          const pos = area[key].length > 1 ? pathAvg(area[key]) : area[key][0];

          const marker = new naver.maps.Marker({
            map: state.map,
            position: new naver.maps.LatLng(pos[0], pos[1]),
            icon: {
              content:
                `<div style='padding-top: 5px;display: flex; flex-direction: column; justify-content: center; align-items: center; width: 7.125rem; height: 7.125rem; background: url(${markerCluster})'>` +
                `<p style='font-family:Roboto;font-size: 11px;font-weight: 500;color: #595959'>${key}</p><p style='font-family: Roboto;font-weight: 700;font-size: 20px;color: rgba(0, 0, 0, 0.8)'>` +
                `${area[key].length}</p></div>`,
            },
          });

          markerLi.push(marker);
        });

        markerRef.current = markerLi;
      } else {
        reset();
        resetObj();
        if (storeShow) {
          storeList.map((li) => {
            if (!li?.location?.coordinates) {
              return;
            } else {
              const { _id, storeName } = li;
              const lat = li.location?.coordinates[1];
              const lng = li.location?.coordinates[0];

              if (
                bounds._max.x > lng &&
                bounds._min.x < lng &&
                bounds._max.y > lat &&
                bounds._min.y < lat
              ) {
                const marker = new naver.maps.Marker({
                  map: state.map,
                  position: [lng, lat],
                  icon: {
                    url: markerStore,
                  },
                });
                const eventArr: any = [];
                const clickEvent = naver.maps.Event.addListener(
                  marker,
                  "click",
                  () => {
                    const index = tabList.indexOf("store");
                    const element = document.getElementById(
                      `storeListItem-${_id}`
                    );

                    if (element) {
                      setTabIdx(index);
                      setTimeout(() => {
                        element.scrollIntoView({
                          behavior: "smooth",
                        });
                      }, 10);
                    }
                  }
                );
                const overEvent = naver.maps.Event.addListener(
                  marker,
                  "mouseover",
                  () => {
                    onHover(true);
                    setCursorPo([lng, lat]);
                    setName(storeName);
                    const element = document.getElementById(
                      `storeListItem-${_id}`
                    );

                    if (element) {
                      element.style.background =
                        "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                    }
                  }
                );
                const outEvent = naver.maps.Event.addListener(
                  marker,
                  "mouseout",
                  () => {
                    onHover(false);
                    setCursorPo(null);
                    setName(null);
                    const element = document.getElementById(
                      `storeListItem-${_id}`
                    );

                    if (element) {
                      // @ts-ignore
                      element.style.background = null;
                    }
                  }
                );
                eventArr.push(clickEvent);
                eventArr.push(overEvent);
                eventArr.push(outEvent);

                if (!eventRef.current) {
                  eventRef.current = [];
                  eventRef.current.push(eventArr);
                } else {
                  eventRef.current.push(eventArr);
                }

                if (!storeRef.current) {
                  storeRef.current = [];
                  storeRef.current.push(marker);
                } else {
                  storeRef.current.push(marker);
                }
              }
            }
          });
        }
      }

      let timer: any;
      const zoomEvent = naver.maps.Event.addListener(
        state.map,
        "zoom_changed",
        (e) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            if (10 < e && e < 13 && storeShow) {
              reset();

              const markerLi: any[] = [];
              const area: { [x: string]: any } = {};

              storeList.map((store) => {
                if (store.location.coordinates) {
                  const addr = store?.addr?.split(" ")[1];

                  if (area[addr]) {
                    area[addr].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else {
                    area[addr] = [];
                    area[addr].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  }
                }
              });

              Object.keys(area).map((key: string) => {
                const pos =
                  area[key].length > 1 ? pathAvg(area[key]) : area[key][0];

                const marker = new naver.maps.Marker({
                  map: state.map,
                  position: new naver.maps.LatLng(pos[0], pos[1]),
                  icon: {
                    content:
                      `<div style='padding-top: 5px;display: flex; flex-direction: column; justify-content: center; align-items: center; width: 7.125rem; height: 7.125rem; background: url(${markerCluster})'>` +
                      `<p style='font-family:Roboto;font-size: 11px;font-weight: 500;color: #595959'>${key}</p><p style='font-family: Roboto;font-weight: 700;font-size: 20px;color: rgba(0, 0, 0, 0.8)'>` +
                      `${area[key].length}</p></div>`,
                  },
                });

                markerLi.push(marker);
              });

              markerRef.current = markerLi;
            } else if (e <= 10 && storeShow) {
              reset();

              const markerLi: any[] = [];
              const area: { [x: string]: any } = {
                서울특별시: [],
                인천광역시: [],
                경기도: [],
                강원도: [],
                충청북도: [],
                충청남도: [],
                전라북도: [],
                전라남도: [],
                세종특별자치시: [],
                대전광역시: [],
                광주광역시: [],
                대구광역시: [],
                경상북도: [],
                경상남도: [],
                울산광역시: [],
                부산광역시: [],
              };

              storeList.map((store) => {
                if (store.location.coordinates) {
                  const addr = store?.addr?.split(" ")[0];

                  if (
                    addr === "서울특별시" ||
                    addr === "서울시" ||
                    addr === "서울"
                  ) {
                    area["서울특별시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "인천" || addr === "인천광역시") {
                    area["인천광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "경기도" || addr === "경기") {
                    area["경기도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "강원도" || addr === "강원") {
                    area["경기도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "충청북도" || addr === "충북") {
                    area["충청북도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "충청남도" || addr === "충남") {
                    area["충청남도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "전라북도" || addr === "전북") {
                    area["전라북도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "전라남도" || addr === "전남") {
                    area["전라남도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "대전광역시" || addr === "대전") {
                    area["대전광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (
                    addr === "세종특별자치시" ||
                    addr === "세종" ||
                    addr === "세종시"
                  ) {
                    area["세종특별자치시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "광주광역시" || addr === "광주") {
                    area["광주광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "대구광역시" || addr === "대구") {
                    area["대구광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "경상북도" || addr === "경북") {
                    area["경상북도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "경상남도" || addr === "경남") {
                    area["경상남도"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "부산광역시" || addr === "부산") {
                    area["부산광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  } else if (addr === "울산광역시" || addr === "울산") {
                    area["울산광역시"].push([
                      Number(store.location.coordinates[1]),
                      Number(store.location.coordinates[0]),
                    ]);
                  }
                }
              });

              Object.keys(area).map((key: string) => {
                if (area[key].length === 0) return;
                const pos =
                  area[key].length > 1 ? pathAvg(area[key]) : area[key][0];

                const marker = new naver.maps.Marker({
                  map: state.map,
                  position: new naver.maps.LatLng(pos[0], pos[1]),
                  icon: {
                    content:
                      `<div style='padding-top: 5px;display: flex; flex-direction: column; justify-content: center; align-items: center; width: 7.125rem; height: 7.125rem; background: url(${markerCluster})'>` +
                      `<p style='font-family:Roboto;font-size: 11px;font-weight: 500;color: #595959'>${key}</p><p style='font-family: Roboto;font-weight: 700;font-size: 20px;color: rgba(0, 0, 0, 0.8)'>` +
                      `${area[key].length}</p></div>`,
                  },
                });
                markerLi.push(marker);
              });

              markerRef.current = markerLi;
            } else {
              reset();
            }
          });
        }
      );

      let boundTimer: any;
      const boundsEvent = naver.maps.Event.addListener(
        state.map,
        "bounds_changed",
        (e) => {
          if (boundTimer) clearTimeout(boundTimer);
          boundTimer = setTimeout(function () {
            if (state.map && storeShow) {
              let zoom = state.map.getZoom();
              let bounds: any = state.map?.getBounds();

              if (zoom < 13) {
                resetObj();
                return;
              } else if (zoom >= 13) {
                resetObj();
                storeList.map((li) => {
                  if (!li?.location?.coordinates) {
                    return;
                  } else {
                    const { _id, storeName } = li;
                    const lat = li.location?.coordinates[1];
                    const lng = li.location?.coordinates[0];

                    if (
                      bounds._max.x > lng &&
                      bounds._min.x < lng &&
                      bounds._max.y > lat &&
                      bounds._min.y < lat
                    ) {
                      const marker = new naver.maps.Marker({
                        map: state.map,
                        position: [lng, lat],
                        icon: {
                          url: markerStore,
                        },
                      });
                      const eventArr: any = [];
                      const clickEvent = naver.maps.Event.addListener(
                        marker,
                        "click",
                        () => {
                          console.log(tabList);
                          const index = tabList?.indexOf("store");
                          const element = document.getElementById(
                            `storeListItem-${_id}`
                          );

                          if (element) {
                            setTabIdx(index);
                            setTimeout(() => {
                              element.scrollIntoView({
                                behavior: "smooth",
                              });
                            }, 10);
                          }
                        }
                      );
                      const overEvent = naver.maps.Event.addListener(
                        marker,
                        "mouseover",
                        () => {
                          onHover(true);
                          setCursorPo([lng, lat]);
                          setName(storeName);
                          const element = document.getElementById(
                            `storeListItem-${_id}`
                          );

                          if (element) {
                            element.style.background =
                              "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                          }
                        }
                      );
                      const outEvent = naver.maps.Event.addListener(
                        marker,
                        "mouseout",
                        () => {
                          onHover(false);
                          setCursorPo(null);
                          setName(null);
                          const element = document.getElementById(
                            `storeListItem-${_id}`
                          );

                          if (element) {
                            // @ts-ignore
                            element.style.background = null;
                          }
                        }
                      );
                      eventArr.push(clickEvent);
                      eventArr.push(overEvent);
                      eventArr.push(outEvent);

                      if (!eventRef.current) {
                        eventRef.current = [];
                        eventRef.current.push(eventArr);
                      } else {
                        eventRef.current.push(eventArr);
                      }

                      if (!storeRef.current) {
                        storeRef.current = [];
                        storeRef.current.push(marker);
                      } else {
                        storeRef.current.push(marker);
                      }
                    }
                  }
                });
              }
            } else {
              resetObj();
            }
          }, 300);
        }
      );

      return () => {
        reset();
        resetObj();
        naver.maps.Event.removeListener(zoomEvent);
        naver.maps.Event.removeListener(boundsEvent);
      };
    }, [state, storeList, storeShow, tabList]);

    return (
      <Fragment>
        {storeList ? (
          <List display="flex" flexDirection="column">
            {storeList.map(
              ({ _id, storeName, storePhone, addr, location }, idx: number) =>
                location.coordinates ? (
                  <ListItemStore
                    key={_id}
                    isShow={storeShow}
                    idx={idx}
                    _id={_id}
                    storeName={storeName}
                    addr={addr}
                    storePhone={storePhone}
                    lat={location.coordinates[1]}
                    lng={location.coordinates[0]}
                  />
                ) : null
            )}
          </List>
        ) : null}
        {state?.map && storeShow && isHover && cursorPo && name && (
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
                {name || ""}
              </Text>
            </Flex>
          </OverlayView>
        )}
      </Fragment>
    );
  }
);

const ListItemStore = memo(
  ({ isShow, _id, storeName, addr, storePhone, lat, lng }: any) => {
    const { state } = useContext(NaverMapContext);
    const setSv = useSetRecoilState(sementicViewState);
    const [isHover, onHover] = useState<boolean>(false);
    const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

    return (
      <Fragment>
        <ListItem
          // ref={domRef}
          id={`storeListItem-${_id}`}
          key={`storeListItem-${_id}`}
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
            if (state.map) {
              const point = new naver.maps.LatLng(lat, lng);

              state.map.setCenter(point);
              state.map.setZoom(18);
            }

            setSv({
              viewId: "storeInfo",
              props: {
                id: _id,
                name: storeName,
              },
            });
          }}
          onMouseEnter={() => {
            onHover(true);
            setCursorPo([lng, lat]);
          }}
          onMouseLeave={() => {
            onHover(false);
            setCursorPo(null);
          }}
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
        {state?.map && isShow && isHover && cursorPo && (
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
  }
);

const ListBsDis = memo(
  ({
    bsDisShow,
    bsDisList,
  }: {
    bsDisShow: boolean;
    bsDisList: TypeBsDis[];
  }) => {
    console.log("render");
    return bsDisList ? (
      <List display="flex" flexDirection="column">
        {bsDisList.map(
          (
            {
              _id,
              bsDisName,
              bsDisCode,
              geometry,
              polygonType,
              range,
              center,
            }: TypeBsDis,
            idx: number
          ) => {
            return (
              <ListItemBsDis
                key={`bsDisList-${_id}`}
                isShow={bsDisShow}
                idx={idx}
                _id={_id}
                bsDisName={bsDisName}
                bsDisCode={bsDisCode}
                bsDisType={"A"}
                polygonType={polygonType}
                geometry={geometry}
                range={Number(range) || 0}
                center={center}
              />
            );
          }
        )}
      </List>
    ) : null;
  }
);

const ListItemBsDis = ({
  isShow,
  _id,
  bsDisName,
  bsDisCode,
  bsDisType,
  polygonType,
  geometry,
  range,
  center,
}: BsDisList) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`bsDisArea-${_id}`);

      if (obj) {
        const bounds = obj.getBounds();
        const boundsCenter: any = bounds.getCenter();
        setCursorPo(boundsCenter);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  return (
    <Fragment>
      <ListItem
        key={`bsDisListItem-${_id}`}
        id={_id}
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

          if (state.map) {
            const point = new naver.maps.LatLng(center[1], center[0]);

            state.map.setCenter(point);
            state.map.setZoom(16);
          }

          setSv({
            viewId: "bsDisInfo",
            props: {
              id: _id,
              code: bsDisCode,
              name: bsDisName,
              polygonType: polygonType,
              geometry: geometry,
              range: range,
              center: center,
            },
          });
        }}
        onMouseEnter={() => {
          onHover(true);
        }}
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
      )}
    </Fragment>
  );
};

const ListRent = memo(
  ({
    tabList,
    setTabIdx,
    rentShow,
    rentList,
  }: {
    tabList: any[];
    setTabIdx: any;
    rentShow: boolean;
    rentList: RentList[];
  }) => {
    const { state } = useContext(NaverMapContext);
    const [isHover, onHover] = useState<boolean>(false);
    const [name, setName] = useState<string | null>("");
    const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);
    const rentRef = useRef<any[] | null>([]);
    const eventRef = useRef<any[] | null>([]);

    const resetObj = useCallback(() => {
      if (rentRef.current && rentRef.current.length > 0) {
        rentRef.current.map((li) => li.setMap(null));
        rentRef.current = null;
      }
      if (eventRef.current && eventRef.current.length > 0) {
        eventRef.current.map((event: any) =>
          naver.maps.Event.removeListener(event)
        );
        eventRef.current = null;
      }
      setCursorPo(null);
      onHover(false);
    }, [rentRef.current, eventRef.current]);

    useEffect(() => {
      if (!state.map) return;
      let zoom = state.map.getZoom();
      let bounds: any = state.map?.getBounds();

      resetObj();
      if (rentShow && zoom >= 13) {
        rentList.map((li) => {
          if (!li?.location?.coordinates) {
            return;
          } else {
            const { id, rentName } = li;
            const lat = li.location?.coordinates[1];
            const lng = li.location?.coordinates[0];

            if (
              bounds._max.x > lng &&
              bounds._min.x < lng &&
              bounds._max.y > lat &&
              bounds._min.y < lat
            ) {
              const marker = new naver.maps.Marker({
                map: state.map,
                position: [lng, lat],
                icon: {
                  url: markerRent,
                },
              });
              const eventArr: any = [];
              const clickEvent = naver.maps.Event.addListener(
                marker,
                "click",
                () => {
                  const index = tabList.indexOf("rent");
                  const element = document.getElementById(`rentListItem-${id}`);

                  if (element) {
                    setTabIdx(index);
                    setTimeout(() => {
                      element.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 10);
                  }
                }
              );
              const overEvent = naver.maps.Event.addListener(
                marker,
                "mouseover",
                () => {
                  onHover(true);
                  setCursorPo([lng, lat]);
                  setName(rentName);
                  const element = document.getElementById(`rentListItem-${id}`);

                  if (element) {
                    element.style.background =
                      "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                  }
                }
              );
              const outEvent = naver.maps.Event.addListener(
                marker,
                "mouseout",
                () => {
                  onHover(false);
                  setCursorPo(null);
                  setName(null);
                  const element = document.getElementById(`rentListItem-${id}`);

                  if (element) {
                    // @ts-ignore
                    element.style.background = null;
                  }
                }
              );
              eventArr.push(clickEvent);
              eventArr.push(overEvent);
              eventArr.push(outEvent);

              if (!eventRef.current) {
                eventRef.current = [];
                eventRef.current.push(eventArr);
              } else {
                eventRef.current.push(eventArr);
              }

              if (!rentRef.current) {
                rentRef.current = [];
                rentRef.current.push(marker);
              } else {
                rentRef.current.push(marker);
              }
            }
          }
        });
      } else {
        resetObj();
      }

      let boundTimer: any;
      const boundsEvent = naver.maps.Event.addListener(
        state.map,
        "bounds_changed",
        (e) => {
          if (boundTimer) clearTimeout(boundTimer);
          boundTimer = setTimeout(function () {
            if (state.map && rentShow) {
              let zoom = state.map.getZoom();
              let bounds: any = state.map?.getBounds();

              if (zoom < 13) {
                resetObj();
                return;
              } else if (zoom >= 13) {
                resetObj();
                rentList.map((li) => {
                  if (!li?.location?.coordinates) {
                    return;
                  } else {
                    const { id, rentName } = li;
                    const lat = li.location?.coordinates[1];
                    const lng = li.location?.coordinates[0];

                    if (
                      bounds._max.x > lng &&
                      bounds._min.x < lng &&
                      bounds._max.y > lat &&
                      bounds._min.y < lat
                    ) {
                      const marker = new naver.maps.Marker({
                        map: state.map,
                        position: [lng, lat],
                        icon: {
                          url: markerRent,
                        },
                      });
                      const eventArr: any = [];
                      const clickEvent = naver.maps.Event.addListener(
                        marker,
                        "click",
                        () => {
                          console.log(tabList);
                          const index = tabList?.indexOf("rent");
                          const element = document.getElementById(
                            `rentListItem-${id}`
                          );

                          if (element) {
                            setTabIdx(index);
                            setTimeout(() => {
                              element.scrollIntoView({
                                behavior: "smooth",
                              });
                            }, 10);
                          }
                        }
                      );
                      const overEvent = naver.maps.Event.addListener(
                        marker,
                        "mouseover",
                        () => {
                          onHover(true);
                          setCursorPo([lng, lat]);
                          setName(rentName);
                          const element = document.getElementById(
                            `rentListItem-${id}`
                          );

                          if (element) {
                            element.style.background =
                              "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                          }
                        }
                      );
                      const outEvent = naver.maps.Event.addListener(
                        marker,
                        "mouseout",
                        () => {
                          onHover(false);
                          setCursorPo(null);
                          setName(null);
                          const element = document.getElementById(
                            `rentListItem-${id}`
                          );

                          if (element) {
                            // @ts-ignore
                            element.style.background = null;
                          }
                        }
                      );
                      eventArr.push(clickEvent);
                      eventArr.push(overEvent);
                      eventArr.push(outEvent);

                      if (!eventRef.current) {
                        eventRef.current = [];
                        eventRef.current.push(eventArr);
                      } else {
                        eventRef.current.push(eventArr);
                      }

                      if (!rentRef.current) {
                        rentRef.current = [];
                        rentRef.current.push(marker);
                      } else {
                        rentRef.current.push(marker);
                      }
                    }
                  }
                });
              }
            } else {
              resetObj();
            }
          }, 300);
        }
      );

      return () => {
        resetObj();
        naver.maps.Event.removeListener(boundsEvent);
      };
    }, [state, rentList, rentShow, tabList]);

    return rentList ? (
      <Fragment>
        <List display="flex" flexDirection="column">
          {rentList.map(
            ({
              id,
              rentName,
              addrNew,
              addrOld,
              addrDetail,
              location,
            }: RentList) =>
              location.coordinates ? (
                <ListItemRent
                  key={id}
                  isShow={rentShow}
                  id={id}
                  rentName={rentName}
                  addrNew={addrNew}
                  addrOld={addrOld}
                  addrDetail={addrDetail}
                  lat={location.coordinates[1]}
                  lng={location.coordinates[0]}
                />
              ) : null
          )}
        </List>
        {state?.map && rentShow && isHover && cursorPo && name && (
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
                {name || ""}
              </Text>
            </Flex>
          </OverlayView>
        )}
      </Fragment>
    ) : null;
  }
);

const ListItemRent = memo(
  ({ id, rentName, addrNew, addrOld, addrDetail, lat, lng }: any) => {
    const { state } = useContext(NaverMapContext);
    const setSv = useSetRecoilState(sementicViewState);
    const [isHover, onHover] = useState<boolean>(false);
    const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);
    const domRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const eventRef = useRef<any>(null);

    // const resetObj = useCallback(() => {
    //   if (markerRef.current) {
    //     markerRef.current.setMap(null);
    //     markerRef.current = null;
    //   }
    //   if (eventRef.current && eventRef.current.length > 0) {
    //     eventRef.current.map((event: any) =>
    //       naver.maps.Event.removeListener(event)
    //     );
    //   }
    //   setCursorPo(null);
    // }, [markerRef.current, eventRef.current]);

    // useEffect(() => {
    //   if (!state.map) return;
    //   resetObj();
    //   let zoom = state.map?.getZoom() || 0;
    //   let bounds: any = state.map?.getBounds();
    //   if (zoom >= 13 && isShow) {
    //     if (
    //       bounds._max.x > lng &&
    //       bounds._min.x < lng &&
    //       bounds._max.y > lat &&
    //       bounds._min.y < lat
    //     ) {
    //       if (!markerRef.current) {
    //         const marker = new naver.maps.Marker({
    //           map: state.map,
    //           position: [lng, lat],
    //           icon: {
    //             url: markerRent,
    //           },
    //         });
    //         const eventArr: any = [];
    //         const clickEvent = naver.maps.Event.addListener(
    //           marker,
    //           "click",
    //           () => {
    //             if (domRef.current) {
    //               tabHandler();
    //               setTimeout(() => {
    //                 domRef.current.scrollIntoView({ behavior: "smooth" });
    //               }, 10);
    //             }
    //           }
    //         );
    //         const overEvent = naver.maps.Event.addListener(
    //           marker,
    //           "mouseover",
    //           () => {
    //             onHover(true);
    //             setCursorPo([lng, lat]);
    //           }
    //         );
    //         const outEvent = naver.maps.Event.addListener(
    //           marker,
    //           "mouseout",
    //           () => {
    //             onHover(false);
    //             setCursorPo(null);
    //           }
    //         );

    //         eventArr.push(clickEvent);
    //         eventArr.push(overEvent);
    //         eventArr.push(outEvent);

    //         eventRef.current = eventArr;
    //         markerRef.current = marker;
    //       }
    //     } else {
    //       if (markerRef.current) markerRef.current.setMap(null);
    //       if (eventRef.current && eventRef.current.length > 0)
    //         eventRef.current.map((event: any) =>
    //           naver.maps.Event.removeListener(event)
    //         );
    //     }
    //   } else {
    //     resetObj();
    //   }

    //   let timer: any;
    //   const zoomEvent = naver.maps.Event.addListener(
    //     state.map,
    //     "bounds_changed",
    //     (e) => {
    //       if (timer) clearTimeout(timer);
    //       timer = setTimeout(function () {
    //         if (state.map && isShow) {
    //           const zoom = state.map.getZoom();

    //           if (zoom < 13) {
    //             if (markerRef.current) {
    //               markerRef.current.setMap(null);
    //               markerRef.current = null;
    //             }
    //             if (eventRef.current && eventRef.current.length > 0) {
    //               eventRef.current.map((event: any) =>
    //                 naver.maps.Event.removeListener(event)
    //               );
    //             }
    //           } else if (zoom >= 13) {
    //             if (
    //               e._max.x > lng &&
    //               e._min.x < lng &&
    //               e._max.y > lat &&
    //               e._min.y < lat
    //             ) {
    //               if (!markerRef.current) {
    //                 const marker = new naver.maps.Marker({
    //                   map: state.map,
    //                   position: [lng, lat],
    //                   icon: {
    //                     url: markerRent,
    //                   },
    //                 });
    //                 const eventArr: any = [];
    //                 const clickEvent = naver.maps.Event.addListener(
    //                   marker,
    //                   "click",
    //                   () => {
    //                     if (domRef.current) {
    //                       tabHandler(domRef.current);
    //                       setTimeout(() => {
    //                         domRef.current.scrollIntoView({ behavior: "smooth" });
    //                       }, 10);
    //                     }
    //                   }
    //                 );
    //                 const overEvent = naver.maps.Event.addListener(
    //                   marker,
    //                   "mouseover",
    //                   () => {
    //                     onHover(true);
    //                     setCursorPo([lng, lat]);
    //                   }
    //                 );
    //                 const outEvent = naver.maps.Event.addListener(
    //                   marker,
    //                   "mouseout",
    //                   () => {
    //                     onHover(false);
    //                     setCursorPo(null);
    //                   }
    //                 );

    //                 eventArr.push(clickEvent);
    //                 eventArr.push(overEvent);
    //                 eventArr.push(outEvent);

    //                 eventRef.current = eventArr;
    //                 markerRef.current = marker;
    //               }
    //             } else {
    //               resetObj();
    //             }
    //           }
    //         } else {
    //           resetObj();
    //         }
    //       }, 300);
    //     }
    //   );

    //   return () => {
    //     naver.maps.Event.removeListener(zoomEvent);
    //     resetObj();
    //   };
    // }, [state.map, isShow]);

    return (
      <Fragment>
        <ListItem
          // ref={domRef}
          id={`rentListItem-${id}`}
          key={`rentListItem-${id}`}
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
            if (state.map) {
              const point = new naver.maps.LatLng(lat, lng);

              state.map.setCenter(point);
              state.map.setZoom(18);
            }

            setSv({
              viewId: "rentInfo",
              props: {
                id: id,
                name: rentName,
              },
            });
          }}
          onMouseEnter={() => {
            onHover(true);
            setCursorPo([lng, lat]);
          }}
          onMouseLeave={() => {
            onHover(false);
            setCursorPo(null);
          }}
        >
          <Flex justify="center" align="center" flex="none">
            <Image src={IcoListRent} w="auto" bg="transparent" border="0" />
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
              {`${addrNew || addrOld}${addrDetail || ""}`}
            </Text>
          </Flex>
        </ListItem>
        {/* {state?.map && isShow && isHover && cursorPo && (
        <Marker
          key={`markerRent-${idx}`}
          id={`markerRent-${idx}`}
          opts={{
            position: [lng, lat],
            icon: {
              url: markerRent,
            },
            title: rentName,
            visible: isShow && showMarker,
          }}
          onMouseOver={() => onHover(true)}
          onMouseOut={() => onHover(false)}
        />
      )} */}
        {/* {state?.map && isShow && isHover && cursorPo && (
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
            top="-5.2rem"
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
      )} */}
      </Fragment>
    );
  }
);

export default BrandListBox;
