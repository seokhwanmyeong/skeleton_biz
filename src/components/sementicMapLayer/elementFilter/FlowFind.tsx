//  Lib
import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
//  Component
import BtnReset from "@src/components/sementicMapLayer/elementFilter/BtnReset";
//  Icon
import { IcoBarChart, IcoErp, IcoFilter } from "@assets/icons/icon";

const FlowFind = () => {
  const [filterType, setType] = useState("");

  return (
    <>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
        gap="1.25rem"
      >
        <Button
          variant="filterTop"
          disabled={true}
          isActive={false}
          onClick={() => {
            if (filterType === "anal") {
              setType("");
            } else {
              setType("anal");
            }
          }}
        >
          <Box>
            <IcoFilter />
          </Box>
          분석필터
        </Button>
        <Button
          variant="filterTop"
          disabled={true}
          isActive={false}
          onClick={() => {
            if (filterType === "erp") {
              setType("");
            } else {
              setType("erp");
            }
          }}
        >
          <Box>
            <IcoErp />
          </Box>
          ERP 필터
        </Button>
        <BtnReset />
        <Button disabled={true} variant="filterTop" onClick={() => {}}>
          <Box>
            <IcoBarChart />
          </Box>
          리포트
        </Button>
      </Flex>
      {/* {filterType === "anal" && <NiceFilterDepth areaCode={dong?.slctCode} />}
      {filterType === "erp" && <ErpFilter areaCode={dong?.slctCode} />} */}
    </>
  );
};

export default FlowFind;
