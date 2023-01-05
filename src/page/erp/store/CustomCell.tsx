//  LIB
import { Button } from "@chakra-ui/react";
import { Link as RoutLink } from "react-router-dom";
//  Components
import ModalStoreDetail from "@components/modal/erp/ModalStoreDetail";

// const CustomModalCell = (info: any) => <ModalStoreDetail info={info} />;
const CustomModalCell = (info: any) => (
  <Button
    as={RoutLink}
    to={"/erp/store/detail"}
    state={info}
    data-text={"상세보기"}
  >
    상세보기
  </Button>
);

export default CustomModalCell;
