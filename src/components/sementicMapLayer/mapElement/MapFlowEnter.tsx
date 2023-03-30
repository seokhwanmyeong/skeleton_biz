//  Lib
import { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/mapState";

type Props = {};

const MapFlowEnter = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const sidoLi = useRecoilValue(atomSidoLi);
  const sigunguLi = useRecoilValue(atomSigunguLi);
  const setFlow = useSetRecoilState(atomFilterFlow);

  const getCenterPolygon = (polygons: any[]) => {
    const centers = polygons.map((polygon, idx: number) => {
      const bounds = polygon.getPath();
      const arr = bounds._array;
      const length = arr.length;
      let xcos = 0;
      let ycos = 0;
      let area = 0;

      for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
        let p1 = arr[i];
        let p2 = arr[j];

        let f = p1.y * p2.x - p2.y * p1.x;
        xcos += (p1.x + p2.x) * f;
        ycos += (p1.y + p2.y) * f;
        area += f * 3;
      }

      return [xcos / area, ycos / area];
    });

    return centers;
  };

  useEffect(() => {
    if (sido?.slctCode && sido?.slctName && sido?.slctPath) {
      console.log("진입 1");
      state.map?.fitBounds(sido.slctPath);
    } else if (sidoLi.length > 0) {
      console.log("진입 2");
      state.map?.setOptions({
        minZoom: 8,
        maxZoom: 8,
        center: [35.9223291, 127.9101228],
        //zoom : false,
      });
      state.map?.setZoom(8, false);
      state.map?.setCenter(new naver.maps.LatLng(35.9223291, 127.9101228));
      let curZoom = state.map?.getZoom();
      console.log(curZoom);
    }
  }, [sido, sigungu]);

  return (
    <>
      {!sido?.slctCode
        ? sidoLi.map(
            (sido: { name: string; code: string; path: never[] | any[] }) => {
              return (
                <InteractArea
                  key={sido.code}
                  onClick={() => {
                    console.log("click");
                    setSlctArea({
                      sido: {
                        slctName: sido.name,
                        slctCode: sido.code,
                        slctIdx: `area${sido.code}`,
                        slctPath: sido.path,
                      },
                      sigungu,
                    });
                    state.map?.setOptions({
                      minZoom: 0,
                      maxZoom: 16,
                    });
                    state.map?.fitBounds(sido.path);

                    let curZoom = state.map?.getZoom();

                    state.map?.setOptions({
                      minZoom: curZoom,
                      maxZoom: curZoom,
                    });
                  }}
                  name={sido.name}
                  num={Number(sido.code)}
                  path={sido.path}
                  style={{
                    fillColor: "#78d6b0",
                    fillOpacity: 0.4,
                    strokeWeight: 1,
                    strokeColor: "#41be72",
                  }}
                  hoverStyle={{
                    fillColor: "#78d6b0",
                    fillOpacity: 0.65,
                    strokeWeight: 1,
                    strokeColor: "#41be72",
                  }}
                />
              );
            }
          )
        : !sigungu?.slctCode
        ? sigunguLi.map((sigungu: any) => {
            return (
              <InteractArea
                key={sigungu.code}
                onClick={() => {
                  console.log("click");
                  setSlctArea({
                    sido,
                    sigungu: {
                      slctName: sigungu.name,
                      slctCode: sigungu.code,
                      slctIdx: `area${sigungu.code}`,
                      slctPath: sigungu.path,
                    },
                  });
                  setFlow(1);
                }}
                name={sigungu.name}
                num={Number(sigungu.code)}
                path={sigungu.path}
                style={{
                  fillColor: "#36CFC9",
                  fillOpacity: 0.5,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
                hoverStyle={{
                  fillColor: "#36CFC9",
                  fillOpacity: 0.75,
                  strokeWeight: 1,
                  strokeColor: "#FFFFFF",
                }}
              />
            );
          })
        : null}
    </>
  );
};

export default MapFlowEnter;
