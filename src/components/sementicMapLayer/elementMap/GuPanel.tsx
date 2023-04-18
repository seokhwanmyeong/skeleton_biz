//  Lib
import { useState, useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { NaverMapContext } from "@src/lib/src";
import { NaverMapAction } from "@src/lib/src/common/types";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//  Component
import InteractiveMarker from "./InteractiveMarker";
import GuMarker from "./GuMarker";
//  State
import { dataCollector } from "@src/states/sementicMap/stateFilter";
//  Sample
import dongData from "@util/data/area/dong.json";

interface GuPanelProps {
  onClickArea: (num: number) => any;
  selectDong: number;
  dongList: any;
  range: any;
}
const GuPanel = ({
  dongList,
  range,
  onClickArea,
  selectDong,
}: GuPanelProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [dongarea, setDongArea] = useState<any>([]);
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);
  const filterData = useRecoilValue(dataCollector);

  const getCenterPath = (path: any) => {
    const length = path.length;
    let xcos = 0;
    let ycos = 0;
    let area = 0;

    for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
      let p1 = path[i];
      let p2 = path[j];

      let f = p1.y * p2.x - p2.y * p1.x;
      xcos += (p1.x + p2.x) * f;
      ycos += (p1.y + p2.y) * f;
      area += f * 3;
    }
    return {
      center: [xcos / area, ycos / area],
    };
  };

  // useEffect(() => {
  //   if (state.map === undefined) return;
  //   const dongs = [];

  //   dongData.forEach((e) => {
  //     if (e.gu == 11110) {
  //       dongs.push({
  //         name: e.name,
  //         center: { lat: e.lat, lng: e.lng },
  //         path: Object.values(JSON.parse(e.polygon)),
  //       });
  //     }
  //   });
  //   setDongArea(dongs);
  // }, []);

  useEffect(() => {
    if (state.map === undefined) return;
    const curCenter = state.map.getCenter();

    let initDirect = {
      left: -1,
      right: -1,
    };

    const putCenter = dongList.map(({ code, name, num, path }: any) => {
      const { center } = getCenterPath(path);

      const mapcent = {
        x: curCenter.x,
        y: curCenter.y,
      };

      if (mapcent?.x > center[0]) {
        initDirect.left++;

        return {
          code,
          name,
          num,
          path,
          data: filterData,
          center: {
            direction: {
              direct: "left",
              idx: initDirect.left,
            },
            x: center[0],
            y: center[1],
          },
        };
      } else {
        initDirect.right++;

        return {
          code,
          name,
          num,
          path,
          data: filterData,
          center: {
            direction: {
              direct: "right",
              idx: initDirect.right,
            },
            x: center[0],
            y: center[1],
          },
        };
      }
    });

    setLeftIdx(initDirect.left);
    setRightIdx(initDirect.right);
    setDongArea(putCenter);
  }, [dongList, state.map, filterData]);

  return (
    <div>
      <ul style={{ position: "absolute" }}>
        {Array.from({ length: dongarea.length }, (value, index) => index).map(
          (num) => {
            return (
              <li hidden key={num}>
                <GuMarker
                  name={dongarea[num].name}
                  num={num}
                  selectDong={selectDong}
                  direction={dongarea[num].center.direction}
                  leftIdx={leftIdx}
                  rightIdx={rightIdx}
                  range={range}
                  data={dongarea[num].data}
                  position={{
                    x: dongarea[num].center.x,
                    y: dongarea[num].center.y,
                  }}
                  onClickArea={onClickArea}
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default GuPanel;