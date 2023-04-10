//  Lib
import { Fragment, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Marker, NaverMapContext } from "@src/lib/src";
//  Component
import InteractArea from "@components/sementicMapLayer/elementMap/InteractArea";
//  State
import {
  atomFilterFlow,
  infoComErpStore,
} from "@states/sementicMap/stateFilter";
//  Api
import { apiErpMap } from "@api/biz/config";

type Props = {};

const MapFlowErp = (props: Props) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const setFlow = useSetRecoilState(atomFilterFlow);
  const { data: storeList } = useRecoilValue(infoComErpStore);
  const [store, setStore] = useState<any[]>([]);
  const { getStoreList, getRentList, getBsDisList } = apiErpMap;
  console.log("test");

  useEffect(() => {
    if (storeList.length > 0) {
      console.log(storeList);
      setStore(storeList);
    }
  }, [storeList]);

  return (
    <Fragment>
      {storeList?.length > 0 &&
        storeList.map((store) => {
          return (
            <Marker
              id={`markerStore-${store._id.$oid}`}
              opts={{
                position: [Number(store.lat), Number(store.lng)],
                // icon: {
                //   path: [
                //     { x: 0, y: 0 },
                //     { x: 0, y: 0 },
                //     { x: 0, y: 150 },
                //     { x: 150, y: 250 },
                //     { x: 0, y: 150 },
                //   ],
                //   anchor: { x: 23, y: 103 },
                //   fillColor: "#ff0000",
                //   fillOpacity: 1,
                //   strokeColor: "#000000",
                //   strokeStyle: "solid",
                //   strokeWeight: 1,
                // },
              }}
              onClick={() => {}}
            />
          );
        })}
    </Fragment>
  );
};

export default MapFlowErp;
