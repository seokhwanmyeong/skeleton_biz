//  LIB
import { useState, useMemo, useEffect } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useCubeQuery } from "@cubejs-client/react";
//  Components
import ChartGraph from "@components/charts/ChartGraph";
import ChartBar from "@components/charts/ChartBar";
import ChartDonut from "@components/charts/ChartDonut";
//  API & Query
import { querySaleDashboard } from "@api/cubeApi/query";
//  Util
import { cubeChartHandler } from "@services/cube/transformer";
import { transMarginData } from "@util/data/testData";

const ErpDashBoard = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const { resultSet, error, isLoading } = useCubeQuery(
    querySaleDashboard.initQ
  );
  const [divide, setDivide] = useState(false);
  const testMargin = useMemo(() => {
    const testData = transMarginData(20);
    const accessKey = "cty_nm";
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
    const testData = transMarginData(10);
    // const testData = transMarginData(20).filter((li) => {
    //   return li.cty_nm === "영등포구";
    // });
    // const keys = [
    //   "sale_mon",
    //   "sale_tue",
    //   "sale_wed",
    //   "sale_thu",
    //   "sale_fri",
    //   "sale_sat",
    //   "sale_sun",
    // ];
    const accessKey = "admi_nm";
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

  const testMargin3 = useMemo(() => {
    const testData = [
      {
        date: "2022-01",
        population: 5000,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-02",
        population: 100,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-03",
        population: 3500,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-04",
        population: 1000,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-05",
        population: 9000,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-08",
        population: 8000,
        age_10: 0.1,
        age_20: 0.4,
        age_30: 0.3,
        age_40: 0.1,
        age_50: 0.05,
        age_60: 0.05,
      },
      {
        date: "2022-10",
        population: 677,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-11",
        population: 800,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
      {
        date: "2022-12",
        population: 8000,
        age_10: 0.2,
        age_20: 0.2,
        age_30: 0.2,
        age_40: 0.2,
        age_50: 0.1,
        age_60: 0.1,
      },
    ];
    const accessKey = "population";
    const subKey = "age_";
    const legend = {
      key: ["population"],
      date: {
        key: "인구수",
        title: "날짜",
        check: true,
      },
    };
    const totalAmt = Math.max(
      ...testData.map((li: any) => {
        return li.population;
      })
    );

    return {
      data: testData,
      accessKey: accessKey,
      subKey: subKey,
      totalAmt: totalAmt,
      legend: legend,
    };
  }, []);

  useEffect(() => {
    if (!resultSet) {
      return;
    } else {
      const pivotConfig = [
        {
          x: [`StoreInfo.storeName`],
          y: [`Sales.sum`],
        },
        {
          x: [`Sales.menuNm`],
          y: [`Sales.sum`],
        },
        {
          x: [`Sales.dlvType`],
          y: [`Sales.sum`],
        },
      ];
      const data = cubeChartHandler(resultSet, pivotConfig);
      setChartData(data || []);
    }
  }, [resultSet]);

  return (
    <Box
      w="100%"
      h="100%"
      // overflowY="scroll"
      // __css={{
      //   "::-webkit-scrollbar": {
      //     w: "5px",
      //   },
      //   "::-webkit-scrollbar-thumb": {
      //     borderRadius: "5",
      //     bg: `primary.reverse.bdColor`,
      //   },
      // }}
    >
      <Flex gap={10} w="100%" h="500px">
        {/* <Flex w="50%">
          <ChartDonut
            data={chartData[2] || []}
            accessKey={"Sales.sum"}
          />
        </Flex> */}
        <Flex w="100%">
          <ChartBar
            data={testMargin2.data}
            accessKey={testMargin2.accessKey}
            total={testMargin2.totalAmt}
            isDivide={false}
            legend={testMargin2.legend}
            // activeLine={true}
          />
        </Flex>
      </Flex>
      <Button
        m="2rem"
        onClick={() => {
          setDivide(!divide);
        }}
      >
        Divide
      </Button>
      <Flex w="100%" h="500px">
        <ChartBar
          data={testMargin.data}
          accessKey={testMargin.accessKey}
          total={testMargin.totalAmt}
          isDivide={divide}
          legend={testMargin.legend}
        />
      </Flex>
    </Box>
  );
};

export default ErpDashBoard;
