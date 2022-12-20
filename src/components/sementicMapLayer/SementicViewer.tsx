//  LIB
import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Flex, Button, Heading } from "@chakra-ui/react";
//  Components
import ChartCircle from "@components/charts/ChartCircle";
import ChartGraph from "@components/charts/ChartGraph";
//  States
import { checkBaseState } from "@states/searchState/stateSearch";

type Props = {};

const SementicViewer = (props: Props) => {
  const isCheckbaseOption = useRecoilValue(checkBaseState);
  const [offsetW, setOffsetW] = useState(0);
  const ref = useRef<any>();
  const [data] = useState({
    data1: [
      { date: "2022-01", population: 5000 },
      { date: "2022-02", population: 100 },
      { date: "2022-03", population: 3500 },
      { date: "2022-04", population: 1000 },
      { date: "2022-05", population: 9000 },
      { date: "2022-05", population: 1000 },
      { date: "2022-08", population: 8000 },
      { date: "2022-10", population: 677 },
      { date: "2022-11", population: 800 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 3000 },
      { date: "2022-12", population: 8000 },
    ],
    data2: [
      { age: "10th", count: 2000 },
      { age: "20th", count: 5000 },
      { age: "30th", count: 12359 },
      { age: "40th", count: 4560 },
      { age: "50th", count: 1500 },
      { age: "60th", count: 1290 },
    ],
  });

  const onToggle = () => {
    setOffsetW(offsetW === 0 ? -ref.current.clientWidth : 0);
  };

  useEffect(() => {
    if (!isCheckbaseOption) setOffsetW(0);
  }, [isCheckbaseOption]);

  if (!isCheckbaseOption) {
    return null;
  }

  return (
    <Flex
      position="absolute"
      right={`${offsetW}px`}
      top="0"
      zIndex="100"
      h="100%"
      transition="0.3s"
    >
      <Button
        w="auto"
        borderRadius="0px 0px 0px 5px"
        bgColor="primary.main.bg"
        onClick={onToggle}
        transition="0.3s"
        color="primary.main.font"
        _hover={{
          bgColor: "primary.main.hover",
        }}
      >
        SementicView
      </Button>
      <Flex
        w="400px"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderLeft="1px solid #ededed"
        bgColor="primary.main.bg"
        overflow="hidden"
        transition="0.3s"
        ref={ref}
      >
        <Heading>SementicViewer</Heading>
        <ChartGraph Data={data.data1} />
        <ChartCircle
          Data={data.data2}
          title=""
          keyName="age"
          valName="count"
          zKey=""
          Group={false}
          width={360}
          height={300}
          innerRadius={0}
          outerRadius={148}
          labelRadius={110}
          arcColor={[
            "#98abc5",
            "#8a89a6",
            "#7b6888",
            "#6b486b",
            "#a05d56",
            "#555555",
          ]}
          stroke="none"
          strokeWidth={1}
          strokeLinejoin="round"
          padAngle={0}
          svgStyle={{
            width: "10px",
            height: "auto",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default SementicViewer;
