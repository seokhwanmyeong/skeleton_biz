import { BaseTable } from "@util/type/tableType";

const BaseTableSet: BaseTable = [
  { title: "날짜", cellKey: "date" },
  { title: "이름", cellKey: "name" },
  { title: "나이", cellKey: "age" },
  { title: "주소", cellKey: "address" },
  { title: "정보", cellKey: "info" },
  { title: "상세보기", cellKey: "detail", isCustom: true },
];

const LineTableSet: BaseTable = [
  { title: "날짜", cellKey: "date" },
  { title: "이름", cellKey: "title" },
  { title: "나이", cellKey: "writer" },
  {
    title: "수정",
    cellKey: "detail",
    isCustom: true,
  },
];

export { BaseTableSet, LineTableSet };
