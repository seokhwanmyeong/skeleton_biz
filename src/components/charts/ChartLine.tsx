//  LIB
import { Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const ChartLine = (props: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const { options, data, ...rest } = props;

  return (
    <Flex flexDirection="column" {...rest}>
      <Line options={options} data={data} />
    </Flex>
  );
};

export default ChartLine;
