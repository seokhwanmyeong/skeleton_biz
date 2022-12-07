//  LIB
import { useState, useMemo } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
//  Components
import ChartCircle from "@components/charts/ChartCircle";
import ChartGraph from "@components/charts/ChartGraph";
import ChartBar from "@src/components/charts/ChartBar";
//  Util
import { transMarginData } from "@src/util/data/testData";

const DashBoard = () => {
  const [divide, setDivide] = useState(false);
  const testMargin = useMemo(() => {
    const testData = transMarginData(1000).filter((li) => {
      return li.cty_nm === "영등포구";
    });
    const accessKey = "upjong2_nm";
    const totalAmt = 1;
    const legend = {
      key: ["mTotal", "wTotal"],
      mTotal: {
        key: "mTotal",
        title: "남자",
        check: true,
      },
      wTotal: {
        key: "wTotal",
        title: "여자",
        check: true,
      },
    };

    return {
      data: testData,
      accessKey: accessKey,
      totalAmt: totalAmt,
      legend: legend,
    };
  }, []);

  const testMargin2 = useMemo(() => {
    const testData = transMarginData(10000).filter((li) => {
      return li.cty_nm === "영등포구";
    });
    // const keys = [
    //   "sale_mon",
    //   "sale_tue",
    //   "sale_wed",
    //   "sale_thu",
    //   "sale_fri",
    //   "sale_sat",
    //   "sale_sun",
    // ];
    const accessKey = "upjong2_nm";
    const legend = {
      key: ["sale_amt"],
      sale_amt: {
        key: "sale_amt",
        title: "매출",
        check: true,
      },
    };
    // const title = {
    //   sale_mon: "월요일",
    //   sale_tue: "화요일",
    //   sale_wed: "수요일",
    //   sale_thu: "목요일",
    //   sale_fri: "금요일",
    //   sale_sat: "토요일",
    //   sale_sun: "일요일",
    // };
    // const totalAmt = 1;
    // const totalAmt = testData.reduce(
    //   (acc, cur): any => acc + cur["sale_amt"],
    //   0
    // );
    const totalAmt = Math.max(
      ...testData.map((li: any) => {
        return li.sale_amt;
      })
    );

    return {
      data: testData,
      accessKey: accessKey,
      totalAmt: totalAmt,
      legend: legend,
    };
  }, []);

  return (
    <Flex flexDirection="column">
      <Heading>DashBoard</Heading>
      <Button
        onClick={() => {
          setDivide(!divide);
        }}
      >
        Divide
      </Button>
      <Flex w="100%" h="600px">
        <ChartBar
          data={testMargin.data}
          accessKey={testMargin.accessKey}
          total={testMargin.totalAmt}
          isDivide={divide}
          legend={testMargin.legend}
        />
      </Flex>
      <Flex w="100%" h="600px">
        <ChartBar
          data={testMargin2.data}
          accessKey={testMargin2.accessKey}
          total={testMargin2.totalAmt}
          isDivide={false}
          legend={testMargin2.legend}
        />
      </Flex>
    </Flex>
  );
};

export default DashBoard;
