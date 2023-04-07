import { Fragment } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
//  Icon
import { IcoDoubleSquere, IcoErp, IcoFilter } from "@src/assets/icons/icon";

const FlowController = () => {
  const setFlow = useSetRecoilState(atomFilterFlow);

  return (
    <Fragment>
      <Button
        variant="filterTop"
        onClick={() => {
          setFlow("enter");
        }}
      >
        <Box>
          <IcoFilter width="1.125rem" height="1.125rem" />
        </Box>
        분석필터
      </Button>
      <Button
        variant="filterTop"
        onClick={() => {
          setFlow("find");
        }}
      >
        <Box>
          <IcoErp width="1.125rem" height="1.125rem" />
        </Box>
        영역분석
      </Button>
      <Button
        variant="filterTop"
        onClick={() => {
          setFlow("erp");
        }}
      >
        <Box>
          <IcoDoubleSquere width="1.125rem" height="1.125rem" />
        </Box>
        브랜드 데이터
      </Button>
    </Fragment>
  );
};

export default FlowController;
