//  LIB
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
//  Page
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
//  Component
import ModalStoreDetail from "@components/modal/map/ModalStoreDetail";
import ModalRentDetail from "@components/modal/map/ModalRentDetail";
import Report from "@src/components/sementicMapLayer/elementViewer/Report";
//  States
import { sementicViewState } from "@states/sementicMap/stateView";
import ModalBuilding from "../modal/map/ModalBuilding";

const SementicViewer = () => {
  const { viewId, props } = useRecoilValue(sementicViewState);
  const reset = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      viewId === "storeInfo" ||
      viewId === "rentInfo" ||
      viewId === "buildingInfo" ||
      viewId === "report"
    ) {
      onOpen();
    } else {
      onClose();
    }

    return () => {
      onClose();
    };
  }, [viewId]);

  if (viewId === "storeInfo" && props?.id) {
    console.log(props);
    return (
      <ModalStoreDetail
        id={props?.id}
        name={props.name || ""}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  } else if (viewId === "rentInfo") {
    return (
      <ModalRentDetail
        id={props?.id}
        name={props.name}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  } else if (viewId === "buildingInfo") {
    return (
      <ModalBuilding
        id={props?.id}
        name={props.name}
        mgmBldrgstPk={props.mgmBldrgstPk}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  } else if (viewId === "report") {
    return (
      <Report
        props={props}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  } else {
    return null;
  }
};

export default SementicViewer;
