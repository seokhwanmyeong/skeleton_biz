//  LIB
import { Flex } from "@chakra-ui/react";
//  Components
import ModalStoreDetail from "./ModalStoreDetail";

const CustomModalCell = (info: any) => (
  <Flex gap={2}>
    <ModalStoreDetail info={info} />
  </Flex>
);

export default CustomModalCell;
