import React, { useContext, useState, useEffect } from "react";
import { NaverMapContext, Polygon, Polyline } from "@src/lib/src";
import polylabel from "polylabel";
interface InteractAreaProps {
  onClick?: (event: MouseEvent) => any;
  name: string;
  num: number;
  path:
    | naver.maps.ArrayOfCoords[]
    | naver.maps.KVOArrayOfCoords[]
    | naver.maps.ArrayOfCoordsLiteral[];
  style?: any;
  hoverStyle?: any;
  onMouse?: any;
  onMouseOut?: any;
  onMouseUp?: any;
  onMouseDown?: any;
  setClickable?: boolean;
}

const InteractArea = ({
  onClick,
  name,
  num,
  path,
  style,
  hoverStyle,
  onMouse,
  onMouseOut,
  onMouseUp,
  onMouseDown,
  setClickable = true,
}: InteractAreaProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [areaId] = useState("area" + num);
  const onMouseOverArea = (e: PointerEvent) => {
    //console.log(name);
    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      clickable: setClickable,
      fillColor: "#0088ff",
      strokeColor: "#007afe",
      zIndex: 1,
      ...hoverStyle,
    });
    onMouse && onMouse(e);
  };
  const onMouseOutArea = (e: PointerEvent) => {
    // state.objects.get(areaId)?.set("fillColor", "#0305F2");
    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      fillColor: "#4446ff",
      strokeColor: "#6badf5",
      zIndex: 0,
      ...style,
    });
    onMouseOut && onMouseOut(e);
  };

  const onMouseUpArea = (e: PointerEvent) => {
    onMouseUp && onMouseUp(e);
  };
  const onMouseDownArea = (e: PointerEvent) => {
    onMouseDown && onMouseDown(e);
  };

  useEffect(() => {
    //const center = polylabel(path, 1.0);
    //console.log();
  }, []);

  return (
    <>
      <Polygon
        id={areaId}
        onClick={onClick}
        onMouseOver={(e: any) => onMouseOverArea(e)}
        onMouseOut={(e: any) => onMouseOutArea(e)}
        onMouseUp={(e: any) => onMouseUpArea(e)}
        onMouseDown={(e: any) => onMouseDownArea(e)}
        opts={{
          paths: path,
          fillColor: "#4446ff",
          fillOpacity: 0.2,
          strokeColor: "#6badf5",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true,
          ...style,
        }}
      />
    </>
  );
};

export default InteractArea;
