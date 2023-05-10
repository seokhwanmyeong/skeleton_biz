//  Lib
import { useContext, useEffect, useState, memo, Fragment } from "react";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import { Marker, NaverMapContext } from "@src/lib/src";
import {
  Flex,
  Heading,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
//  Icon
import { IcoBuildingList, IcoVillage } from "@assets/icons/icon";
import makerBrandS from "@assets/icons/marker_brand_small.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import { useSetRecoilState } from "recoil";
import { sementicViewState } from "@src/states/sementicMap/stateView";

type Props = {
  brandShow?: boolean;
  brandList?: {
    newAddr: string;
    oldAddr: string;
    storeNm: string;
    upjongNm: string;
    xAxis: number;
    yAxis: number;
  }[];
  buildShow?: boolean;
  buildList?: any[];
};

const DepthListBox = memo(
  ({ brandShow, brandList, buildShow, buildList }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <Flex
        pos="relative"
        m="0.1875rem 0"
        p="1rem 1.375rem 1rem"
        w="19.25rem"
        h="100%"
        direction="column"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRight="none"
        bg="linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%)"
        backdropFilter="blur(2px)"
      >
        <Flex
          w="100%"
          h="fit-content"
          justify="center"
          align="center"
          gap="0.75rem"
        >
          <Heading
            as={"h5"}
            bg="none"
            fontSize="sm"
            lineHeight="1px"
            color="font.title"
            textAlign="center"
          >
            사업체 데이터
          </Heading>
        </Flex>
        <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
        <Tabs variant="depthListBox">
          <TabList mb="1rem" border="none">
            {brandList && brandList.length > 0 && <Tab>사업체</Tab>}
            <Tab>건물</Tab>
          </TabList>
          <TabPanels>
            {/* {brandList && brandList.length > 0 && (
            <TabPanel>
              <List display="flex" flexDirection="column">
                {brandList.map(({ storeNm }, idx: number) => {
                  return (
                    <ListItem
                      key={`brandList-${idx}`}
                      p="1rem 0rem 0.75rem"
                      display="flex"
                      alignItems="center"
                      gap="0.75rem"
                      bg={
                        slctNice?.hoverId === `markerBrand-${idx}`
                          ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
                          : "transparent"
                      }
                      borderBottom="1px solid"
                      borderColor="neutral.gray8"
                      transition="0.2s"
                      _hover={{
                        fontWeight: "strong",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => {
                        setSlctNice({
                          ...slctNice,
                          name: storeNm,
                          hoverId: `markerBrand-${idx}`,
                        });
                      }}
                      onMouseLeave={() => {
                        setSlctNice({ ...slctNice, name: "", hoverId: "" });
                      }}
                    >
                      <Flex
                        justify="center"
                        align="center"
                        w="2.5rem"
                        h="2rem"
                        bgColor="secondary.third.type5"
                        border="1px solid"
                        borderColor="neutral.gray8"
                        borderRadius="2px"
                      >
                        <IcoBuildingList color="#FFFFFFD9" />
                      </Flex>
                      <Text
                        textStyle="base"
                        fontSize="md"
                        fontWeight="strong"
                        color="font.primary"
                      >
                        {storeNm}
                      </Text>
                    </ListItem>
                  );
                })}
              </List>
            </TabPanel>
          )} */}
            {brandShow && brandList && brandList.length > 0 && (
              <TabPanel>
                <ListBrand brandShow={brandShow} brandList={brandList} />
              </TabPanel>
            )}
            {buildShow && buildList && buildList.length > 0 && (
              <TabPanel>
                <ListBuilding buildShow={buildShow} buildList={buildList} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
);

const ListBrand = memo(
  ({
    brandShow,
    brandList,
  }: {
    brandShow: boolean;
    brandList: {
      storeNm: string;
      xAxis: number;
      yAxis: number;
    }[];
  }) => {
    return brandList ? (
      <List display="flex" flexDirection="column">
        {brandList.map(
          (
            {
              storeNm,
              xAxis,
              yAxis,
            }: {
              storeNm: string;
              xAxis: number;
              yAxis: number;
            },
            idx: number
          ) => (
            <ListItemBrand
              key={`brandList-${idx}`}
              isShow={brandShow}
              idx={idx}
              storeNm={storeNm}
              lat={yAxis}
              lng={xAxis}
            />
          )
        )}
      </List>
    ) : null;
  }
);

const ListItemBrand = ({
  isShow,
  idx,
  storeNm,
  lat,
  lng,
}: {
  isShow: boolean;
  idx: number;
  storeNm: string;
  lat: number;
  lng: number;
}) => {
  const { state } = useContext(NaverMapContext);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerBrand-${idx}`);

      if (obj) {
        const pos = obj.getPosition();
        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  return (
    <Fragment>
      <ListItem
        key={`brandList-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="0.75rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        transition="0.2s"
        bg={
          isHover
            ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
            : "transparent"
        }
        _hover={{
          fontWeight: "strong",
          cursor: "pointer",
        }}
        onClick={() => {}}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex
          justify="center"
          align="center"
          w="2.5rem"
          h="2rem"
          bgColor="secondary.third.type5"
          border="1px solid"
          borderColor="neutral.gray8"
          borderRadius="2px"
        >
          <IcoBuildingList color="#FFFFFFD9" />
        </Flex>
        <Text
          textStyle="base"
          fontSize="md"
          fontWeight="strong"
          color="font.primary"
        >
          {storeNm}
        </Text>
      </ListItem>
      {isShow && lat && lng && (
        <Marker
          key={`markerBrand-${idx}`}
          id={`markerBrand-${idx}`}
          opts={{
            position: [lng, lat],
            icon: {
              url: makerBrandS,
              size: new naver.maps.Size(50, 50),
              anchor: new naver.maps.Point(24, 42),
            },
          }}
          onClick={() => {}}
          onMouseOver={() => onHover(true)}
          onMouseOut={() => onHover(false)}
        />
      )}
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
            pos="relative"
            top="-5.25rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="center"
            align="center"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
            transition="0.3s"
            whiteSpace="nowrap"
          >
            <Text
              textStyle="base"
              fontSize="sm"
              fontWeight="strong"
              lineHeight="normal"
              transition="0.3s"
              color="font.primary"
              whiteSpace="nowrap"
            >
              {storeNm || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const ListBuilding = memo(
  ({ buildShow, buildList }: { buildShow: boolean; buildList: any[] }) => {
    return buildList ? (
      <List display="flex" flexDirection="column" gap="1rem">
        {buildList.map(
          (
            {
              storeNm,
              xAxis,
              yAxis,
            }: {
              storeNm: string;
              xAxis: number;
              yAxis: number;
            },
            idx: number
          ) => (
            <ListItemBuilding
              key={`buildingList-${idx}`}
              idx={idx}
              storeNm={storeNm}
              lat={yAxis}
              lng={xAxis}
            />
          )
        )}
      </List>
    ) : null;
  }
);

const ListItemBuilding = ({
  idx,
  storeNm,
  lat,
  lng,
}: {
  idx: number;
  storeNm: string;
  lat: number;
  lng: number;
}) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerBrand-${idx}`);

      if (obj) {
        const pos = obj.getPosition();
        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  return (
    <Fragment>
      <ListItem
        p="0rem 0.25rem 1rem"
        display="flex"
        alignItems="center"
        gap="1rem"
        borderBottom="1px solid"
        borderColor="neutral.gray8"
        bg={
          isHover
            ? "linear-gradient(90deg, rgba(255, 236, 61, 0) 0%, #FFEC3D 36.2%, rgba(255, 236, 61, 0) 92.66%)"
            : "transparent"
        }
        _hover={{
          fontWeight: "strong",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log("click");
          setSv({
            viewId: "buildingInfo",
            props: {},
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex
          w="2rem"
          h="2rem"
          justify="center"
          align="center"
          bgColor="secondary.second.type5"
          border="1px solid"
          borderColor="neutral.gray8"
          borderRadius="50%"
        >
          <IcoVillage width="1.5rem" height="1.5rem" color="#FFFFFF" />
        </Flex>
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            color="font.primary"
          >
            대성빌딩
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
          >
            서울 종로구 평창동 7-249
          </Text>
        </Flex>
      </ListItem>
      {isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
            pos="relative"
            top="-5.25rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="center"
            align="center"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
            transition="0.3s"
            whiteSpace="nowrap"
          >
            <Text
              textStyle="base"
              fontSize="sm"
              fontWeight="strong"
              lineHeight="normal"
              transition="0.3s"
              color="font.primary"
              whiteSpace="nowrap"
            >
              {storeNm || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default DepthListBox;
