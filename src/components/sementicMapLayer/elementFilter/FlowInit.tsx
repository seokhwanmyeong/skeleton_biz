//  Lib
import { Fragment } from "react";
//  Component
import FlowController from "@components/sementicMapLayer/elementFilter/FlowController";
import {
  DecoCardBg,
  DecoBotBox,
  DecoFrameCenter,
  DecoFrameL,
  DecoFrameR,
} from "@components/sementicMapLayer/elementDeco/Deco";
import {
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IcoAppStore } from "@src/assets/icons/icon";
import { Deco01 } from "@src/assets/deco/DecoSvg";
import ModalBuilding from "@components/modal/map/ModalBuilding";

const FlowInit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      {/* ------------------------------ 상단 ------------------------------*/}
      {/* --------------------------- 중단 Frame ---------------------------*/}
      <Flex w="100%" h="100%" zIndex={1} gap="0.625rem" pointerEvents="none">
        <DecoFrameL>test</DecoFrameL>
        <DecoFrameCenter />
        <DecoFrameR pr="0.25rem">
          <Flex
            pos="relative"
            m="0.1875rem 0"
            p="1rem 0rem 1rem 1.375rem"
            w="100%"
            h="100%"
            direction="column"
            border="1px solid"
            borderColor="neutral.gray6"
          >
            <Flex w="100%" h="fit-content" align="center" gap="0.75rem">
              <IcoAppStore width="0.875rem" height="0.875rem" />
              <Heading
                as={"h5"}
                bg="none"
                fontSize="md"
                lineHeight="1px"
                color="font.title"
                textAlign="center"
              >
                건물 데이터
              </Heading>
            </Flex>
            <Deco01 margin="0.75rem 0 0.25rem" width="100%" height="auto" />
            <List>
              <ListItem
                p="0.75rem 0 1.875rem"
                display="flex"
                borderBottom="1px solid"
                _hover={{
                  fontWeight: "strong",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("click");
                  onOpen();
                }}
              >
                <Flex direction="column">
                  <Text>평창점</Text>
                  <Text>서울 종로구 평창동 7-249</Text>
                </Flex>
              </ListItem>
              <ListItem
                p="0.75rem 0 1.875rem"
                display="flex"
                borderBottom="1px solid"
                _hover={{
                  fontWeight: "strong",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("click");
                  onOpen();
                }}
              >
                <Flex direction="column">
                  <Text>평창점</Text>
                  <Text>서울 종로구 평창동 7-249</Text>
                </Flex>
              </ListItem>
              <ListItem
                p="0.75rem 0 1.875rem"
                display="flex"
                borderBottom="1px solid"
                _hover={{
                  fontWeight: "strong",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("click");
                  onOpen();
                }}
              >
                <Flex direction="column">
                  <Text>평창점</Text>
                  <Text>서울 종로구 평창동 7-249</Text>
                </Flex>
              </ListItem>
            </List>
            <DecoCardBg />
          </Flex>
        </DecoFrameR>
      </Flex>
      <ModalBuilding onClose={onClose} isOpen={isOpen} />
      {/* ------------------------------ 하단 ------------------------------*/}
      <DecoBotBox>
        <FlowController />
      </DecoBotBox>
    </Fragment>
  );
};

export default FlowInit;
