import React, { useState, useContext, useEffect } from "react";
import { NaverMapContext } from "@src/lib/src";
import dongData from "@util/data/area/dong.json";
import InteractiveMarker from "./InteractiveMarker";
import GuMarker from "./GuMarker";
import { NaverMapAction } from "@src/lib/src/common/types";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
interface GuPanelProps {
  onClickArea: (num: number) => any;
  selectDong: number;
}
const GuPanel = ({ onClickArea, selectDong }: GuPanelProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [dongarea, setDongArea] = useState([]);
  useEffect(() => {
    if (state.map === undefined) return;
    const dongs = [];
    dongData.forEach((e) => {
      if (e.gu == 11110) {
        dongs.push({
          name: e.name,
          center: { lat: e.lat, lng: e.lng },
          path: Object.values(JSON.parse(e.polygon)),
        });
      }
    });
    setDongArea(dongs);
  }, []);

  return (
    <div>
      <ul style={{ position: "absolute" }}>
        {Array.from({ length: dongarea.length }, (value, index) => index).map(
          (num) => (
            <li hidden key={num}>
              <GuMarker
                name={dongarea[num].name}
                num={num}
                selectDong={selectDong}
                position={{
                  x: dongarea[num].center.lat,
                  y: dongarea[num].center.lng,
                }}
                onClickArea={onClickArea}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GuPanel;
