import cubejsApi from "@src/api/cubeApi/config";
import { atomArea } from "@src/states/searchState/stateSearch";
import React, { createContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type Props = {};

export const BaseAreaContext = createContext<{
  active: boolean;
  sido: { name: string; code: string };
  sigungu: { name: string; code: string };
  sidoList: any[];
  sigunguList: any[];
  dongList: any[];
  activeHandler: any;
  sidoHandler: any;
  sigunguHandler: any;
  addrHandler: any;
}>({
  active: true,
  sido: {
    name: "",
    code: "",
  },
  sigungu: {
    name: "",
    code: "",
  },
  sidoList: [],
  sigunguList: [],
  dongList: [],
  activeHandler: () => {},
  sidoHandler: () => {},
  sigunguHandler: () => {},
  addrHandler: () => {},
});

const BaseAreaProvider = ({ children }: any) => {
  const slctArea = useRecoilValue(atomArea);
  const [active, setActive] = useState<boolean>(true);
  const [sido, setSido] = useState<{ name: string; code: string }>({
    name: "",
    code: "",
  });
  const [sigungu, setSigungu] = useState({
    name: "",
    code: "",
  });
  const [addr, setAddr] = useState<{
    sido: { name: string; code: string };
    sigungu: { name: string; code: string };
  }>({
    sido: {
      name: "",
      code: "",
    },
    sigungu: {
      name: "",
      code: "",
    },
  });
  const [sidoList, setSidoList] = useState<any[]>([]);
  const [sigunguList, setSigunguList] = useState<any[]>([]);
  const [dongList, setDongList] = useState<any[]>([]);
  console.log(slctArea);
  const sidoHandler = (val: { name: string; code: string }) => {
    setSido(val);
  };

  const sigunguHandler = (val: { name: string; code: string }) => {
    setSigungu(val);
  };

  const addrHandler = (val: any) => {
    setAddr({ ...addr, ...val });
  };

  const activeHandler = (bool: boolean) => {
    setActive(bool);
  };

  useEffect(() => {
    if (!slctArea.slctAreaName && !slctArea.slctAreaCode) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (sidoList.length === 0) {
      cubejsApi
        .load({
          dimensions: ["AreaSido.code", "AreaSido.name", "AreaSido.polygon"],
        })
        .then((res) => {
          const data = res.rawData().map((si: any) => ({
            code: si["AreaSido.code"],
            name: si["AreaSido.name"],
            polygon: si["AreaSido.polygon"],
          }));
          if (data) {
            setSidoList(data);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (slctArea.slctAreaName && slctArea.slctAreaCode) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [slctArea]);

  useEffect(() => {
    if (sidoList.length === 0) {
      cubejsApi
        .load({
          dimensions: ["AreaSido.code", "AreaSido.name", "AreaSido.polygon"],
        })
        .then((res) => {
          const data = res.rawData().map((si: any) => ({
            code: si["AreaSido.code"],
            name: si["AreaSido.name"],
            polygon: si["AreaSido.polygon"],
          }));

          if (data) {
            setSidoList(data);
          }
        });
    } else if (sido.code && !sigungu.code) {
      cubejsApi
        .load({
          dimensions: ["AreaGungu.code", "AreaGungu.name", "AreaGungu.polygon"],
          filters: [
            {
              member: "AreaGungu.parent",
              operator: "equals",
              values: [sido.code],
            },
          ],
        })
        .then((res) => {
          const data = res.rawData().map((sigungu: any) => ({
            code: sigungu["AreaGungu.code"],
            name: sigungu["AreaGungu.name"],
            polygon: sigungu["AreaGungu.polygon"],
          }));

          if (data) {
            setSigunguList(data);
          }
        });

      if (dongList.length !== 0) setDongList([]);
    } else if (sido.code && sigungu.code) {
      cubejsApi
        .load({
          dimensions: [
            "AreaDong.code",
            "AreaDong.name",
            "AreaDong.polygon",
            "AreaDong.lat",
            "AreaDong.lng",
          ],
          filters: [
            {
              member: "AreaDong.name",
              operator: "contains",
              values: [sigungu.name],
            },
          ],
        })
        .then((res) => {
          const data = res.rawData().map((dong: any) => ({
            code: dong["AreaDong.code"],
            name: dong["AreaDong.name"],
            polygon: dong["AreaDong.polygon"],
            center: [
              Number(dong["AreaDong.lng"]),
              Number(dong["AreaDong.lat"]),
            ],
          }));

          if (data) {
            setDongList(data);
          }
        });
    }
  }, [sido, sigungu]);

  return (
    <BaseAreaContext.Provider
      value={{
        active: active,
        sido: sido,
        sigungu: sigungu,
        sidoList: sidoList,
        sigunguList: sigunguList,
        dongList: dongList,
        activeHandler: activeHandler,
        sidoHandler: sidoHandler,
        sigunguHandler: sigunguHandler,
        addrHandler: addrHandler,
      }}
    >
      {children}
    </BaseAreaContext.Provider>
  );
};

export default BaseAreaProvider;
