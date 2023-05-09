//  Lib
import { useEffect, useState } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
//  Component
import ChartDo from "@components/charts/ChartDo";
import { lib } from "crypto-js";

type Props = {};

const ReportSummary = ({ data }: any) => {
  const [block, setBlock] = useState<any[]>([]);
  const [label, setLabel] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const rankColor = ["#FADB14", "#FF7A45", "#36CFC9", "#595959", "#BFBFBF"];

  useEffect(() => {
    if (data.blockType && data.blockRto) {
      const label = [];
      const chartData = [];
      const type = data.blockType.split(", ");
      const Rto = data.blockRto.split(", ");
      const blockList = type.map((blk: string, idx: number) => {
        return {
          type: blk,
          rto: Number(Rto[idx]),
        };
      });

      blockList.sort((x: any, y: any) => {
        return y.rto - x.rto;
      });

      blockList.map((li: any) => {
        label.push(li.type);
        chartData.push(li.rto);
      });

      setBlock(blockList);
      setLabel(type);
      setChartData(Rto);
    }
  }, [data]);

  return (
    <Flex
      p="0rem 0.5rem"
      h="100%"
      w="100%"
      direction="column"
      justify="space-between"
    >
      <Flex w="100%" gap="0.5rem">
        <ElementCardBox width="50%">
          <Flex direction="column">
            <ElementCardTitle title="상권유형" subTitle="상업지역" />
            <Flex
              pl="0.5rem"
              h="100%"
              direction="column"
              justify="space-around"
              align="flex-start"
            >
              {block &&
                block.length > 0 &&
                block.map((li: any, idx: number) => {
                  return (
                    <Flex align="center" gap="0.25rem">
                      <Box
                        w="0.5rem"
                        h="0.5rem"
                        background={rankColor[idx] || "#FF7A45"}
                        borderRadius="2px"
                      />
                      <Text
                        textStyle="base"
                        fontSize="0.625rem"
                        fontWeight="regular"
                        color="font.secondary"
                        whiteSpace="nowrap"
                        lineHeight="1px"
                      >
                        {li.type} - {li.rto}%
                      </Text>
                    </Flex>
                  );
                })}
            </Flex>
          </Flex>
          <ChartDo
            w="120px"
            top={{
              name: label[0],
              amount: chartData[0],
            }}
            options={{
              plugins: {
                title: {
                  display: false,
                  text: "상업지역 추이",
                },
                legend: {
                  display: false,
                },
              },
              responsive: true,
            }}
            data={{
              labels: label,
              datasets: [
                {
                  label: "",
                  data: chartData,
                  backgroundColor: rankColor,
                  borderWidth: 0,
                  cutout: "60%",
                },
              ],
            }}
          />
        </ElementCardBox>
        <Flex direction="column" width="50%" gap="0.5rem">
          <ElementCardBox>
            <ElementCardTitle title="상권 점수" subTitle="1000점 기준" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.avgLv || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                등급
              </Text>
            </Flex>
          </ElementCardBox>
          <ElementCardBox>
            <ElementCardTitle title="상권 등급" subTitle="5등급 기준" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.avgScore || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                {" / 1000"}
              </Text>
            </Flex>
          </ElementCardBox>
        </Flex>
      </Flex>
      <Flex w="100%" direction="column" gap="0.5rem">
        <Flex w="100%" gap="0.5rem">
          <ElementCardBox>
            <ElementCardTitle title="월 평균 매출" subTitle="매출 규모" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {Math.round(data.avgSalesAmt) || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                만원
              </Text>
            </Flex>
          </ElementCardBox>
          <ElementCardBox>
            <ElementCardTitle title="유동 인구수" subTitle="40대 여성 1위" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.inflowCustCnt || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                명
              </Text>
            </Flex>
          </ElementCardBox>
        </Flex>
        <Flex w="100%" gap="0.5rem">
          <ElementCardBox>
            <ElementCardTitle title="동종 업종수" subTitle="사무가구 점포수" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.storeCnt || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                개
              </Text>
            </Flex>
          </ElementCardBox>
          <ElementCardBox>
            <ElementCardTitle title="주거 인구수" subTitle="50대 여성 1위" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.housCustCnt || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.375rem"
                color="font.primary"
              >
                명
              </Text>
            </Flex>
          </ElementCardBox>
        </Flex>
        <Flex w="100%" gap="0.5rem">
          <ElementCardBox>
            <ElementCardTitle title="세대수" subTitle="아파트 1위" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.hous || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                세대
              </Text>
            </Flex>
          </ElementCardBox>
          <ElementCardBox>
            <ElementCardTitle title="직장 인구수" subTitle="20대 남성 1위" />
            <Flex align="flex-end">
              <Text
                textStyle="base"
                fontSize="1.25rem"
                fontWeight="strong"
                lineHeight="1.375rem"
                color="neutral.gray10"
              >
                {data.jobCustCnt || "-"}
              </Text>
              <Text
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.2"
                color="font.primary"
              >
                명
              </Text>
            </Flex>
          </ElementCardBox>
        </Flex>
      </Flex>
      <Flex w="100%" gap="0.5rem">
        <ElementCardBox>
          <ElementCardTitle title="지역정보" />
          <Flex direction="column">
            <Flex gap="0.5rem">
              <Flex>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight="1.375rem"
                  color="neutral.gray10"
                >
                  {data.schoolCnt || "-"}
                </Text>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="regular"
                  lineHeight="1.375rem"
                  color="font.primary"
                >
                  학교수
                </Text>
              </Flex>
              <Flex>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight="1.375rem"
                  color="neutral.gray10"
                >
                  {data.companyCnt || "-"}
                </Text>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="regular"
                  lineHeight="1.375rem"
                  color="font.primary"
                >
                  직장수
                </Text>
              </Flex>
            </Flex>
            <Flex gap="0.5rem">
              <Flex>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight="1.375rem"
                  color="neutral.gray10"
                >
                  {data.subwayCnt || "-"}
                </Text>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="regular"
                  lineHeight="1.375rem"
                  color="font.primary"
                >
                  지하철
                </Text>
              </Flex>
              <Flex>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="strong"
                  lineHeight="1.375rem"
                  color="neutral.gray10"
                >
                  {data.busstopCnt || "-"}
                </Text>
                <Text
                  textStyle="base"
                  fontSize="xs"
                  fontWeight="regular"
                  lineHeight="1.375rem"
                  color="font.primary"
                >
                  버스정류장
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ElementCardBox>
        <ElementCardBox>
          <ElementCardTitle title="평균 결제금액" subTitle="일평균" />
          <Flex align="flex-end">
            <Text
              textStyle="base"
              fontSize="1.25rem"
              fontWeight="strong"
              lineHeight="1.375rem"
              color="neutral.gray10"
            >
              28,828
            </Text>
            <Text
              textStyle="base"
              fontSize="sm"
              fontWeight="regular"
              lineHeight="1.375rem"
              color="font.primary"
            >
              원
            </Text>
          </Flex>
        </ElementCardBox>
      </Flex>
    </Flex>
  );
};

const ElementCardTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <Flex direction="column">
      <Flex
        w="5.625rem"
        h="1.125rem"
        justify="center"
        align="center"
        borderRadius="9px"
        bg="neutral.gray10"
      >
        <Text
          textStyle="base"
          fontSize="xs"
          fontWeight="strong"
          lineHeight="1px"
          color="font.inverse"
        >
          {title}
        </Text>
      </Flex>
      <Divider m="0.25rem 0 0rem" borderColor="neutral.gray6" />
      {subTitle && (
        <Text
          w="100%"
          textStyle="base"
          fontSize="0.625rem"
          fontWeight="regular"
          lineHeight="1.125rem"
          color="font.secondary"
          textAlign="center"
        >
          {subTitle}
        </Text>
      )}
    </Flex>
  );
};

const ElementCardBox = ({
  children,
  width,
}: {
  children: any;
  width?: string;
}) => {
  return (
    <Flex
      p="0.75rem 0.75rem 0.25rem"
      w={width || "100%"}
      justify="space-between"
      border="1px solid"
      borderColor="neutral.gray6"
      borderRadius="base"
      background="rgba(255, 255, 255, 0.69)"
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
    >
      {children}
    </Flex>
  );
};

export default ReportSummary;
