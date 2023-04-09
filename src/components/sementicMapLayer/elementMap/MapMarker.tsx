import React from "react";
import { Marker, NaverMapContext } from "@src/lib/src";
interface MapMarkerProps {
  id: string;
  position: naver.maps.LatLngObjectLiteral;
  onClick?: (props?: any) => any;
}

const MapMarker = ({ id, position, onClick }: MapMarkerProps) => {
  return (
    <Marker
      id={`marker-${id}`}
      opts={{
        position: position,
        icon: {
          path: [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 150 },
            { x: 150, y: 250 },
            { x: 0, y: 150 },
          ],
          anchor: { x: 23, y: 103 },
          fillColor: "#ff0000",
          fillOpacity: 1,
          strokeColor: "#000000",
          strokeStyle: "solid",
          strokeWeight: 1,
        },
      }}
      onClick={onClick}
    />
  );
};

MapMarker.displayName = "marker";

export default MapMarker;
