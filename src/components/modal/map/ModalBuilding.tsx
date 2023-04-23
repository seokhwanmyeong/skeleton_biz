//  LIB
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Button,
  Flex,
  Heading,
  Divider,
  List,
  ListItem,
  Text,
  IconButton,
} from "@chakra-ui/react";
//  Type
import { IcoLeft } from "@assets/icons/icon";

type Props = {
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalBuilding = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent p="1rem 0" maxW="fit-content">
        <DrawerBody pos="relative" p="0" width="29rem">
          <Flex pb="1rem" justify="center" align="center" gap="1rem">
            <IconButton
              aria-label="리스트로 돌아가기"
              onClick={onClose}
              icon={
                <IcoLeft
                  width="1.25rem"
                  height="1.25rem"
                  color="font.primary"
                />
              }
              position="absolute"
              top="0.125rem"
              left="2.375rem"
              bg="transparent"
              color="font.primary"
              _hover={{
                bg: "transparent",
              }}
            />
            <Heading
              as={"h5"}
              fontSize="md"
              lineHeight="normal"
              color="font.primary"
              bg="none"
            >
              평창점
            </Heading>
          </Flex>
          <Divider borderColor="neutral.gray6" />
          <List variant="modalBuilding">
            <ListItem>
              <Text>대장종류</Text>
              <Text>집합</Text>
            </ListItem>
            <ListItem>
              <Text>대지위치 (지번)</Text>
              <Text>부산광역시 사하구 다대동 1550번지</Text>
            </ListItem>
            <ListItem>
              <Text>대지위치 (도로명)</Text>
              <Text>부산광역시 사하구 다내낙조2길 12 (부산아파트7단지)</Text>
            </ListItem>
            <ListItem mb="2rem">
              <Text>동명</Text>
              <Text>106동</Text>
            </ListItem>
            <ListItem>
              <Text>대지면적</Text>
              <Text>85188.1</Text>
            </ListItem>
            <ListItem>
              <Text>건축면적</Text>
              <Text>737.59</Text>
            </ListItem>
            <ListItem>
              <Text>건폐율</Text>
              <Text>14.46</Text>
            </ListItem>
            <ListItem>
              <Text>연면적</Text>
              <Text>12420.8848</Text>
            </ListItem>
            <ListItem>
              <Text>용적률 산정용 연면적</Text>
              <Text>11734.31</Text>
            </ListItem>
            <ListItem>
              <Text>용적률</Text>
              <Text>230.73</Text>
            </ListItem>
            <ListItem>
              <Text>부속건축물</Text>
              <Text>6</Text>
            </ListItem>
            <ListItem mb="2rem">
              <Text>부속건축물 면적</Text>
              <Text>416.56</Text>
            </ListItem>
            <ListItem>
              <Text>주구조</Text>
              <Text>철근콘크리트구조</Text>
            </ListItem>
            <ListItem>
              <Text>기타구조</Text>
              <Text>철근콘크리트구조</Text>
            </ListItem>
            <ListItem>
              <Text>용도</Text>
              <Text>공동주택</Text>
            </ListItem>
            <ListItem>
              <Text>용도(기타)</Text>
              <Text>공동주택(아파트)</Text>
            </ListItem>
            <ListItem mb="2rem">
              <Text>지붕구조</Text>
              <Text>(철근)콘크리트</Text>
            </ListItem>
            <ListItem>
              <Text>허가일</Text>
              <Text>1991-12-19</Text>
            </ListItem>
            <ListItem>
              <Text>부속건축물</Text>
              <Text>1993-10-24</Text>
            </ListItem>
            <ListItem mb="2rem">
              <Text>사용승인일</Text>
              <Text>1996-08-17</Text>
            </ListItem>
            <ListItem>
              <Text>세대수</Text>
              <Text>176</Text>
            </ListItem>
            <ListItem>
              <Text>가구수</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>호수</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>높이</Text>
              <Text>65.4</Text>
            </ListItem>
            <ListItem mb="2rem">
              <Text>층수(지하)</Text>
              <Text>22</Text>
            </ListItem>
            <ListItem>
              <Text>승강기(승용)</Text>
              <Text>2</Text>
            </ListItem>
            <ListItem>
              <Text>승강기(비상용)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥내 기계식 대수(대)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥내 기계식 면적(㎡)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥외 기계식 대수(대)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥외 기계식 면적(㎡)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥내 자주식 대수(대)</Text>
              <Text>331</Text>
            </ListItem>
            <ListItem>
              <Text>옥내 자주식 면적(㎡)</Text>
              <Text>3903.1</Text>
            </ListItem>
            <ListItem>
              <Text>옥외 자주식 대수(대)</Text>
              <Text>0</Text>
            </ListItem>
            <ListItem>
              <Text>옥외 자주식 면적(㎡)</Text>
              <Text>0</Text>
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalBuilding;
