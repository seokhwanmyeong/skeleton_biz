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

const ChartLine = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "월별추이",
      },
    },
  };
  const labels = [
    "202202",
    "202203",
    "202204",
    "202205",
    "202206",
    "202207",
    "202208",
    "202209",
    "202210",
    "202211",
    "202212",
    "202301",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "유동인구량",
        data: [500, 1000, 3000, 200, 500, 300, 500, 1000, 3000, 200, 500, 300],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Flex>
      <Line options={options} data={data} />
    </Flex>
  );
};

export default ChartLine;
