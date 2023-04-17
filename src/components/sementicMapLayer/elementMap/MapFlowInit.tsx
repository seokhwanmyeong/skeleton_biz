//  Lib
import { Fragment, useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Flex } from "@chakra-ui/react";
import { NaverMapContext } from "@src/lib/src";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/stateMap";
//  Api
import { apiErpMap } from "@api/biz/config";

type Props = {};

const MapFlowInit = (props: Props) => {
  return null;
};

export default MapFlowInit;
