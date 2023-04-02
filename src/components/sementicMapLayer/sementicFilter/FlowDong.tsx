//  Lib
import React, { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomSlctDong } from "@states/sementicMap/mapState";
//  Component
import BtnReset from "@components/sementicMapLayer/sementicFilter/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/sementicFilter/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/sementicFilter/BtnBack";
import {
  IcoAppStore,
  IcoBarChart,
  IcoErp,
  IcoFilter,
} from "@src/assets/icons/icon";
import DecoTop from "./DecoTop";

type Props = {};

const FlowDong = (props: Props) => {
  const { state } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [dong, setDong] = useRecoilState(atomSlctDong);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap={"3rem"}
      >
        <Button
          onClick={() => {
            onClose();
          }}
          variant="filterTop"
        >
          <Box>
            <IcoAppStore />
          </Box>
          업종
        </Button>
        <Flex pos="relative" direction="column">
          <Flex pos="relative">
            <BtnBack
              onClick={() => {
                state.map?.setOptions({
                  minZoom: 0,
                  maxZoom: 16,
                  scrollWheel: false,
                });
                setFlow(1);
              }}
            />
            <Button
              variant="filterTopMain"
              onClick={() => {
                isOpen ? onClose() : onOpen();
              }}
            >
              {dong.slctName}
            </Button>
            <DecoTop width={"13rem"} />
          </Flex>
        </Flex>
        <BtnFlowCustom />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="1.25rem"
      >
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoFilter />
          </Box>
          분석필터
        </Button>
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoErp />
          </Box>
          ERP 필터
        </Button>
        <BtnReset />
        <Button variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
    </>
  );
};

export default FlowDong;
