import React, { useContext, useState, useEffect } from "react";
import { NaverMapContext, Polygon, Polyline } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
interface InteractDongProps {
  onClick?: (event: MouseEvent) => any;
  name: string;
  num: number;
  selectDong: (num: number) => any;
  center?:
    | naver.maps.CoordLiteral
    | naver.maps.PointLiteral
    | naver.maps.LatLngLiteral;
  path:
    | naver.maps.ArrayOfCoords[]
    | naver.maps.KVOArrayOfCoords[]
    | naver.maps.ArrayOfCoordsLiteral[];
  style?: any;
  hoverStyle?: any;
}
const InteractDong = ({
  onClick,
  name,
  num,
  selectDong,
  center,
  path,
  style,
  hoverStyle,
}: InteractDongProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [areaId] = useState("dong" + num);

  const onMouseOverArea = () => {
    if (center !== undefined) {
      selectDong(num);
    }

    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      fillColor: "#13BD68",
      strokeColor: "#E51D1A",
      zIndex: 1,
      ...hoverStyle,
    });
  };
  const onMouseOutArea = () => {
    if (center !== undefined) {
      selectDong(-1);
    }

    // state.objects.get(areaId)?.set("fillColor", "#0305F2");
    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      fillColor: "#0305F2",
      strokeColor: "#000000",
      zIndex: 0,
      ...style,
    });
  };
  useEffect(() => {
    //const center = polylabel(path, 1.0);
    // console.log(state.objects);
  }, [num]);

  return (
    <>
      <Polygon
        id={areaId}
        onClick={onClick}
        onMouseOver={onMouseOverArea}
        onMouseOut={onMouseOutArea}
        opts={{
          paths: path,
          fillColor: "#0305F2",
          fillOpacity: 0.3,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          clickable: true,
        }}
      />
    </>
  );
};
export default InteractDong;
