//  LIB
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CellStoreDetail = (info: any) => (
  <Button
    as={Link}
    to={"/erp/store/detail"}
    state={info}
    data-text={"상세보기"}
  >
    상세보기
  </Button>
);

export { CellStoreDetail };
