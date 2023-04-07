//  LIB
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Flex, Button } from "@chakra-ui/react";
//  Page
import ErpStoreDetail from "@page/erp/store/ErpStoreDetail";
import ErpRentDetail from "@page/erp/rent/ErpRentDetail";
//  Component
import Report from "@src/components/sementicMapLayer/elementViewer/Report";
//  States
import { sementicViewState } from "@states/sementicMap/stateView";

type Props = {};

const SementicViewer = (props: Props) => {
  const [sv, setSv] = useRecoilState(sementicViewState);
  const [toggle, setToggle] = useState<boolean>(true);
  const ref = useRef<any>();

  const onToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setToggle(true);
  }, [sv]);

  const Content = () => {
    const { viewId, props } = sv;
    if (viewId === "storeInfo") {
      return (
        <Flex
          p="3rem 3rem"
          minW="400px"
          borderLeft="1px solid #ededed"
          bgColor="primary.main.bg"
          overflow="hidden"
          transition="0.3s"
        >
          <ErpStoreDetail id={props.storeCode} activeBack={false} side={true} />
        </Flex>
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

  if (!sv.viewId && !Content()) {
    return null;
  }

  return (
    <Flex
      position="absolute"
      right={toggle ? "0" : -ref.current.clientWidth}
      top="0"
      zIndex="9999"
      h="100%"
      transition="0.2s"
      ref={ref}
    >
      <Button
        variant="search"
        position="absolute"
        left="-3rem"
        top="0"
        borderRadius="0px 0px 0px 5px"
        w="3rem"
        lineHeight="3rem"
        onClick={onToggle}
      >
        {toggle ? "FOLD" : "OPEN"}
      </Button>
      <Content />
    </Flex>
  );
};

export default SementicViewer;
