//  Lib
import { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomCurrentMapOption,
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
  const setCurrent = useSetRecoilState(atomCurrentMapOption);

  useEffect(() => {
    if (sido?.slctCode && sido?.slctName && sido?.slctPath) {
      console.log("진입 1");
      state.map?.fitBounds(sido.slctPath);

      let curZoom = state.map?.getZoom();
      let center = state.map?.getCenter();
      console.log(center);
      if (curZoom && center) {
        state.map?.setOptions({
          minZoom: curZoom,
          maxZoom: curZoom,
          scrollWheel: false,
        });

        setCurrent({
          zoom: {
            minZoom: curZoom,
            maxZoom: curZoom,
          },
          center: {
            lat: center.y,
            lng: center.x,
          },
        });
      }
    } else if (sidoLi.length > 0) {
      console.log("진입 2");

      state.map?.setZoom(8, false);
      state.map?.setCenter(new naver.maps.LatLng(35.9223291, 127.9101228));
      state.map?.setOptions({
        minZoom: 8,
        maxZoom: 8,
        scrollWheel: false,
      });
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
                    // state.map?.fitBounds(sido.path);

                    // let curZoom = state.map?.getZoom();

                    // state.map?.setOptions({
                    //   minZoom: curZoom,
                    //   maxZoom: curZoom,
                    // });
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
