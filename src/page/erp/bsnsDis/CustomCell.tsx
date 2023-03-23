//  LIB
import { Button } from "@chakra-ui/react";
import { Link as RoutLink } from "react-router-dom";

const CustomCellLinkView = (info: any) => (
  <Button as={RoutLink} to={"/maps"} state={info} data-text={"상권분석"}>
    상권분석
  </Button>
);

const CustomCellLinkUpdate = (info: any) => (
  <Button as={RoutLink} to={"/maps"} state={info} data-text={"수정하기"}>
    수정하기
  </Button>
);

export { CustomCellLinkView, CustomCellLinkUpdate };
