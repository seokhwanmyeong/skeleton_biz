import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

type DateProps = {
  date: any;
};

const importDateConverter = (date: DateProps) => {
  console.log(date);
};

const exportDateConverter = (date: DateProps) => {
  console.log(date);
};

export { importDateConverter, exportDateConverter };
