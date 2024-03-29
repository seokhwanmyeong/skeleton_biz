//  LIB
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CustomModalCell = (info: any) => (
  <Button
    variant="reverse"
    as={Link}
    to={"/erp/client/detail"}
    state={info}
    data-text={"상세보기"}
  >
    상세보기
  </Button>
);

export default CustomModalCell;
