//  Lib
import { useSetRecoilState } from "recoil";
import { Box, Button } from "@chakra-ui/react";
//  State
import {
  atomFilterFlow,
  resetNice,
  resetNiceDepth,
  resetErp,
} from "@src/states/sementicMap/stateFilter";
import { resetHandler } from "@src/states/sementicMap/stateMap";
import { IcoReset } from "@assets/icons/icon";

type Props = {
  activeReset?: boolean;
  onClick?: (props?: any) => any;
};

const BtnReset = ({ activeReset = true, onClick }: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const resetSlctArea = useSetRecoilState(resetHandler);
  const resetNiceFilter = useSetRecoilState(resetNice);
  const resetNiceDepthFilter = useSetRecoilState(resetNiceDepth);
  const resetErpFilter = useSetRecoilState(resetErp);

  return (
    <Button
      variant="filterTop"
      onClick={() => {
        if (activeReset) {
          resetSlctArea();
          resetNiceFilter();
          resetNiceDepthFilter();
          resetErpFilter();
          setFlow("init");
        }
        onClick && onClick();
      }}
    >
      <Box>
        <IcoReset width="1.125rem" height="1.125rem" />
      </Box>
      전체 초기화
    </Button>
  );
};

export default BtnReset;
