//  Lib
import { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
//  Api
import cubejsApi from "@api/cubeApi/config";
//  State
import { atomFilterFlow } from "@states/sementicMap/filterState";
import { atomFlowEnterArea, atomDongLi } from "@states/sementicMap/mapState";
//  Component
import BtnReset from "@components/sementicMapLayer/mapElement/BtnReset";
import BtnFlowCustom from "@components/sementicMapLayer/mapElement/BtnFlowCustom";
import BtnBack from "@components/sementicMapLayer/mapElement/BtnBack";

type Props = {};

const FlowSigungu = (props: Props) => {
  const setFlow = useSetRecoilState(atomFilterFlow);
  const [{ sido, sigungu }, setSlctArea] = useRecoilState(atomFlowEnterArea);
  const [dongLi, setDongLi] = useRecoilState(atomDongLi);

  const pathTransHandler = (
    areaList: { code: string; name: string; path: string }[]
  ) => {
    return areaList.map((area) => {
      const paths = Object.values(JSON.parse(area.path)).map((latLng: any) => {
        if (area.code === "28" || area.code === "46") {
          return latLng.map(
            (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
          );
        } else {
          return new naver.maps.LatLng(latLng[1], latLng[0]);
        }
      });

      return { code: area.code, name: area.name, path: paths };
    });
  };

  const getDongList = () => {
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
            values: [sigungu.slctName],
          },
        ],
      })
      .then((res) => {
        const data = res.rawData().map((si: any) => {
          return {
            code: si["AreaDong.code"],
            name: si["AreaDong.name"],
            path: si["AreaDong.polygon"],
          };
        });
        if (data) {
          const transData = pathTransHandler(data);

          setDongLi(transData);
        }
      });
  };

  useEffect(() => {
    if (dongLi.length === 0) {
      getDongList();
    }
  }, []);

  return (
    <>
      {/* ------------------------------ 상단 ------------------------------*/}
      <Flex
        pos="absolute"
        top="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button color="#000000">업종</Button>
        <BtnBack
          onClick={() => {
            setSlctArea({
              sido,
              sigungu: {
                slctName: "",
                slctCode: "",
                slctIdx: "",
                slctPath: [],
              },
            });
            setFlow(0);
          }}
        />
        <Flex color="#000000">{sigungu.slctName}</Flex>
        <BtnFlowCustom />
      </Flex>
      {/* ------------------------------ 하단 ------------------------------*/}
      <Flex
        pos="absolute"
        bottom="1%"
        left="50%"
        zIndex={999}
        transform="translateX(-50%)"
      >
        <Button onClick={() => {}} color="#000000">
          분석필터
        </Button>
        <Button onClick={() => {}} color="#000000">
          ERP 필터
        </Button>
        <BtnReset />
        <Button onClick={() => {}} color="#000000">
          리포트
        </Button>
      </Flex>
    </>
  );
};

export default FlowSigungu;
