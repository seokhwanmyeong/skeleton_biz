//  LIB
import { Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const ChartStackBar = (props: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { options, data, ...rest } = props;

  return (
    <Flex flexDirection="column" {...rest}>
      <Bar options={options} data={data} />
    </Flex>
  );
};

export default ChartStackBar;
