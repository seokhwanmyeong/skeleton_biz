//  Lib
import { useEffect, useState } from "react";
import {
  Divider,
  Flex,
  Heading,
  Highlight,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
//  Component
import ChartStackBar from "@components/charts/ChartStackBar";

type Props = any;

const ReportFacility = ({ data }: Props) => {
  const [label, setLabel] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const filter = {
        companyCnt: data.companyCnt,
        schoolCnt: data.schoolCnt,
        subwayCnt: data.subwayList.length,
        busstopCnt: data.busstopCnt,
      };

      const label: any[] = [];
      const chartData = Object.values(filter);

      Object.keys(filter).map((key: string) => {
        if (key === "companyCnt") {
          label.push("직장");
        } else if (key === "schoolCnt") {
          label.push("학교");
        } else if (key === "busstopCnt") {
          label.push("버스");
        } else if (key === "subwayCnt") {
          label.push("지하철");
        }
      });

      setLabel(label);
      setChartData(chartData);
    }
  }, [data]);

  return (
    <Flex p="0" w="100%" h="100%" direction="column" gap="1rem">
      <Flex
        padding="1rem"
        w="100%"
        h="9.25rem"
        direction="column"
        justifyContent="flex-start"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Heading
          w="100%"
          textStyle="base"
          fontWeight="strong"
          fontSize="md"
          lineHeight="1.25rem"
          color="font.primary"
        >
          지역정보 요약
        </Heading>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <List p="0 0.75rem" w="100%">
          {data?.schoolCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${data?.schoolCnt}개`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {`선택 영역내 학교는 ${data?.schoolCnt}개 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {data?.companyCnt && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[`${data?.companyCnt}개`]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {`선택 영역내 직장수는 ${data?.companyCnt}개 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
          {(data?.subwayList.length > 0 || data?.busstopCnt > 0) && (
            <ListItem w="100%" display="flex" gap="4rem">
              <Text
                w="100%"
                textStyle="base"
                fontSize="sm"
                fontWeight="regular"
                lineHeight="1.75rem"
              >
                <Highlight
                  query={[
                    `${data?.subwayList.length}개`,
                    `${data?.busstopCnt}개`,
                  ]}
                  styles={{
                    w: "100%",
                    textStyle: "base",
                    fontSize: "sm",
                    fontWeight: "strong",
                    lineHeight: "1.75rem",
                    color: "primary.type10",
                    textDecoration: "underline",
                  }}
                >
                  {data?.subwayList.length > 0 && data?.busstopCnt > 0
                    ? `선택 영역내 지하철은 ${data?.subwayList.length}개, 버스정류장은 ${data?.busstopCnt}개 입니다.`
                    : data?.subwayList.length > 0
                    ? `선택 영역내 지하철은 ${data?.subwayList.length}개 입니다.`
                    : `선택 영역내 버스정류장은 ${data?.busstopCnt}개 입니다.`}
                </Highlight>
              </Text>
            </ListItem>
          )}
        </List>
      </Flex>
      <Flex
        pos="relative"
        padding="1rem"
        w="100%"
        direction="column"
        justifyContent="center"
        bgColor="rgba(255, 255, 255, 0.69)"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor="neutral.gray6"
        borderRadius="base"
      >
        <Flex justify="space-between" align="center">
          <Heading
            w="100%"
            textStyle="base"
            fontWeight="strong"
            fontSize="md"
            lineHeight="1.25rem"
            color="font.primary"
          >
            지역 유형별 추이
          </Heading>
          <Flex align="center" gap="0.75rem">
            <Text
              textStyle="base"
              fontSize="0.625rem"
              fontWeight="regular"
              color="font.secondary"
              whiteSpace="nowrap"
              lineHeight="1px"
            >
              단위 : 개
            </Text>
          </Flex>
        </Flex>
        <Divider
          m="0.5rem 0"
          borderBottomWidth="2px"
          borderColor="neutral.gray6"
        />
        <ChartStackBar
          p="0 2rem"
          height="15rem"
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
                position: "bottom" as const,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                beginAtZero: false,
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
              y: {
                stacked: true,
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                data: chartData,
                backgroundColor: "#36CFC9",
                barThickness: 40,
              },
            ],
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ReportFacility;
