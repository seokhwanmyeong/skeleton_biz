//  Lib
import { useContext, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import GuPanel from "./GuPanel";
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomDongLi,
  atomFlowEnterArea,
  atomSlctDong,
} from "@states/sementicMap/mapState";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
import Rounding from "@assets/rounding.svg";
import { Image } from "@chakra-ui/react";

type Props = {};

const MapFlowSigungu = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dongli = useRecoilValue(atomDongLi);
  const setDong = useSetRecoilState(atomSlctDong);
  const [slctDong, setSlctDong] = useState(-1);
  const [center, setCenter] = useState<any>(null);
  const [range, setRange] = useState({
    xMax: 0,
    xMin: 0,
    yMax: 0,
    yMin: 0,
  });

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

  useEffect(() => {
    if (sigungu?.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 16,
      });
      state.map?.fitBounds(sigungu.slctPath);
      let curZoom = state.map?.getZoom();
      if (curZoom) {
        state.map?.setZoom(curZoom);

        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: curZoom,
        });
      }

      let xyRange = {
        xMax: 0,
        xMin: 0,
        yMax: 0,
        yMin: 0,
      };

      sigungu.slctPath.map((xy: any) => {
        if (xy.x > xyRange.xMax || xyRange.xMax === 0) {
          xyRange.xMax = xy.x;
        } else if (xy.x < xyRange.xMin || xyRange.xMin === 0) {
          xyRange.xMin = xy.x;
        }

        if (xy.y > xyRange.yMax || xyRange.yMax === 0) {
          xyRange.yMax = xy.y;
        } else if (xy.y < xyRange.yMin || xyRange.yMin === 0) {
          xyRange.yMin = xy.y;
        }
      });
      setRange(xyRange);

      const { center } = getCenterPath(sigungu.slctPath);
      const curCenter = state.map?.getCenter();

      if (curCenter) {
        setCenter([curCenter.x, curCenter.y]);
      }
    }
  }, [sigungu]);

  const test = () => {};

  return (
    <>
      {dongli.length !== 0 &&
        dongli.map(
          (dong: {
            name: string;
            code: string;
            num: number;
            path: never[];
          }) => {
            return (
              <InteractArea
                key={dong.name}
                onClick={(val) => {
                  console.log("click");
                  setDong({
                    slctName: dong.name,
                    slctCode: dong.code,
                    slctIdx: `area${dong.code}`,
                    slctPath: dong.path,
                  });
                  setFlow(2);
                }}
                onMouse={() => {
                  setSlctDong(dong.num);
                }}
                onMouseOut={() => {
                  setSlctDong(-1);
                }}
                name={dong.name}
                num={dong.num}
                path={dong.path}
                style={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.35,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#FF7A45",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          }
        )}
      {sigungu && dongli.length !== 0 ? (
        <GuPanel
          range={range}
          dongList={dongli}
          onClickArea={test}
          selectDong={slctDong}
        />
      ) : null}
      {center && (
        <OverlayView
          id={"Over1"}
          // position={{
          //   y: 37.6460103,
          //   x: 126.927882,
          // }}
          position={{
            y: center[1] + 0.055,
            x: center[0] - 0.07,
          }}
          pointerevent={false}
        >
          <Image
            src={Rounding}
            transform={"translateXY(-50%, -50%)"}
            width={"800px"}
            height={"800px"}
            alt="testB"
          />
        </OverlayView>
      )}
    </>
  );
};

export default MapFlowSigungu;
