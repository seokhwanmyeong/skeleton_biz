//  LIB
import { Flex, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ChartDo = (props: any) => {
  ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

  const { top, options, data, ...rest } = props;

  return (
    <Flex pos="relative" flexDirection="column" {...rest}>
      <Flex
        pos="absolute"
        top="54%"
        left="50%"
        transform="translate(-50%, -50%)"
        justify="center"
        align="center"
        direction="column"
      >
        {top.name && (
          <Text
            textStyle="base"
            fontSize="sm"
            fontWeight="regular"
            lineHeight="1.2"
            color="font.primary"
          >
            {top.name}
          </Text>
        )}
        {top.amount && (
          <Text
            textStyle="base"
            fontSize="1.25rem"
            fontWeight="strong"
            lineHeight="1.375rem"
            color="neutral.gray10"
          >
            {top.amount}%
          </Text>
        )}
      </Flex>
      <Doughnut options={options} data={data} />
    </Flex>
  );
};

export default ChartDo;
