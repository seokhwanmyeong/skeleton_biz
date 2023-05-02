//  Lib
import { Fragment } from "react";
import { Box, Button } from "@chakra-ui/react";
//  Component
import BtnReset from "@components/sementicMapLayer/elementFilter/BtnReset";
//  Icon
import { IcoBorderOuter } from "@assets/icons/icon";
//  Deco
import { DecoBotHightBox } from "@components/sementicMapLayer/elementDeco/Deco";

const FlowFind = () => {
  return (
    <Fragment>
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotHightBox>
        <Button variant="filterTop" disabled={false} isActive={true}>
          <Box>
            <IcoBorderOuter width="1.125rem" height="1.125rem" />
          </Box>
          영역 분석
        </Button>
        <BtnReset />
      </DecoBotHightBox>
    </Fragment>
  );
};

export default FlowFind;
