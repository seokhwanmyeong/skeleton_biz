//  Lib
import { useState, memo, Fragment, useEffect, useContext } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Circle from "@src/lib/src/components/Overlay/Circle";
import { Marker, NaverMapContext, Polygon } from "@src/lib/src";
//  State
import { atomSlctErp } from "@states/sementicMap/stateMap";
import { sementicViewState } from "@states/sementicMap/stateView";
//  Util
import { getCenterPolygon } from "@util/map/distance";
import { bsDisColor } from "@util/define/bsDis";
//  Icon
import markerStore from "@assets/icons/marker_store.png";
import markerRent from "@assets/icons/marker_rent.png";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Ani
import { infoAnimation } from "@styles/animation/keyFremes";

type Props = {
  storeShow: boolean;
  bsDisShow: boolean;
  rentShow: boolean;
  store: any[];
  rent: any[];
  bsDis: any[];
};

const BrandListBox = memo(
  ({ storeShow, bsDisShow, rentShow, store, rent, bsDis }: Props) => (
    <Flex
      pos="relative"
      m="0.1875rem 0"
      p="1rem 1.375rem 1rem"
      w="100%"
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
          매장 조회
        </Heading>
      </Flex>
      <Deco01 margin="0.75rem 0 0.5rem" width="100%" height="auto" />
      <Tabs variant="depthListBox">
        <TabList border="none">
          {store && store.length > 0 && <Tab>매장</Tab>}
          {bsDis && bsDis.length > 0 && <Tab>상권</Tab>}
          {rent && rent.length > 0 && <Tab>매물</Tab>}
        </TabList>
        <TabPanels>
          {store && store.length > 0 && (
            <TabPanel>
              <ListStore storeShow={storeShow} storeList={store} />
            </TabPanel>
          )}
          {bsDis && bsDis.length > 0 && (
            <TabPanel>
              <List display="flex" flexDirection="column">
                {bsDis.map((dis: any, idx: number) => {
                  const {
                    bisName,
                    bsDisType,
                    _id,
                    polygon,
                    polygon_type,
                    range,
                    center,
                  } = dis;

                  return (
                    <ListBsDis
                      isShow={bsDisShow}
                      idx={idx}
                      _id={_id}
                      biDissName={bisName}
                      bsDisType={bsDisType}
                      polygon_type={polygon_type}
                      polygon={polygon || null}
                      range={range || null}
                      center={center || null}
                    />
                  );
                })}
              </List>
            </TabPanel>
          )}
          {rent && rent.length > 0 && (
            <TabPanel>
              <ListRent rentShow={rentShow} rentList={rent} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Flex>
  )
);

const ListStore = memo(({ storeShow, storeList }: any) => {
  return storeList ? (
    <List display="flex" flexDirection="column">
      {storeList.map(
        ({ _id, storeName, addr, storePhone, lat, lng }: any, idx: number) => (
          <ListItemStore
            key={`storeList-${idx}`}
            isShow={storeShow}
            idx={idx}
            _id={_id}
            storeName={storeName}
            addr={addr}
            storePhone={storePhone}
            lat={lat}
            lng={lng}
          />
        )
      )}
    </List>
  ) : null;
});

const ListItemStore = ({
  isShow,
  idx,
  _id,
  storeName,
  addr,
  storePhone,
  lat,
  lng,
}: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerStore-${idx}`);

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
        key={`storeList-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="1.25rem"
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
          setSv({
            viewId: "storeInfo",
            props: {
              id: _id,
              name: storeName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex justify="center" align="center" flex="none">
          <Image src={markerStore} w="auto" bg="transparent" border="0" />
        </Flex>
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1"
            color="font.primary"
          >
            {storeName}
          </Text>
          <Text
            mt="0.3rem"
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
            noOfLines={1}
          >
            {addr}
          </Text>
          <Text
            mt="0.3rem"
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
          >
            {storePhone}
          </Text>
        </Flex>
      </ListItem>
      {isShow && lat && lng && (
        <Marker
          key={`markerStore-${idx}`}
          id={`markerStore-${idx}`}
          opts={{
            position: [lng, lat],
            icon: {
              url: markerStore,
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
            as={motion.div}
            animation={infoAnimation}
            pos="relative"
            top="-4.5rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="flex-start"
            align="flex-start"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
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
              {storeName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const ListBsDis = ({
  isShow,
  idx,
  _id,
  biDissName,
  bsDisType,
  polygon,
  polygon_type,
  range,
  center,
}: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`bsDisArea-${idx}`);

      if (obj) {
        const pos = getCenterPolygon(obj);

        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  return (
    <Fragment>
      <ListItem
        key={`bsDisList=${idx}`}
        p="1rem 0rem 0.75rem"
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
            viewId: "bsDisInfo",
            props: {
              id: _id,
              name: biDissName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex
          w="20px"
          h="20px"
          flex="none"
          justify="center"
          align="center"
          bgColor={bsDisColor[bsDisType]}
          borderRadius="50%"
        />
        <Flex direction="column">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            color="font.primary"
            noOfLines={1}
          >
            {biDissName}
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            color="font.primary"
          >
            {bsDisType}
          </Text>
        </Flex>
      </ListItem>
      {isShow &&
        (polygon_type === "circle" ? (
          <Circle
            id={`circle-${idx}`}
            key={`circle-${idx}`}
            onMouseOver={(e: any) => onHover(true)}
            onMouseOut={(e: any) => onHover(false)}
            opts={{
              fillColor: "#fadb14",
              center: center,
              radius: Number(range) || 0,
              fillOpacity: 0.3,
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.5,
            }}
          />
        ) : polygon_type === "single" ? (
          <Polygon
            key={`bsDisArea-${idx}`}
            id={`bsDisArea-${idx}`}
            onMouseOver={(e: any) => onHover(true)}
            onMouseOut={(e: any) => onHover(false)}
            opts={{
              paths: polygon,
              fillColor: bsDisColor[bsDisType] || "#FF7A45",
              fillOpacity: 0.35,
              strokeWeight: 2,
              clickable: true,
            }}
          />
        ) : null)}
      {isShow && isHover && cursorPo && (
        <OverlayView
          id={`infoBox`}
          position={new naver.maps.LatLng(cursorPo)}
          pane="floatPane"
          anchorPoint={{ x: 0, y: 10 }}
        >
          <Flex
            as={motion.div}
            animation={infoAnimation}
            pos="relative"
            top="-4.5rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="flex-start"
            align="flex-start"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
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
              {biDissName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

const ListRent = memo(({ rentShow, rentList }: any) => {
  return rentList ? (
    <List display="flex" flexDirection="column">
      {rentList.map(({ _id, rentName, addr, lat, lng }: any, idx: number) => (
        <ListItemRent
          key={`storeList-${idx}`}
          isShow={rentShow}
          idx={idx}
          _id={_id}
          rentName={rentName}
          addr={addr}
          lat={lat}
          lng={lng}
        />
      ))}
    </List>
  ) : null;
});

const ListItemRent = ({ isShow, idx, _id, rentName, addr, lat, lng }: any) => {
  const { state } = useContext(NaverMapContext);
  const setSv = useSetRecoilState(sementicViewState);
  const [isHover, onHover] = useState<boolean>(false);
  const [cursorPo, setCursorPo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isHover && state?.objects && state.objects.size !== 0) {
      let obj: any = state?.objects.get(`markerRent-${idx}`);

      if (obj) {
        const pos = obj.getPosition();
        setCursorPo(pos);
      }
    } else {
      setCursorPo(null);
    }
  }, [isHover]);

  console.log(isShow && lat && lng);
  console.log(lat, lng);

  return (
    <Fragment>
      <ListItem
        key={`rentList-${idx}`}
        p="1rem 0rem 0.75rem"
        display="flex"
        alignItems="center"
        gap="0.75rem"
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
          setSv({
            viewId: "rentInfo",
            props: {
              id: _id,
              name: rentName,
            },
          });
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Flex justify="center" align="center" flex="none">
          <Image src={markerRent} w="auto" bg="transparent" border="0" />
        </Flex>
        <Flex direction="column" gap="0.5rem">
          <Text
            textStyle="base"
            fontSize="md"
            fontWeight="strong"
            lineHeight="1"
            color="font.primary"
          >
            {rentName}
          </Text>
          <Text
            textStyle="base"
            fontSize="xs"
            fontWeight="regular"
            lineHeight="1"
            color="font.primary"
            noOfLines={1}
          >
            {addr}
          </Text>
        </Flex>
      </ListItem>
      {isShow && lat && lng && (
        <Marker
          key={`markerRent-${idx}`}
          id={`markerRent-${idx}`}
          opts={{
            position: [Number(lng), Number(lat)],
            icon: {
              url: markerRent,
            },
            title: rentName,
          }}
          onClick={() => {
            console.log(rentName);
          }}
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
            as={motion.div}
            animation={infoAnimation}
            pos="relative"
            top="-4.5rem"
            left="-50%"
            p="0.25rem 0.75rem"
            w="auto"
            justify="flex-start"
            align="flex-start"
            bgColor="#FFFFFFD9"
            gap="0.5rem"
            border="1px solid"
            borderColor="neutral.gray6"
            borderRadius="base"
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
              {rentName || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default BrandListBox;
