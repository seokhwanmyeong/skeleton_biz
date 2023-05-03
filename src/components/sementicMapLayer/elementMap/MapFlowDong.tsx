//  Lib
import { useContext, useEffect, useState, useMemo, Fragment } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Marker, NaverMapContext, Polyline } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import {
  atomFilterFlow,
  infoComBrand,
  infoComFlowDepth,
} from "@states/sementicMap/stateFilter";
import { atomSlctDong, atomSlctNice } from "@states/sementicMap/stateMap";
import sample from "@src/util/data/sampleBuilding";
//  Icon
import makerBrandL from "@assets/icons/marker_brand_large.png";
import makerBrandS from "@assets/icons/marker_brand_small.png";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Type
import type { TypeNiceFlowData } from "@api/bizSub/type";

const MapFlowDong = () => {
  const { state } = useContext(NaverMapContext);
  const dong = useRecoilValue(atomSlctDong);
  const {
    show: brandShow,
    active: brandActive,
    data: brandList,
  } = useRecoilValue(infoComBrand);
  const {
    show: flowShow,
    active: flowActive,
    data: flowList,
  } = useRecoilValue(infoComFlowDepth);
  const [slctNice, setSlctNice] = useRecoilState(atomSlctNice);
  const [cursorPo, setCursorPo] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (dong.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 22,
        scrollWheel: true,
        draggable: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        disableTwoFingerTapZoom: true,
      });
      state.map?.fitBounds(dong.slctPath[0]);

      let curZoom = state.map?.getZoom();

      if (curZoom) {
        state.map?.setZoom(curZoom);
        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: 22,
        });
      }
    }
  }, [state.map]);
  const dongTopData = useMemo(() => {
    return dong.slctData || [];
  }, [dong]);

  const [sampleData, setSampleData] = useState<any>([]);

  const createPolyHandler = (coordinates: any) => {
    return coordinates[0].map((coordinate: any) => {
      return coordinate.map((arr: any) => {
        return new naver.maps.LatLng(arr[1], arr[0]);
      });
    });
  };

  useEffect(() => {
    // console.log(sampleData.length);
    let bCnt = 0;
    let polyList: any[] = [];

    sampleData.map((data: any, idx: number) => {
      if (!data?.buildings || data?.buildings?.length === 0) return;
      const buildings = data?.buildings;
      bCnt += buildings.length;

      if (buildings.length > 1) {
        const test = buildings.map((b: any) => {
          if (b.geometry) {
            const coordinates = b.geometry.coordinates;
            const path = createPolyHandler(coordinates);
            const poly = new naver.maps.Polygon({
              map: state.map,
              paths: path,
              fillColor: "#36CFC9",
              fillOpacity: 0.75,
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.6,
              strokeWeight: 1,
            });
            polyList.push(poly);
          }
        });
      } else {
        if (buildings[0].geometry) {
          const coordinates = buildings[0].geometry.coordinates;
          const path = createPolyHandler(coordinates);
          const poly = new naver.maps.Polygon({
            map: state.map,
            paths: path,
            fillColor: "#36CFC9",
            fillOpacity: 0.75,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.6,
            strokeWeight: 1,
          });
          polyList.push(poly);
        }
      }
    });

    // console.log(bCnt);
    // console.log(polyList);
  }, [sampleData]);

  useEffect(() => {
    if (!state?.objects && !slctNice?.hoverId && state.objects.size === 0) {
      return;
    } else if (slctNice?.hoverId) {
      let marker: any;
      marker = state?.objects.get(slctNice?.hoverId);

      if (marker) {
        const pos = marker.getPosition();
        setCursorPo([pos.x, pos.y]);
        onOpen();
      }
    } else {
      cursorPo && setCursorPo(null);
      onClose();
    }
  }, [slctNice.hoverId]);

  useEffect(() => {
    setSampleData(sample);
    return () => {
      setSampleData([]);
    };
  }, []);

  return (
    <Fragment>
      <InteractArea
        key={dong.name}
        setClickable={false}
        name={dong.slctName}
        num={dong.slctCode}
        path={dong.slctPath}
        style={{
          fillColor: "#36CFC9",
          fillOpacity: 0.2,
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.5,
        }}
        hoverStyle={{
          fillColor: "#36CFC9",
          fillOpacity: 0.2,
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.5,
        }}
      />
      {flowActive &&
        flowShow &&
        flowList?.length > 0 &&
        flowList.map((list: any, idx: number) => {
          // const { storeNm, xAxis, yAxis } = brand;
          const path = list.map((li: TypeNiceFlowData, depthIdx: number) => {
            const { xAxis, yAxis } = li;

            return { lat: yAxis, lng: xAxis };
          });
          console.log(path);
          return (
            <Polyline
              key={`flow-${idx}`}
              id={`flow-${idx}`}
              opts={{
                path: path,
                strokeColor: "#FF00DA",
                strokeStyle: "solid",
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
            />
          );
        })}
      {brandActive &&
        brandShow &&
        brandList?.length > 0 &&
        brandList.map(
          (
            brand: {
              storeNm: string;
              xAxis: number;
              yAxis: number;
            },
            idx: number
          ) => {
            const { storeNm, xAxis, yAxis } = brand;
            return (
              <>
                <Marker
                  key={`markerBrand-${idx}`}
                  id={`markerBrand-${idx}`}
                  opts={{
                    position: [xAxis, yAxis],
                    icon: {
                      url: makerBrandS,
                      size: new naver.maps.Size(50, 50),
                      anchor: new naver.maps.Point(24, 42),
                    },
                  }}
                  onClick={() => {}}
                  onMouseOver={() => {
                    setCursorPo([xAxis, yAxis]);
                    setSlctNice({
                      ...slctNice,
                      name: storeNm,
                      hoverId: `markerBrand-${idx}`,
                    });
                    onOpen();
                  }}
                  onMouseOut={() => {
                    onClose();
                    setCursorPo(null);
                    setSlctNice({ ...slctNice, name: "", hoverId: "" });
                  }}
                />
              </>
            );
          }
        )}
      {isOpen && cursorPo && (
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
              {slctNice?.name || ""}
            </Text>
          </Flex>
        </OverlayView>
      )}
    </Fragment>
  );
};

export default MapFlowDong;
