//  Lib
import { Fragment } from "react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
import { Button, useDisclosure } from "@chakra-ui/react";
import ModalBsDisDetail from "@src/components/modal/map/ModalBsDisDetail";
import ModalBsnsDEditor from "@src/components/modal/map/ModalBsnsDEditor";
import ModalHistoryEditor from "@src/components/modal/map/ModalHistoryEditor";

const FlowInit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Button zIndex={1000} color="#000000" onClick={() => {}}>
        상권 뷰
      </Button>
      <Button zIndex={1000} color="#000000" onClick={() => {}}>
        상권 생성
      </Button>
      {/* --------------------------- 중단 Frame ---------------------------*/}
      {/* ------------------------------ 하단 ------------------------------*/}
      <FlowController />
    </Fragment>
  );
};

export default FlowInit;
