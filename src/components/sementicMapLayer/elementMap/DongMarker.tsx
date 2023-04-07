import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Marker, NaverMapContext, Polyline } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Polygon from "@src/lib/src/components/Overlay/Polygon";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Deco01 } from "@src/assets/deco/DecoSvg";
import {
  IcoFood,
  IcoHousehold,
  IcoHuman,
  IcoMoney,
  IcoPeople,
  IcoResi,
} from "@src/assets/icons/icon";

interface DongMarkerProps {
  name: string;
  num: number;
  selectDong: number;
  range: any;
  direction?: {
    direct: "left" | "right";
    idx: number;
  };
  position:
    | naver.maps.PointLiteral
    | naver.maps.CoordLiteral
    | naver.maps.LatLngLiteral
    | any;
  onClickArea: (num: number) => any;
  rightIdx: number;
  leftIdx: number;
  data?: any;
}
const DongMarker = ({
  name,
  num,
  direction,
  range,
  selectDong,
  position,
  onClickArea,
  rightIdx,
  leftIdx,
  data,
}: DongMarkerProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [cont, setCont] = useState(0);
  const [contY, setConstY] = useState(0);
  const boxRef = useRef<any>(null);
  const [mapCenter, SetMapCenter] = useState<any>();
  const [onleft, SetOnLeft] = useState(false);
  const [onsetMap, setOnsetMap] = useState(false);
  const [active, setActive] = useState(false);
  const [over, setOver] = useState(-1);

  useEffect(() => {
    if (state.map === undefined) return;
    const curCenter = state.map.getCenter();

    const mapcent = {
      x: curCenter.x,
      y: curCenter.y,
    };
    SetMapCenter(mapcent);
    if (mapcent?.x > position.x) {
      SetOnLeft(true);
    } else {
      SetOnLeft(false);
    }
    setOnsetMap(true);
  }, [state.map]);

  useEffect(() => {
    if (direction) {
      let setnum = 0.014 * direction.idx;
      setCont(parseFloat(setnum.toString()));
    } else {
      let setnum = 0.0101 * num;
      setCont(parseFloat(setnum.toString()));
    }
  }, [num]);

  useEffect(() => {
    if (selectDong === -1) {
      OnOut();
      return;
    }

    if (num === selectDong) {
      OnOver();
    } else {
      OnOut();
    }
  }, [selectDong]);

  const OnOver = useCallback(() => {
    const poly = state.objects?.get("area" + num) as naver.maps.Polygon;

    if (poly === null) return;

    poly.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.5,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 6,
    });

    const polyline = state.objects?.get(
      "polyline_" + num
    ) as naver.maps.Polyline;

    if (polyline === undefined) return;

    polyline?.setOptions({
      clickable: true,
      strokeColor: "#BFBFBF",
      strokeStyle: "solid",
      strokeOpacity: 1,
      strokeWeight: 2,
    });

    // if (boxRef?.current?.style) {
    //   boxRef.current.style.backgroundColor = "salmon";
    // }

    setOver(num);
  }, [state.objects]);

  const OnOut = useCallback(() => {
    const poly = state.objects.get("area" + num) as naver.maps.Polygon;

    if (poly === null) return;

    poly?.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.35,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 0,
    });

    const polyline = state.objects.get(
      "polyline_" + num
    ) as naver.maps.Polyline;

    if (polyline === undefined) return;

    polyline.setOptions({
      strokeColor: "#194D33",
      strokeStyle: "solid",
      strokeOpacity: 0.3,
      strokeWeight: 1,
    });

    // if (boxRef?.current?.style) {
    //   boxRef.current.style.backgroundColor = "#56CE92";
    // }

    setOver(-1);
  }, [state.objects]);

  const OnClcikArea = () => {
    onClickArea(num);
  };

  useEffect(() => {
    if (data) {
      const { flow, resi, job, house, sale, upjong } = data;
      if (
        flow.active ||
        resi.active ||
        job.active ||
        house.active ||
        sale.active ||
        upjong.active
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [data]);

  return (
    <>
      {onsetMap && active ? (
        <div>
          <Polyline
            id={"polyline_" + num}
            opts={{
              path: onleft
                ? [
                    {
                      lat: Number(position.y) - 0.0012,
                      lng: Number(position.x) + 0.0013,
                    },
                    // {
                    //   y: (range.yMax + range.yMin) / 2 + cont - 0.034,
                    //   x: range.xMin - 0.014,
                    // },
                    {
                      y: (range.yMax + range.yMin) / 2 + cont - 0.034,
                      x: range.xMin - 0.036,
                    },
                  ]
                : [
                    {
                      lat: Number(position.y) - 0.0012,
                      lng: Number(position.x) + 0.0013,
                    },
                    // {
                    //   y: (range.yMax + range.yMin) / 2 + cont - 0.034,
                    //   x: range.xMax + 0.0075,
                    // },
                    {
                      y: (range.yMax + range.yMin) / 2 + cont - 0.034,
                      x: range.xMax + 0.036,
                    },
                  ],
              strokeColor: "#BFBFBF",
              strokeStyle: "solid",
              strokeOpacity: 1,
              strokeWeight: 1,
              zIndex: 2,
            }}
          />
          <OverlayView
            id={`box${num}`}
            // position={
            //   onleft
            //     ? {
            //         y: mapCenter?.y + cont - 0.034,
            //         x: mapCenter?.x - 0.08,
            //       }
            //     : {
            //         y: mapCenter?.y + cont - 0.034,
            //         x: mapCenter?.x + 0.06,
            //       }
            // }
            position={
              onleft
                ? {
                    y: (range.yMax + range.yMin) / 2 + cont - 0.037,
                    x: range.xMin - 0.07,
                  }
                : {
                    y: (range.yMax + range.yMin) / 2 + cont - 0.037,
                    x: range.xMax + 0.04,
                  }
            }
            onClick={OnClcikArea}
            onMouseOver={OnOver}
            onMouseOut={OnOut}
          >
            <Flex
              ref={boxRef}
              className="box"
              pos="absolute"
              left={0}
              top={-15}
              w="11.25rem"
              zIndex={5}
              direction="column"
            >
              <Flex
                align="center"
                mb="1px"
                ml="0.875rem"
                gap="3px"
                bgColor="rgba(255, 255, 255, 0.75)"
                border="1px solid #BFBFBF"
                _before={{
                  content: '""',
                  display: "block",
                  w: "0.625rem",
                  h: "100%",
                  flex: "none",
                  borderRight: "1px solid",
                  borderColor: "#BFBFBF",
                }}
              >
                <Heading variant="sigunguTitle">
                  {name.replace("서울특별시", "")}
                </Heading>
                <Deco01 margin="0" width="100%" height="4px" flexShrink="1" />
              </Flex>
              <Flex>
                <Flex
                  p="0.875rem 0 0 0.625rem"
                  justify="center"
                  align="center"
                  flexGrow={1}
                  direction="column"
                  background="linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
                  // filter="blur(3.33333px)"
                  backdropFilter="blur(1.21212px)"
                >
                  <Flex w="100%" justify="space-between" gap="3px">
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoHuman
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.flow.data.inflowCustCnt ?? "-"}
                      </Text>
                    </Flex>
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoFood
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.upjong.data.storeCnt ?? "-"}
                      </Text>
                    </Flex>
                  </Flex>
                  <svg
                    width="110"
                    height="2"
                    viewBox="0 0 127 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M0.666626 1.00049H126.333"
                        stroke="#262323"
                        stroke-opacity="0.8"
                      />
                      <path
                        d="M0.666626 1.00049H6.66663"
                        stroke="#262323"
                        stroke-width="2"
                      />
                      <path
                        d="M120.667 1.00049H126.667"
                        stroke="#262323"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  <Flex w="100%" justify="space-between" gap="3px">
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoResi
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.resi.data.jobCustCnt ?? "-"}
                      </Text>
                    </Flex>
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoMoney
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.sale.data.avgSalesAmt ?? "-"}
                      </Text>
                    </Flex>
                  </Flex>
                  <svg
                    width="110"
                    height="2"
                    viewBox="0 0 127 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M0.666626 1.00049H126.333"
                        stroke="#262323"
                        stroke-opacity="0.8"
                      />
                      <path
                        d="M0.666626 1.00049H6.66663"
                        stroke="#262323"
                        stroke-width="2"
                      />
                      <path
                        d="M120.667 1.00049H126.667"
                        stroke="#262323"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                  <Flex w="100%" justify="space-between" gap="3px">
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoPeople
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.job.data.housCustcnt ?? "-"}
                      </Text>
                    </Flex>
                    <Flex w="50%">
                      <Flex
                        pl="0.875rem"
                        h="1rem"
                        pos="relative"
                        align="flex-end"
                        border="1px solid #BFBFBF"
                        boxSizing="border-box"
                      >
                        <IcoHousehold
                          position="absolute"
                          top="0"
                          left="0"
                          width="0.7rem"
                          height="auto"
                        />
                        <Text
                          fontWeight="strong"
                          fontSize="0.6875rem"
                          color="rgba(38, 35, 35, 0.8)"
                        >
                          01
                        </Text>
                      </Flex>
                      <Text
                        w="100%"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize="xs"
                      >
                        {data.house.data.hous ?? "-"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  p="0.25rem 0.4375rem"
                  align="center"
                  direction="column"
                  bgColor="rgba(255, 255, 255, 0.75)"
                  border="1px solid #BFBFBF"
                >
                  <Text
                    fontWeight={300}
                    fontSize="0.6875rem"
                    lineHeight="0.875rem"
                    color="#262323"
                  >
                    total
                  </Text>
                  <Text
                    fontWeight="medium"
                    fontSize="0.8125rem"
                    lineHeight="1.125rem"
                    color="#262323"
                    letterSpacing={0}
                  >
                    RANK
                  </Text>
                  <Text
                    fontWeight="strong"
                    fontSize="1.6875rem"
                    lineHeight="2.1875rem"
                    color="#262323"
                    letterSpacing="-3px"
                  >
                    {String(num + 1).length === 1 ? `0${num + 1}` : num + 1}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </OverlayView>
          <OverlayView id={`marker01_${num}`} position={position}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8.48523"
                y="16.2636"
                width="11"
                height="11"
                transform="rotate(-135 8.48523 16.2636)"
                fill="white"
                fill-opacity="0.5"
                stroke="#BFBFBF"
              />
              <rect
                x="8.48523"
                y="13.435"
                width="7"
                height="7"
                transform="rotate(-135 8.48523 13.435)"
                fill={over === num ? "#FADB14" : "transparent"}
                stroke="#8C8C8C"
              />
            </svg>
          </OverlayView>
          <OverlayView
            id={`marker02_${num}`}
            position={
              onleft
                ? {
                    y: (range.yMax + range.yMin) / 2 + cont - 0.03345,
                    x: range.xMin - 0.037,
                  }
                : {
                    y: (range.yMax + range.yMin) / 2 + cont - 0.03345,
                    x: range.xMax + 0.035,
                  }
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.707107"
                y="5.65674"
                width="7"
                height="7"
                transform="rotate(-45 0.707107 5.65674)"
                fill="white"
                fill-opacity="0.5"
                stroke="#595959"
              />
            </svg>
          </OverlayView>
        </div>
      ) : null}
    </>
  );
};

export default DongMarker;
