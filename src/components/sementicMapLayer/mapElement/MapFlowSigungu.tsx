//  Lib
import { useContext, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Components
import InteractArea from "./InteractArea";
//  Atom
import { atomFilterFlow } from "@states/sementicMap/filterState";
import {
  atomDongLi,
  atomFlowEnterArea,
  atomSlctDong,
} from "@states/sementicMap/mapState";

type Props = {};

const MapFlowSigungu = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { sigungu } = useRecoilValue(atomFlowEnterArea);
  const dongli = useRecoilValue(atomDongLi);
  const setDong = useSetRecoilState(atomSlctDong);

  useEffect(() => {
    if (sigungu?.slctPath) {
      state.map?.setOptions({
        minZoom: 0,
        maxZoom: 16,
      });
      state.map?.fitBounds(sigungu.slctPath);

      // let curZoom = state.map?.getZoom();

      // state.map?.setOptions({
      //   minZoom: curZoom,
      //   maxZoom: curZoom,
      // });
    }
  }, []);

  return (
    <>
      {dongli.length !== 0 &&
        dongli.map((dong: { name: string; code: string; path: never[] }) => {
          console.log(dong);
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
              name={dong.name}
              num={Number(dong.code)}
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
        })}
    </>
  );
};

export default MapFlowSigungu;
