import { useState } from "react";
import { Marker, Polygon, Polyline } from "@src/lib/src";
import InteractiveMarker from "./InteractiveMarker";
import CustomControl from "@src/lib/src/components/Control/CustomControl";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";

const MarkerPanel = () => {
  const [num, setNum] = useState(10);
  const initialPositions = Array.from({ length: 10 }, () => ({
    y: 37.55794136784555 + Math.random() / 50,
    x: 126.97319248899569 + Math.random() / 50,
  }));
  const [positions, setPositions] =
    useState<naver.maps.LatLngObjectLiteral[]>(initialPositions);
  return (
    <>
      <ul>
        {Array.from({ length: num }, (value, index) => index).map((num) => (
          <li hidden key={num}>
            <InteractiveMarker
              num={num}
              positions={positions}
              setPositions={setPositions}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

MarkerPanel.displayName = "MarkerPanel";

export default MarkerPanel;
