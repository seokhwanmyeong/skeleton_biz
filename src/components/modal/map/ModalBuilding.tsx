//  LIB
import { Fragment, useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Divider,
  Text,
  IconButton,
  Grid,
} from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
//  Type
import { IcoLeft } from "@assets/icons/icon";
import { apiMapBuilding } from "@src/api/bizSub/config";
import { BaseSpinner } from "@src/components/common/Spinner";

type Props = {
  id: string;
  name: string;
  mgmBldrgstPk: string;
  isOpen: boolean;
  onClose: (props?: any) => any;
};

const ModalBuilding = ({ id, name, isOpen, mgmBldrgstPk, onClose }: Props) => {
  const { getBuildingDetail } = apiMapBuilding;
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getBuildingDetail({ mgmBldrgstPk: mgmBldrgstPk })
      .then((res: any) => {
        console.log(res);

        if (res.data) {
          setInfo(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <BaseSpinner zIndex={1000} />
      ) : (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerContent p="1rem 0" maxW="fit-content" minW="47.5rem">
            <DrawerBody pos="relative" p="0" width="fit-content">
              <Flex
                direction="column"
                justify="center"
                align="center"
                gap="1rem"
              >
                <IconButton
                  aria-label="리스트로 돌아가기"
                  onClick={onClose}
                  icon={
                    <IcoLeft
                      width="1.25rem"
                      height="1.25rem"
                      color="font.primary"
                    />
                  }
                  position="absolute"
                  top="0.125rem"
                  left="1.5rem"
                  bg="transparent"
                  color="font.primary"
                  _hover={{
                    bg: "transparent",
                  }}
                />
                <Heading
                  as={"h5"}
                  fontSize="md"
                  lineHeight="normal"
                  color="font.primary"
                  bg="none"
                >
                  {name || "건물명이 없습니다"}
                </Heading>
                <Deco01 p="0 1.5rem" w="100%" h="auto" />
              </Flex>
              {info ? (
                <Flex
                  p="2.625rem 2rem 1rem"
                  w="100%"
                  direction="column"
                  gap="2.75rem"
                >
                  <Grid
                    w="100%"
                    templateColumns="6rem 1fr 6rem 1fr"
                    gridColumnGap="2rem"
                    gridRowGap="0.25rem"
                  >
                    <BuildingItem
                      title="대장종류"
                      content={info?.regstrGbCdNm || ""}
                    />
                    <BuildingItem title="" content="" />
                    <TextDivider />
                    <BuildingItem
                      title="대지위치 (지번)"
                      content={info?.platPlc || ""}
                      maxWidth="14rem"
                    />
                    <BuildingItem
                      title="대지위치 (도로명)"
                      content={info?.newPlatPlc || ""}
                      maxWidth="14rem"
                    />
                    <TextDivider />
                    <BuildingItem title="건물명" content={info?.bldNm || ""} />
                    <BuildingItem title="동명" content={info?.dongNm || ""} />
                  </Grid>
                  <Grid
                    w="100%"
                    templateColumns="7.75rem 1fr 6rem 1fr 4.125rem 1fr"
                    gridColumnGap="1rem"
                    gridRowGap="0.25rem"
                  >
                    <BuildingItem
                      title="대지면적"
                      content={info?.platArea || ""}
                    />
                    <BuildingItem
                      title="건축면적"
                      content={info?.archArea || ""}
                    />
                    <BuildingItem
                      title="연면적"
                      content={info?.totArea || ""}
                    />
                    <TextDivider gridColumn="1 / 7" />
                    <BuildingItem
                      title="용적률 산정용 연면적"
                      content={info?.vlRatEstmTotArea || ""}
                    />
                    <BuildingItem
                      title="부속건축물 면적"
                      content={info?.atchBldCnt || ""}
                    />
                    <BuildingItem
                      title="부속건축물"
                      content={info?.atchBldCnt || ""}
                    />
                    <TextDivider gridColumn="1 / 7" />
                    <BuildingItem
                      title="건폐율"
                      content={`${info?.bcRat || 0}%`}
                      mb="2.75rem"
                    />
                    <BuildingItem
                      title="용적률"
                      content={`${info?.vlRat || 0}%`}
                    />
                    <BuildingItem title="" content="" />
                    <BuildingItem
                      title="주구조"
                      content={info?.strctCdNm || ""}
                    />
                    <BuildingItem
                      title="기타구조"
                      content={info?.etcStrct || ""}
                    />
                    <BuildingItem
                      title="지붕구조"
                      content={info?.roofCdNm || ""}
                    />
                    <TextDivider gridColumn="1 / 7" />
                    <BuildingItem
                      title="용도"
                      content={info?.mainPurpsCdNm || ""}
                      mb="2.75rem"
                    />
                    <BuildingItem
                      title="용도(기타)"
                      content={info?.etcPurps || ""}
                    />
                    <BuildingItem title="" content="" />
                    <BuildingItem title="허가일" content={info?.pmsDay || ""} />
                    <BuildingItem
                      title="착공일"
                      content={info?.stcnsDay || ""}
                    />
                    <BuildingItem
                      title="사용승인일"
                      content={info?.useAprDay || ""}
                    />
                    <TextDivider gridColumn="1 / 7" />
                    <BuildingItem
                      title="세대수"
                      content={info?.hhldCnt || "0"}
                    />
                    <BuildingItem
                      title="가구수"
                      content={info?.fmlyCnt || "0"}
                    />
                    <BuildingItem title="호수" content={info?.hoCnt || "0"} />
                    <TextDivider gridColumn="1 / 7" />
                    <BuildingItem title="높이" content={info?.heit || "0"} />
                    <BuildingItem
                      title="층수(지상)"
                      content={info?.grndFlrCnt || "0"}
                    />
                    <BuildingItem
                      title="층수(지하)"
                      content={info?.ugrndFlrCnt || "0"}
                    />
                  </Grid>
                  <Grid
                    w="100%"
                    templateColumns="7.75rem 1fr 7.75rem 1fr 7.75rem 1fr 7.75rem min-content"
                    gridColumnGap="1.5rem"
                    gridRowGap="0.25rem"
                  >
                    <BuildingItem
                      title="승강기(승용)"
                      content={info?.rideUseElvtCnt || "0"}
                    />
                    <BuildingItem title="" content="" />
                    <BuildingItem
                      title="승강기(비상용)"
                      content={info?.emgenUseElvtCnt || "0"}
                    />
                    <BuildingItem title="" content="" />
                    <TextDivider gridColumn="1 / 9" />
                    <BuildingItem
                      title="옥내 기계식 대수(대)"
                      content={info?.indrMechUtcnt || "0"}
                    />
                    <BuildingItem
                      title="옥내 기계식 면적(㎡)"
                      content={info?.indrMechArea || "0"}
                    />
                    <BuildingItem
                      title="옥외 기계식 대수(대)"
                      content={info?.oudrMechUtcnt || "0"}
                    />
                    <BuildingItem
                      title="옥외 기계식 면적(㎡)"
                      content={info?.oudrMechArea || "0"}
                    />
                    <TextDivider gridColumn="1 / 9" />
                    <BuildingItem
                      title="옥내 자주식 대수(대)"
                      content={info?.indrAutoUtcnt || "0"}
                    />
                    <BuildingItem
                      title="옥내 자주식 면적(㎡)"
                      content={info?.indrAutoArea || "0"}
                    />
                    <BuildingItem
                      title="옥외 자주식 대수(대)"
                      content={info?.oudrAutoUtcnt || "0"}
                    />
                    <BuildingItem
                      title="옥외 자주식 면적(㎡)"
                      content={info?.oudrAutoArea || "0"}
                    />
                  </Grid>
                </Flex>
              ) : (
                "정보가 없습니다"
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Fragment>
  );
};

const BuildingItem = ({
  title,
  content,
  ...rest
}: {
  title: string;
  content: string;
  [x: string]: any;
}) => {
  return (
    <Fragment>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="strong"
        color="font.primary"
        whiteSpace="nowrap"
        lineHeight="1.5rem"
        {...rest}
      >
        {title}
      </Text>
      <Text
        textStyle="base"
        fontSize="sm"
        fontWeight="medium"
        color="font.primary"
        whiteSpace="break-spaces"
        lineHeight="1.5rem"
        {...rest}
      >
        {content}
      </Text>
    </Fragment>
  );
};

const TextDivider = ({ gridColumn }: { gridColumn?: string }) => {
  return <Divider gridColumn={gridColumn || "1 / 5"} borderBottomWidth="2px" />;
};

export default ModalBuilding;
