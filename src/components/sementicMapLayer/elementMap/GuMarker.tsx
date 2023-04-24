import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { Marker, NaverMapContext, Polyline } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Polygon from "@src/lib/src/components/Overlay/Polygon";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import {
  IcoFood,
  IcoHousehold,
  IcoHuman,
  IcoMoney,
  IcoPeople,
  IcoResi,
} from "@src/assets/icons/icon";

interface GuMarkerProps {
  name: string;
  num: number;
  selectDong: number;
  range: any;
  direction: {
    direct: "left" | "right";
    idx: number;
  };
  position:
    | naver.maps.PointLiteral
    | naver.maps.CoordLiteral
    | naver.maps.LatLngLiteral
    | any;
  onClickArea: (num: number) => any;
  rightIdx: number;
  leftIdx: number;
  data?: any;
}

const GuMarker = ({
  name,
  num,
  direction,
  range,
  selectDong,
  position,
  onClickArea,
  rightIdx,
  leftIdx,
  data,
}: GuMarkerProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [cont, setCont] = useState(0);
  const [contY, setConstY] = useState(0);
  const boxRef = useRef<any>(null);
  const [mapCenter, setMapCenter] = useState<any>();
  const [onleft, setOnLeft] = useState(false);
  const [onsetMap, setOnsetMap] = useState(false);
  const [active, setActive] = useState(false);
  const [over, setOver] = useState(-1);

  useEffect(() => {
    if (state.map === undefined) return;
    const curCenter = state.map.getCenter();

    const mapcent = {
      x: curCenter.x,
      y: curCenter.y,
    };
    setMapCenter(mapcent);
    if (mapcent?.x > position.x) {
      setOnLeft(true);
    } else {
      setOnLeft(false);
    }
    setOnsetMap(true);
  }, [state.map]);

  useEffect(() => {
    // console.log(direction.idx);
    let setnum = 0.014 * direction.idx;
    setCont(parseFloat(setnum.toString()));
  }, [num]);

  useEffect(() => {
    if (selectDong === -1) {
      OnOut();
      return;
    }

    if (num === selectDong) {
      OnOver();
    } else {
      OnOut();
    }
  }, [selectDong]);

  const OnOver = useCallback(() => {
    const poly = state.objects?.get("area" + num) as naver.maps.Polygon;

    if (poly === null) return;

    poly.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.5,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 6,
    });

    const polyline = state.objects?.get(
      "polyline_" + num
    ) as naver.maps.Polyline;

    if (polyline === undefined) return;

    polyline?.setOptions({
      clickable: true,
      strokeColor: "#BFBFBF",
      strokeStyle: "solid",
      strokeOpacity: 1,
      strokeWeight: 2,
      zIndex: 7,
    });

    // if (boxRef?.current?.style) {
    //   boxRef.current.style.backgroundColor = "salmon";
    // }

    setOver(num);
  }, [state.objects]);

  const OnOut = useCallback(() => {
    const poly = state.objects.get("area" + num) as naver.maps.Polygon;

    if (poly === null) return;

    poly?.setOptions({
      fillColor: "#FF7A45",
      fillOpacity: 0.35,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      zIndex: 0,
    });

    const polyline = state.objects.get(
      "polyline_" + num
    ) as naver.maps.Polyline;

    if (polyline === undefined) return;

    polyline.setOptions({
      strokeColor: "#194D33",
      strokeStyle: "solid",
      strokeOpacity: 0.3,
      strokeWeight: 1,
    });

    // if (boxRef?.current?.style) {
    //   boxRef.current.style.backgroundColor = "#56CE92";
    // }

    setOver(-1);
  }, [state.objects]);

  useEffect(() => {
    if (data) {
      const { flow, resi, job, house, sale, upjong } = data;
      if (
        flow.active ||
        resi.active ||
        job.active ||
        house.active ||
        sale.active ||
        upjong.active
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [data]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // handleResize 함수를 debounce로 감싸고, 시간을 설정한다
  // 1000ms = 1sec
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(windowSize);
    const test = state.objects.get("polyline_" + num) as naver.maps.Polyline;

    if (!test) return;

    if (onleft) {
      test?.setPath([
        {
          lat: Number(position.y) - 0.0012,
          lng: Number(position.x) + 0.0013,
        },
        {
          y: range.latMin + ((range.latMax - range.latMin) / 5) * direction.idx,
          x: range.lngMax - 1280 / windowSize.width / 60,
        },
      ]);
    } else {
      test?.setPath([
        {
          lat: Number(position.y) - 0.0012,
          lng: Number(position.x) + 0.0013,
        },
        {
          y: range.latMin + ((range.latMax - range.latMin) / 5) * direction.idx,
          x: range.lngMax + 1280 / windowSize.width / 60,
        },
      ]);
    }
  }, [windowSize]);
  return (
    <>
      {onsetMap && active ? (
        <div>
          <Polyline
            id={"polyline_" + num}
            opts={{
              path: onleft
                ? [
                    {
                      lat: Number(position.y) - 0.0012,
                      lng: Number(position.x) + 0.0013,
                    },
                    {
                      y:
                        range.latMin +
                        ((range.latMax - range.latMin) / 5) * direction.idx,
                      x: range.lngMin - windowSize.width / 1280 / 100,
                    },
                  ]
                : [
                    {
                      lat: Number(position.y) - 0.0012,
                      lng: Number(position.x) + 0.0013,
                    },
                    {
                      y:
                        range.latMin +
                        ((range.latMax - range.latMin) / 5) * direction.idx,
                      x: range.lngMax,
                    },
                  ],
              strokeColor: "#BFBFBF",
              strokeStyle: "solid",
              strokeOpacity: 1,
              strokeWeight: 1,
              zIndex: 2,
            }}
          />
          <OverlayView id={`marker01_${num}`} position={position}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8.48523"
                y="16.2636"
                width="11"
                height="11"
                transform="rotate(-135 8.48523 16.2636)"
                fill="white"
                fillOpacity="0.5"
                stroke="#BFBFBF"
              />
              <rect
                x="8.48523"
                y="13.435"
                width="7"
                height="7"
                transform="rotate(-135 8.48523 13.435)"
                fill={over === num ? "#FADB14" : "transparent"}
                stroke="#8C8C8C"
              />
            </svg>
          </OverlayView>
          <OverlayView
            id={`marker02_${num}`}
            position={
              onleft
                ? {
                    y:
                      range.latMin +
                      ((range.latMax - range.latMin) / 5) * direction.idx,
                    x: range.lngMin,
                  }
                : {
                    y:
                      range.latMin +
                      ((range.latMax - range.latMin) / 5) * direction.idx,
                    x: range.lngMax,
                  }
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.707107"
                y="5.65674"
                width="7"
                height="7"
                transform="rotate(-45 0.707107 5.65674)"
                fill="white"
                fillOpacity="0.5"
                stroke="#595959"
              />
            </svg>
          </OverlayView>
        </div>
      ) : null}
    </>
  );
};

export default GuMarker;
