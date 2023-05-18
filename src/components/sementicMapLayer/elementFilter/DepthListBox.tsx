//  Lib
import {
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import { Marker, NaverMapContext } from "@src/lib/src";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Api
import { apiMapBuilding } from "@api/bizSub/config";
//  Util
//  Util
import { searchRange } from "@util/define/map";
//  Icon
import { IcoBuildingList } from "@assets/icons/icon";
import markerBrand from "@assets/icons/marker_brand.png";
import IconBrand from "@assets/icons/list_brand.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";

type Props = {
  brandShow?: boolean;
  brandList?: {
    newAddr: string;
    oldAddr: string;
    storeNm: string;
    upjongNm: string;
    xAxis: number;
    yAxis: number;
  }[];
  buildShow?: boolean;
  buildList?: any[];
  buildFilter: any;
};

const DepthListBox = memo(
  ({ brandShow, brandList, buildShow, buildList, buildFilter }: Props) => {
    const { getBuildingList } = apiMapBuilding;
    const { state } = useContext(NaverMapContext);
    const flow = useRecoilValue(atomFilterFlow);
    const setSv = useSetRecoilState(sementicViewState);
    const buildingList = useRef<any[] | null>(null);
    const [tabIdx, setTabIdx] = useState<number>(0);
    const [tabLen, setTabLen] = useState(0);

    const resetRef = useCallback(() => {
      if (
        state.map &&
        buildingList.current &&
        buildingList.current.length > 0
      ) {
        buildingList.current.map((building) =>
          state.map?.data.removeGeoJson(building)
        );

        buildingList.current = null;
      }
    }, [state, buildingList.current]);

    const filterBuilding = useMemo(() => {
      const req = { ...buildFilter };

      if (buildFilter?.useStartDay && buildFilter?.useEndDay) {
        req.useStartDay = new Date(buildFilter.useStartDay).toISOString();
        req.useEndDay = new Date(buildFilter.useEndDay).toISOString();
      }

      return req;
    }, [buildFilter]);

    useEffect(() => {
      if (!state.map) return;

      let zoom = state.map?.getZoom() || 0;
      resetRef();

      if (zoom >= 16 && buildShow) {
        const bounds: any = state.map.getBounds();
        const transBounds: any[] = [];

        if (bounds) {
          transBounds.push([bounds._max.x, bounds._max.y]);
          transBounds.push([bounds._min.x, bounds._max.y]);
          transBounds.push([bounds._min.x, bounds._min.y]);
          transBounds.push([bounds._max.x, bounds._min.y]);
          transBounds.push([bounds._max.x, bounds._max.y]);
          const center = state.map.getCenter();

          getBuildingList({
            ...filterBuilding,
            wkt: [[transBounds]],
          })
            .then((res: any) => {
              if (res.data && res.data.length > 0 && state.map) {
                const arr: any[] = [];
                const circle = new naver.maps.Circle({
                  map: state.map,
                  center: center,
                  radius: searchRange[zoom],
                });
                const circleBounds = circle.getBounds();

                res.data.map((li: any) => {
                  const geoCenter = new naver.maps.LatLngBounds(
                    li.geometry.coordinates[0][0]
                  ).getCenter();
                  const element = document.getElementById(li._id);

                  if (
                    state.map &&
                    // @ts-ignore
                    // objBounds.hasLatLng(geoCenter) &&
                    // @ts-ignore
                    circleBounds.hasLatLng(geoCenter) &&
                    element
                  ) {
                    const feature: any = {
                      type: "Feature",
                      id: li._id,
                      geometry: li.geometry,
                      properties: {
                        mgmBldrgstPk: li.mgmBldrgstPk,
                        bldNm: li.bldNm,
                        id: li._id,
                      },
                    };

                    // @ts-ignore
                    state.map.data.addGeoJson(feature);
                    const tmp = state.map.data.getFeatureById(li._id);

                    tmp.setStyle({
                      fillColor: "#36CFC9",
                      fillOpacity: 1,
                      strokeColor: "#FFFFFF",
                      strokeOpacity: 1,
                      strokeWeight: 1,
                      zIndex: 102,
                    });

                    tmp.addListener("click", () => {
                      console.log(tabLen);
                      if (tabLen === 2) {
                        setTabIdx(1);
                        setTimeout(() => {
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 50);
                      } else {
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                      // setSv({
                      //   viewId: "buildingInfo",
                      //   props: { id: li._id, name: li.bldNm },
                      // });
                      // if (state.map) {
                      //   const geoCenter = new naver.maps.LatLngBounds(
                      //     li.geometry.coordinates[0][0]
                      //   ).getCenter();

                      //   state.map.setCenter(geoCenter);
                      //   state.map.setZoom(18);
                      // }
                    });

                    // @ts-ignore
                    tmp.addListener("mouseover", (e) => {
                      if (!state.map) return;

                      tmp.setStyle({
                        fillColor: "#08979C",
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                      });

                      if (element) {
                        element.style.background =
                          "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                      }
                    });

                    // @ts-ignore
                    tmp.addListener("mouseout", (e) => {
                      if (!state.map) return;

                      state.map.data.revertStyle(e.feature);
                      tmp.setStyle({
                        fillColor: "#36CFC9",
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                      });

                      if (element) {
                        // @ts-ignore
                        element.style.background = null;
                      }
                    });

                    arr.push(feature);
                  }
                });

                circle.setMap(null);
                resetRef();
                buildingList.current = arr;
              } else {
                resetRef();
              }
            })
            .catch(() => {
              resetRef();
            });
        }
      }

      let timer: any;
      const zoomEvent = naver.maps.Event.addListener(
        state.map,
        "bounds_changed",
        (e) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            if (state.map && buildShow) {
              let zoom = state.map?.getZoom() || 0;

              if (zoom < 16) {
                resetRef();
                return;
              } else if (zoom >= 16) {
                if (!state.map) return;
                const transBounds: any[] = [];

                if (e) {
                  transBounds.push([e._max.x, e._max.y]);
                  transBounds.push([e._min.x, e._max.y]);
                  transBounds.push([e._min.x, e._min.y]);
                  transBounds.push([e._max.x, e._min.y]);
                  transBounds.push([e._max.x, e._max.y]);
                  const center = state.map.getCenter();

                  getBuildingList({
                    wkt: [[transBounds]],
                    ...filterBuilding,
                  })
                    .then((res: any) => {
                      if (res.data && res.data.length > 0 && state.map) {
                        const arr: any[] = [];
                        const circle = new naver.maps.Circle({
                          map: state.map,
                          center: center,
                          radius: searchRange[zoom],
                        });
                        const circleBounds = circle.getBounds();

                        res.data.map((li: any) => {
                          const geoCenter = new naver.maps.LatLngBounds(
                            li.geometry.coordinates[0][0]
                          ).getCenter();
                          const element = document.getElementById(li._id);

                          if (
                            state.map &&
                            // @ts-ignore
                            circleBounds.hasLatLng(geoCenter) &&
                            element
                          ) {
                            const feature: any = {
                              type: "Feature",
                              id: li._id,
                              geometry: li.geometry,
                              properties: {
                                mgmBldrgstPk: li.mgmBldrgstPk,
                                bldNm: li.bldNm,
                                id: li._id,
                              },
                            };

                            // @ts-ignore
                            state.map.data.addGeoJson(feature);
                            const tmp = state.map.data.getFeatureById(li._id);

                            tmp.setStyle({
                              fillColor: "#36CFC9",
                              fillOpacity: 1,
                              strokeColor: "#FFFFFF",
                              strokeOpacity: 1,
                              strokeWeight: 1,
                              zIndex: 102,
                            });

                            tmp.addListener("click", () => {
                              if (tabLen === 2) {
                                setTabIdx(1);
                                setTimeout(() => {
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 50);
                              } else {
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }
                            });

                            // @ts-ignore
                            tmp.addListener("mouseover", (e) => {
                              if (!state.map) return;

                              tmp.setStyle({
                                fillColor: "#08979C",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeOpacity: 1,
                                strokeWeight: 1,
                              });

                              if (element) {
                                element.style.background =
                                  "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)";
                              }
                            });

                            // @ts-ignore
                            tmp.addListener("mouseout", (e) => {
                              if (!state.map) return;

                              state.map.data.revertStyle(e.feature);
                              tmp.setStyle({
                                fillColor: "#36CFC9",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeOpacity: 1,
                                strokeWeight: 1,
                              });

                              if (element) {
                                // @ts-ignore
                                element.style.background = null;
                              }
                            });

                            arr.push(feature);
                          }
                        });

                        circle.setMap(null);
                        resetRef();
                        buildingList.current = arr;
                      } else {
                        resetRef();
                      }
                    })
                    .catch(() => {
                      resetRef();
                    });
                }
              }
            } else {
              resetRef();
            }
          }, 500);
        }
      );

      return () => {
        naver.maps.Event.removeListener(zoomEvent);
        resetRef();
      };
    }, [state.map, buildShow, buildList]);

    useEffect(() => {
      if (
        buildList &&
        buildList.length > 0 &&
        brandList &&
        brandList.length > 0
      ) {
        setTabLen(2);
      } else {
        setTabLen(1);
      }
    }, [buildList, brandList]);

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
        gap="0.75rem"
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
            마켓 데이터
          </Heading>
        </Flex>
        <Deco01 width="100%" height="auto" />
        <Tabs
          variant="depthListBox"
          index={tabIdx}
          onChange={(index) => setTabIdx(index)}
        >
          <TabList border="none">
            {brandShow && brandList && brandList.length > 0 && (
              <Tab>사업체</Tab>
            )}
            {buildShow && buildList && buildList.length > 0 && <Tab>건물</Tab>}
          </TabList>
          <TabPanels
            overflowY="scroll"
            sx={{
              "::-webkit-scrollbar": {
                w: "0px",
              },
            }}
          >
            {brandShow && brandList && brandList.length > 0 && (
              <TabPanel p="0" h="max-content">
                <ListBrand brandShow={brandShow} brandList={brandList} />
              </TabPanel>
            )}
            {buildShow && buildList && buildList.length > 0 && (
              <TabPanel p="0" h="max-content">
                <ListBuilding buildShow={buildShow} buildList={buildList} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
);

const ListBrand = memo(
  ({
    brandShow,
    brandList,
  }: {
    brandShow: boolean;
    brandList: {
      storeNm: string;
      xAxis: number;
      yAxis: number;
    }[];
  }) => {
    return brandList ? (
      <List display="flex" flexDirection="column">
        {brandList.map(
          (
            {
              storeNm,
              xAxis,
              yAxis,
            }: {
              storeNm: string;
              xAxis: number;
              yAxis: number;
            },
            idx: number
          ) => (
            <ListItemBrand
              key={`brandList-${idx}`}
              isShow={brandShow}
              idx={idx}
              storeNm={storeNm}
              lat={yAxis}
              lng={xAxis}
            />
          )
        )}
      </List>
    ) : null;
  }
);

const ListItemBrand = ({
  isShow,
  idx,
  storeNm,
  lat,
  lng,
}: {
  isShow: boolean;
  idx: number;
  storeNm: string;
  lat: number;
  lng: number;
}) => {
  const { state } = useContext(NaverMapContext);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (isHover && markerRef.current) {
      const pos = markerRef.current.getPosition();
      setCursorPo(pos);
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  useEffect(() => {
    if (state.map) {
      let zoom = state.map.getZoom() || 0;

      if (zoom >= 16 && isShow) {
        const center = state.map.getCenter();
        const circle = new naver.maps.Circle({
          map: state.map,
          center: center,
          radius: searchRange[zoom],
        });
        const circleBounds = circle.getBounds();
        const point = new naver.maps.LatLng(lat, lng);

        if (circleBounds.hasPoint(point)) {
          if (!markerRef.current) {
            const marker = new naver.maps.Marker({
              map: state.map,
              position: [lng, lat],
              icon: {
                url: markerBrand,
                size: new naver.maps.Size(50, 50),
                anchor: new naver.maps.Point(24, 42),
              },
              zIndex: 103,
            });

            marker.addListener("mouseover", () => {
              onHover(true);
            });

            marker.addListener("mouseout", () => {
              onHover(false);
            });

            markerRef.current = marker;
          }
        } else {
          if (markerRef.current) markerRef.current.setMap(null);
          markerRef.current = null;
        }
        circle.setMap(null);
      } else {
        if (markerRef.current) markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }

    let timer: any;
    const zoomEvent = naver.maps.Event.addListener(
      state.map,
      "bounds_changed",
      (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          if (state.map && isShow) {
            let zoom = state.map?.getZoom() || 0;

            if (zoom < 16 && markerRef.current) {
              markerRef.current.setMap(null);
              markerRef.current = null;

              return;
            } else if (zoom >= 16) {
              const center = state.map.getCenter();
              const circle = new naver.maps.Circle({
                map: state.map,
                center: center,
                radius: searchRange[zoom],
              });
              const circleBounds = circle.getBounds();
              const point = new naver.maps.LatLng(lat, lng);

              if (circleBounds.hasPoint(point)) {
                if (!markerRef.current) {
                  const marker = new naver.maps.Marker({
                    map: state.map,
                    position: [lng, lat],
                    icon: {
                      url: markerBrand,
                      size: new naver.maps.Size(50, 50),
                      anchor: new naver.maps.Point(24, 42),
                    },
                    zIndex: 103,
                  });

                  marker.addListener("mouseover", () => {
                    onHover(true);
                  });

                  marker.addListener("mouseout", () => {
                    onHover(false);
                  });

                  markerRef.current = marker;
                }
              } else {
                if (markerRef.current) markerRef.current.setMap(null);
                markerRef.current = null;
              }

              circle.setMap(null);
            }
          } else {
            if (markerRef.current) markerRef.current.setMap(null);
            markerRef.current = null;
          }
        }, 500);
      }
    );

    return () => {
      naver.maps.Event.removeListener(zoomEvent);
      if (markerRef.current) markerRef.current.setMap(null);
      markerRef.current = null;
    };
  }, [state.map, state.objects]);

  return (
    <Fragment>
      <ListItem
        key={`brandList-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="0.75rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        transition="0.2s"
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
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Image src={IconBrand} />
        <Text
          textStyle="base"
          fontSize="md"
          fontWeight="strong"
          color="font.primary"
        >
          {storeNm}
        </Text>
      </ListItem>
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
            pos="relative"
            top="-5.25rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="center"
            align="center"
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
              {storeNm || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const ListBuilding = memo(
  ({ buildShow, buildList }: { buildShow: boolean; buildList: any[] }) => {
    return buildList ? (
      <List
        key={"ul-building"}
        id={"ulBuilding"}
        display="flex"
        flexDirection="column"
      >
        {buildList.map(
          (
            {
              _id,
              mgmBldrgstPk,
              bldNm,
              newPlatPlc,
              platPlc,
              geometry,
            }: {
              _id: string;
              mgmBldrgstPk: string;
              bldNm: string;
              newPlatPlc: string;
              platPlc: string;
              geometry: any;
            },
            idx: number
          ) => (
            <ListItemBuilding
              key={`buildingList-${_id}`}
              _id={_id}
              idx={idx}
              mgmBldrgstPk={mgmBldrgstPk}
              bldNm={bldNm}
              newPlatPlc={newPlatPlc}
              platPlc={platPlc}
              geometry={geometry}
            />
          )
        )}
      </List>
    ) : null;
  }
);

const ListItemBuilding = ({
  _id,
  mgmBldrgstPk,
  bldNm,
  newPlatPlc,
  platPlc,
  geometry,
}: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const geoRef = useRef<any | null>(null);
  const overEventRef = useRef<any | null>(null);
  const outEventRef = useRef<any | null>(null);
  const clickEventRef = useRef<any | null>(null);

  // const cursorHandler = useCallback(
  //   (e: any) => {
  //     setCursorPo({ x: e?.clientX, y: e?.clientY });

  //     return () => {
  //       setCursorPo(null);
  //     };
  //   },
  //   [state.map]
  // );

  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener("mousemove", cursorHandler);
  //   };
  // }, []);

  return (
    <Fragment>
      <ListItem
        id={_id}
        key={_id}
        p="1rem 0.25rem 1rem"
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
            viewId: "buildingInfo",
            props: { id: _id, name: bldNm, mgmBldrgstPk: mgmBldrgstPk },
          });
          if (state.map) {
            const geoCenter = new naver.maps.LatLngBounds(
              geometry.coordinates[0][0]
            ).getCenter();

            state.map.setCenter(geoCenter);
            state.map.setZoom(18);
          }
        }}
        onMouseEnter={() => {
          if (state.map) {
            onHover(true);
            const tmp = state.map.data.getFeatureById(_id);

            tmp?.setStyle({
              fillColor: "#08979C",
              fillOpacity: 1,
            });
          }
        }}
        onMouseLeave={() => {
          if (state.map) {
            onHover(false);
            const tmp = state.map.data.getFeatureById(_id);

            tmp?.setStyle({
              fillColor: "#36CFC9",
              fillOpacity: 1,
            });
          }
        }}
      >
        <Flex
          w="2rem"
          h="2rem"
          justify="center"
          align="center"
          bgColor="secondary.second.type5"
          border="1px solid"
          borderColor="neutral.gray8"
          borderRadius="50%"
        >
          <IcoBuildingList width="1.5rem" height="1.5rem" color="#FFFFFF" />
        </Flex>
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            color="font.primary"
            noOfLines={1}
          >
            {bldNm || "건물명이 없습니다"}
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
            noOfLines={1}
          >
            {newPlatPlc || platPlc || "주소가 없습니다"}
          </Text>
        </Flex>
      </ListItem>
      {isHover && cursorPo && (
        <Flex
          pos="absolute"
          top={cursorPo.y - 10 || 0}
          left={cursorPo.x + 10 || 0}
          p="0 0.75rem"
          w="-webkit-fit-content"
          h="1.875rem"
          boxSizing="border-box"
          justify="center"
          align="center"
          bgColor="neutral.gray1"
          border="1px solid"
          borderRadius="base"
          borderColor="neutral.gray6"
          pointerEvents="none"
          textStyle="base"
          fontSize="xs"
          fontWeight="strong"
          lineHeight="1.875rem"
        >
          {bldNm}
        </Flex>
      )}
    </Fragment>
  );
};

export default DepthListBox;
