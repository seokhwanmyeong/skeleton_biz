//  Lib
import { useRecoilValue } from "recoil";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
//  Component
import BrandListBox from "@components/sementicMapLayer/elementFilter/BrandListBox";
//  State
import {
  infoComErpBsnsD,
  infoComErpRent,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
//  Deco
import { DecoFrameR } from "@components/sementicMapLayer/elementDeco/DecoCenter";
import ModalRentDetail from "@src/components/modal/map/ModalRentDetail";

const MapFlowErp = () => {
  const { show: storeShow, data: storeList } = useRecoilValue(infoComErpStore);
  const { show: rentShow, data: rentList } = useRecoilValue(infoComErpRent);
  const { show: bsDisShow, data: bsDisList } = useRecoilValue(infoComErpBsnsD);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex w="100%" h="100%" justify="flex-end" zIndex={1} pointerEvents="none">
      <Button
        top="50%"
        onClick={() => {
          console.log("click");
          onOpen();
        }}
      >
        test
      </Button>
      {(storeList?.length > 0 ||
        rentList?.length > 0 ||
        bsDisList?.length > 0) && (
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
      )}
    </Flex>
  );
};

export default MapFlowErp;
