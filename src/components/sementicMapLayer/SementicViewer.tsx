//  LIB
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useDisclosure } from "@chakra-ui/react";
//  Component
import ModalStoreDetail from "@components/modal/map/ModalStoreDetail";
import ModalRentDetail from "@components/modal/map/ModalRentDetail";
import Report from "@src/components/sementicMapLayer/elementViewer/Report";
//  States
import { sementicViewState } from "@states/sementicMap/stateView";
import ModalBuilding from "../modal/map/ModalBuilding";
import ModalBsDisDetail from "../modal/map/ModalBsDisDetail";

const SementicViewer = () => {
  const { viewId, props } = useRecoilValue(sementicViewState);
  const reset = useResetRecoilState(sementicViewState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      viewId === "storeInfo" ||
      viewId === "rentInfo" ||
      viewId === "buildingInfo" ||
      viewId === "bsDisInfo" ||
      viewId === "report"
    ) {
      onOpen();
    } else {
      onClose();
    }

    return () => {
      onClose();
    };
  }, [viewId, props]);

  if (viewId === "storeInfo" && props?.id) {
    console.log(props);
    return (
      <ModalStoreDetail
        id={props?.id}
        name={props.name || ""}
        isOpen={isOpen}
        onClose={() => {
          console.log("click");
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
  } else if (viewId === "bsDisInfo") {
    return (
      <ModalBsDisDetail
        id={props?.id}
        name={props.name}
        code={props.code}
        polygonType={props.polygonType}
        geometry={props.geometry}
        range={Number(props.range) || 0}
        center={props.center}
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
