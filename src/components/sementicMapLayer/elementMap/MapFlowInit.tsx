//  Lib
import { useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NaverMapContext } from "@src/lib/src";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
//  State
import { atomFilterFlow } from "@states/sementicMap/stateFilter";
import {
  atomFlowEnterArea,
  atomSidoLi,
  atomSigunguLi,
} from "@states/sementicMap/stateMap";
//  Api
import { apiErpMap } from "@api/biz/config";

type Props = {};

const MapFlowInit = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const sidoLi = useRecoilValue(atomSidoLi);
  const sigunguLi = useRecoilValue(atomSigunguLi);
  const setFlow = useSetRecoilState(atomFilterFlow);

  const { getStoreList, getRentList, getBsDisList } = apiErpMap;

  useEffect(() => {}, []);
  console.log("test");
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

export default MapFlowInit;
