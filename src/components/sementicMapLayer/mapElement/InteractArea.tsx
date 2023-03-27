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
}

const InteractArea = ({ onClick, name, num, path }: InteractAreaProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [areaId] = useState("local" + num);

  const onMouseOverArea = (e: PointerEvent) => {
    //console.log(name);
    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      fillColor: "#13BD68",
      strokeColor: "#E51D1A",
      zIndex: 1,
    });
  };
  const onMouseOutArea = (e: PointerEvent) => {
    // state.objects.get(areaId)?.set("fillColor", "#0305F2");
    const poly = state.objects.get(areaId) as naver.maps.Polygon;
    poly.setOptions({
      fillColor: "#0305F2",
      strokeColor: "#000000",
      zIndex: 0,
    });
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

      <div style={{ fontSize: 40 }}>{name}</div>
    </>
  );
};

export default InteractArea;
