//  Lib
import { useState, useContext, useCallback, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import { NaverMapAction } from "@src/lib/src/common/types";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Component
import InteractiveMarker from "./InteractiveMarker";
//  State
import { dataCollector } from "@states/sementicMap/filterState";
//  Sample
import dongData from "@util/data/area/dong.json";
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
import { atomFlowEnterArea } from "@src/states/sementicMap/mapState";

interface DongPanelProps {
  onClickArea?: (num: number) => any;
  range: any;
  dong: any;
  center: any;
  zoom: number;
}
const DongPanel = ({
  onClickArea,
  range,
  dong,
  center,
  zoom,
}: DongPanelProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [over, setOver] = useState(-1);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const [cont, setCont] = useState(0);
  const { slctName, slctCode, slctIdx, slctNum, slctPath, slctData, slctRank } =
    useMemo(() => dong, [dong]);

  const OnOver = useCallback(() => {
    const poly = state.objects?.get("area" + slctCode) as naver.maps.Polygon;

    if (poly === null) return;

    poly.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.5,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 6,
    });

    const polyline = state.objects?.get(
      "polyline_" + slctCode
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

    setOver(slctCode);
  }, [state.objects]);

  const OnOut = useCallback(() => {
    const poly = state.objects.get("area" + slctCode) as naver.maps.Polygon;

    if (poly === null) return;

    poly?.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.35,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 0,
    });

    const polyline = state.objects.get(
      "polyline_" + slctCode
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

  useEffect(() => {
    let setnum = (0.01 * 16) / zoom;

    setCont(parseFloat(setnum.toString()));
  }, [slctNum, zoom]);

  return (
    <>
      {/* <OverlayView
        id={`box${slctCode}`}
        // position={{
        //   y: (range.yMax + range.yMin) / 2 + cont ,
        //   x: range.xMin - 0.07,
        // }}
        // onClick={OnClcikArea}
        position={{
          y: range.yMax,
          x: range.xMin - cont * 2,
        }}
        onMouseOver={OnOver}
        onMouseOut={OnOut}
      >
        <Flex
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
              {slctName.replace(sigungu?.slctName, "")}
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
                    {slctData?.flow.data?.inflowCustCnt ?? "-"}
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
                    {slctData?.upjong.data?.storeCnt ?? "-"}
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
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M0.666626 1.00049H6.66663"
                    stroke="#262323"
                    strokeWidth="2"
                  />
                  <path
                    d="M120.667 1.00049H126.667"
                    stroke="#262323"
                    strokeWidth="2"
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
                    {slctData?.resi.data?.jobCustCnt ?? "-"}
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
                    {slctData?.sale.data?.avgSalesAmt ?? "-"}
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
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M0.666626 1.00049H6.66663"
                    stroke="#262323"
                    strokeWidth="2"
                  />
                  <path
                    d="M120.667 1.00049H126.667"
                    stroke="#262323"
                    strokeWidth="2"
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
                    {slctData?.job.data?.housCustcnt ?? "-"}
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
                    {slctData?.house.data?.hous ?? "-"}
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
                {slctData?.flow.data?.inflowCustCnt ||
                slctData?.upjong.data?.storeCnt ||
                slctData?.resi.data?.jobCustCnt ||
                slctData?.sale.data?.avgSalesAmt ||
                slctData?.job.data?.housCustcnt ||
                slctData?.house.data?.hous
                  ? String(slctRank)
                  : "-"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </OverlayView> */}
      {/* 기본프리셋 박스 */}
      <Flex
        pos="absolute"
        left="1%"
        top="10%"
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
            {slctName.replace(sigungu?.slctName, "")}
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
                  {slctData?.flow.data?.inflowCustCnt ?? "-"}
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
                  {slctData?.upjong.data?.storeCnt ?? "-"}
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
                  strokeOpacity="0.8"
                />
                <path
                  d="M0.666626 1.00049H6.66663"
                  stroke="#262323"
                  strokeWidth="2"
                />
                <path
                  d="M120.667 1.00049H126.667"
                  stroke="#262323"
                  strokeWidth="2"
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
                  {slctData?.resi.data?.jobCustCnt ?? "-"}
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
                  {slctData?.sale.data?.avgSalesAmt ?? "-"}
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
                  strokeOpacity="0.8"
                />
                <path
                  d="M0.666626 1.00049H6.66663"
                  stroke="#262323"
                  strokeWidth="2"
                />
                <path
                  d="M120.667 1.00049H126.667"
                  stroke="#262323"
                  strokeWidth="2"
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
                  {slctData?.job.data?.housCustcnt ?? "-"}
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
                  {slctData?.house.data?.hous ?? "-"}
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
              {slctData?.flow.data?.inflowCustCnt ||
              slctData?.upjong.data?.storeCnt ||
              slctData?.resi.data?.jobCustCnt ||
              slctData?.sale.data?.avgSalesAmt ||
              slctData?.job.data?.housCustcnt ||
              slctData?.house.data?.hous
                ? String(slctRank)
                : "-"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 유동인구 박스 */}
      <Flex
        pos="absolute"
        left="1%"
        top="30%"
        w="11.25rem"
        zIndex={5}
        direction="column"
      >
        <Flex direction="column">
          <Text>Population</Text>
          <Heading>유동인구</Heading>
        </Flex>
        <Flex>
          <Text>(만명)</Text>
          <Flex>
            <Box w="10%"></Box>
            <Box w="20%"></Box>
            <Box w="70%"></Box>
          </Flex>
          <Flex>
            <Box>0.1</Box>
            <Box>0.2</Box>
            <Box>0.3</Box>
            <Box>0.4</Box>
            <Box>0.5</Box>
            <Box>0.6</Box>
            <Box>0.7</Box>
            <Box>0.8</Box>
            <Box>0.9</Box>
            <Box>1.0</Box>
          </Flex>
        </Flex>
      </Flex>
      {/* 매물 Info 박스 */}
      <Flex
        pos="absolute"
        left="1%"
        top="60%"
        w="11.25rem"
        zIndex={5}
        direction="column"
      >
        test
      </Flex>
    </>
  );
};

export default DongPanel;
