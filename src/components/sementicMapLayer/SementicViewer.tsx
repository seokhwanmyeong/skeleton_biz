//  LIB
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
//  Page
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
//  Component
import ModalStoreDetail from "@components/modal/map/ModalStoreDetail";
import Report from "@src/components/sementicMapLayer/elementViewer/Report";
//  States
import { sementicViewState } from "@states/sementicMap/stateView";

const SementicViewer = () => {
  const { viewId, props } = useRecoilValue(sementicViewState);
  const reset = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (viewId === "storeInfo" || viewId === "rentInfo" || viewId === "eval") {
      onOpen();
    } else {
      onClose();
    }

    return () => {
      onClose();
    };
  }, [viewId]);

  if (viewId === "storeInfo" && props?.id) {
    return (
      <ModalStoreDetail
        id={props?.id}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  } else if (viewId === "rentInfo") {
    return (
      <Flex
        p="3rem 3rem"
        minW="400px"
        borderLeft="1px solid #ededed"
        bgColor="primary.main.bg"
        overflow="hidden"
        transition="0.3s"
      >
        <ErpRentDetail />
      </Flex>
    );
  } else if (viewId === "eval") {
    return <Report />;
  } else {
    return null;
  }
};

export default SementicViewer;
