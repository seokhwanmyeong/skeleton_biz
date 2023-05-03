//  Lib
import { useRecoilValue } from "recoil";
import { Flex } from "@chakra-ui/react";
//  Component
import BrandListBox from "@components/sementicMapLayer/elementFilter/BrandListBox";
//  State
import {
  infoComErpBsnsD,
  infoComErpRent,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
//  Deco
import { DecoFrameR } from "@components/sementicMapLayer/elementDeco/Deco";

const MapFlowErp = () => {
  const { show: storeShow, data: storeList } = useRecoilValue(infoComErpStore);
  const { show: rentShow, data: rentList } = useRecoilValue(infoComErpRent);
  const { show: bsDisShow, data: bsDisList } = useRecoilValue(infoComErpBsnsD);

  return (
    <Flex w="100%" h="100%" justify="flex-end" zIndex={1} pointerEvents="none">
      <DecoFrameR pr="0.25rem">
        <BrandListBox
          storeShow={storeShow}
          bsDisShow={bsDisShow}
          rentShow={rentShow}
          store={storeList || []}
          rent={rentList || []}
          bsDis={bsDisList || []}
        />
      </DecoFrameR>
    </Flex>
  );
};

export default MapFlowErp;
