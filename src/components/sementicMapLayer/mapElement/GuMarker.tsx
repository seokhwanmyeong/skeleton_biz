import React, { useState, useEffect, useContext, useRef } from "react";
import { Marker, NaverMapContext, Polyline } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Polygon from "@src/lib/src/components/Overlay/Polygon";

interface GuMarkerProps {
  name: string;
  num: number;
  selectDong: number;
  position:
    | naver.maps.PointLiteral
    | naver.maps.CoordLiteral
    | naver.maps.LatLngLiteral;
  onClickArea: (num: number) => any;
}
const GuMarker = ({
  name,
  num,
  selectDong,
  position,
  onClickArea,
}: GuMarkerProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [cont, setCont] = useState(0);
  const boxRef = useRef(null);
  const [mapCenter, SetMapCenter] = useState<
    naver.maps.Coord | naver.maps.PointLiteral
  >();
  const [onleft, SetOnLeft] = useState(false);
  const [onsetMap, setOnsetMap] = useState(false);
  useEffect(() => {
    if (state.map === undefined) return;
    const mapcent = {
      x: 126.99188199999999,
      y: 37.5991103,
    };
    SetMapCenter(mapcent);
    if (mapcent?.x > position.x) {
      SetOnLeft(true);
    } else {
      SetOnLeft(false);
    }
    setOnsetMap(true);
    //console.log(state.objects);
  }, [state.map]);
  useEffect(() => {
    let setnum = 0.0101 * num;
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
  const OnOver = () => {
    const poly = state.objects.get("dong" + num) as naver.maps.Polygon;
    if (poly === null) return;
    poly.setOptions({
      fillColor: "#13BD68",
      strokeColor: "#E51D1A",
      zIndex: 6,
    });

    const polyline = state.objects.get(
      "polyline_" + num
    ) as naver.maps.Polyline;
    polyline.setOptions({
      clickable: true,
      strokeColor: "#FF00DA",
      strokeStyle: "solid",
      strokeOpacity: 0,
      strokeWeight: 3,
    });
    polyline.setOptions({
      clickable: true,
      strokeColor: "#FF00DA",
      strokeStyle: "solid",
      strokeOpacity: 1,
      strokeWeight: 5,
    });

    boxRef.current.style.backgroundColor = "salmon";
  };
  const OnOut = () => {
    const poly = state.objects.get("dong" + num) as naver.maps.Polygon;
    if (poly === null) return;
    poly?.setOptions({
      fillColor: "#0305F2",
      strokeColor: "#000000",
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
    boxRef.current.style.backgroundColor = "#56CE92";
  };
  const OnClcikArea = () => {
    onClickArea(num);
  };
  return (
    <>
      {onsetMap ? (
        <div>
          {/* <Marker
            id={`markers-center`}
            opts={{ position: { x: mapCenter?.x, y: mapCenter?.y }, zIndex: 1 }}
          /> */}
          <Polyline
            id={"polyline_" + num}
            opts={{
              path: onleft
                ? [
                    {
                      lat: Number(position.y),
                      lng: Number(position.x),
                    },
                    {
                      y: mapCenter?.y + cont - 0.034,
                      x: mapCenter?.x - 0.05,
                    },
                    {
                      y: mapCenter?.y + cont - 0.034,
                      x: mapCenter?.x - 0.08,
                    },
                  ]
                : [
                    {
                      lat: Number(position.y),
                      lng: Number(position.x),
                    },
                    {
                      y: mapCenter?.y + cont - 0.12,
                      x: mapCenter?.x + 0.04,
                    },
                    {
                      y: mapCenter?.y + cont - 0.12,
                      x: mapCenter?.x + 0.05,
                    },
                  ],
              strokeColor: "#194D33",
              strokeStyle: "solid",
              strokeOpacity: 0.3,
              strokeWeight: 1,
              zIndex: 2,
            }}
          />
          <OverlayView
            id={`box${num}`}
            position={
              onleft
                ? {
                    y: mapCenter?.y + cont - 0.034,
                    x: mapCenter?.x - 0.08,
                  }
                : {
                    y: mapCenter?.y + cont - 0.12,
                    x: mapCenter?.x + 0.05,
                  }
            }
            onClick={OnClcikArea}
            onMouseOver={OnOver}
            onMouseOut={OnOut}
          >
            <div
              ref={boxRef}
              className="box"
              style={{
                position: "absolute",
                left: 0,
                top: -15,
                width: "124px",
                height: "60px",
                backgroundColor: "#56CE92",
                textAlign: "center",
                border: "2px solid #6C483B",
                zIndex: 5,
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {name.replace("서울특별시 종로구 ", "")}{" "}
              </span>
            </div>
          </OverlayView>
          <OverlayView id={`marker${num}`} position={position}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              style={{
                position: "absolute",
                //left: "50%",
                //top: "50%",
                transform: "translate(-50%, -50%)",
                //zIndex: 80
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#444"
                d="M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
              />
              <path
                fill="#444"
                d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
              />
            </svg>
            {/* <div
                  style={{
                    position: "relative",
                    //top: "4px",
                    color: "blue",
                    fontWeight: "bold",
                  }}>
                  {num}
                </div> */}
          </OverlayView>
        </div>
      ) : null}
    </>
  );
};

export default GuMarker;
