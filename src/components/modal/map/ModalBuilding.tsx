//  LIB
import { Fragment } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Divider,
  Text,
  IconButton,
  Grid,
} from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
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
        <DrawerBody pos="relative" p="0" width="fit-content">
          <Flex direction="column" justify="center" align="center" gap="1rem">
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
              left="1.5rem"
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
            <Deco01 p="0 1.5rem" w="100%" h="auto" />
          </Flex>
          <Flex
            p="2.625rem 2rem 1rem"
            w="100%"
            direction="column"
            gap="2.75rem"
          >
            <Grid
              w="100%"
              templateColumns="6rem 1fr 6rem 1fr"
              gridColumnGap="2rem"
              gridRowGap="0.25rem"
            >
              <BuildingItem title="대장종류" content="집합" />
              <BuildingItem title="" content="" />
              <TextDivider />
              <BuildingItem
                title="대지위치 (지번)"
                content="부산광역시 사하구 다대동 1550번지"
                maxWidth="14rem"
              />
              <BuildingItem
                title="대지위치 (도로명)"
                content="부산광역시 사하구 다내낙조2길 12 (부산아파트7단지)"
                maxWidth="14rem"
              />
              <TextDivider />
              <BuildingItem title="건물명" content="도시몰운대아파트" />
              <BuildingItem title="동명" content="106동" />
            </Grid>
            <Grid
              w="100%"
              templateColumns="7.75rem 1fr 6rem 1fr 4.125rem 1fr"
              gridColumnGap="1rem"
              gridRowGap="0.25rem"
            >
              <BuildingItem title="대지면적" content="85188.1" />
              <BuildingItem title="건축면적" content="737.59" />
              <BuildingItem title="연면적" content="12420.8848" />
              <TextDivider gridColumn="1 / 7" />
              <BuildingItem title="용적률 산정용 연면적" content="11734.31" />
              <BuildingItem title="부속건축물 면적" content="416.56" />
              <BuildingItem title="부속건축물" content="6" />
              <TextDivider gridColumn="1 / 7" />
              <BuildingItem title="건폐율" content="14.46" mb="2.75rem" />
              <BuildingItem title="용적률" content="230.73" />
              <BuildingItem title="" content="" />
              <BuildingItem title="주구조" content="철근콘크리트구조" />
              <BuildingItem title="기타구조" content="철근콘크리트조" />
              <BuildingItem title="지붕구조" content="(철근)콘크리트" />
              <TextDivider gridColumn="1 / 7" />
              <BuildingItem title="용도" content="공동주택" mb="2.75rem" />
              <BuildingItem title="용도(기타)" content="공동주택(아파트)" />
              <BuildingItem title="" content="" />
              <BuildingItem title="허가일" content="1991-12-19" />
              <BuildingItem title="착공일" content="1991-12-19" />
              <BuildingItem title="사용승인일" content="1991-12-19" />
              <TextDivider gridColumn="1 / 7" />
              <BuildingItem title="세대수" content="11730" />
              <BuildingItem title="가구수" content="1173" />
              <BuildingItem title="호수" content="11730" />
              <TextDivider gridColumn="1 / 7" />
              <BuildingItem title="높이" content="665.4" />
              <BuildingItem title="층수(지하)" content="5" />
              <BuildingItem title="층수(지하)" content="" />
            </Grid>
            <Grid
              w="100%"
              templateColumns="7.75rem 1fr 7.75rem 1fr 7.75rem 1fr 7.75rem min-content"
              gridColumnGap="1.5rem"
              gridRowGap="0.25rem"
            >
              <BuildingItem title="승강기(승용)" content="2" />
              <BuildingItem title="" content="" />
              <BuildingItem title="승강기(비상용)" content="6" />
              <BuildingItem title="" content="" />
              <TextDivider gridColumn="1 / 9" />
              <BuildingItem title="옥내 기계식 대수(대)" content="0" />
              <BuildingItem title="옥내 기계식 면적(㎡)" content="3903.1" />
              <BuildingItem title="옥외 기계식 대수(대)" content="6" />
              <BuildingItem title="옥외 기계식 면적(㎡)" content="3903.1" />
              <TextDivider gridColumn="1 / 9" />
              <BuildingItem title="옥내 자주식 대수(대)" content="331" />
              <BuildingItem title="옥내 자주식 면적(㎡)" content="3903.1" />
              <BuildingItem title="옥외 자주식 대수(대)" content="6" />
              <BuildingItem title="옥외 자주식 면적(㎡)" content="3903.1" />
            </Grid>
          </Flex>
          {/* <List variant="modalBuilding">
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
          </List> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const BuildingItem = ({
  title,
  content,
  ...rest
}: {
  title: string;
  content: string;
  [x: string]: any;
}) => {
  return (
    <Fragment>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="strong"
        color="font.primary"
        whiteSpace="nowrap"
        lineHeight="1.5rem"
        {...rest}
      >
        {title}
      </Text>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="medium"
        color="font.primary"
        whiteSpace="break-spaces"
        lineHeight="1.5rem"
        {...rest}
      >
        {content}
      </Text>
    </Fragment>
  );
};

const TextDivider = ({ gridColumn }: { gridColumn?: string }) => {
  return <Divider gridColumn={gridColumn || "1 / 5"} borderBottomWidth="2px" />;
};

export default ModalBuilding;
