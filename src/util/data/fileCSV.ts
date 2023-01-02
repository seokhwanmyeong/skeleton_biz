import { FormCsv } from "@util/file/manageFile";

const csvStoreInfo: FormCsv = {
  fileName: "비즈레시피 매장정보 양식",
  sheetName: "매장",
  desc: "기본정보 ('*' = 필수입력)",
  columns: [
    {
      title: "*매장명",
      key: "name",
      t: "s",
      isRequired: true,
      v: "합정점",
    },
    {
      title: `*사업자등록번호 \n(숫자만 입력)`,
      key: "biz_number",
      t: "s",
      isRequired: true,
      v: "1112233333",
    },
    {
      title: "*매장코드",
      key: "code",
      t: "s",
      isRequired: true,
      v: "A123",
    },
    {
      title: `*상태\n(개점/폐점/휴점/대기/기타)`,
      key: "status",
      t: "s",
      isRequired: true,
      v: "개점",
    },
    {
      title: `*타입\n(A타입/B타입/C타입/D타입/E타입)`,
      key: "rank",
      t: "s",
      isRequired: true,
      v: "A타입",
    },
    {
      title: `개업일 \n(yyyy-mm-dd)`,
      key: "open_date",
      t: "d",
      isRequired: false,
      v: "2004-12-29",
    },
    {
      title: `*매장연락처 \n(숫자만 입력)`,
      key: "phone",
      t: "s",
      isRequired: true,
      v: "027778888",
    },
    {
      title: `*주소 \n(정확한 도로명 주소까지만 기재)`,
      key: "address",
      t: "s",
      isRequired: true,
      v: "서울시 마포구 양화로 81",
    },
    {
      title: `*상세주소 \n(도로명 주소 이하 상세주소 입력)`,
      key: "address_detail",
      t: "s",
      isRequired: true,
      v: "1층",
    },
    {
      title: "*대표자",
      key: "owner_name",
      t: "s",
      isRequired: true,
      v: "김민수",
    },
    {
      title: `*대표자연락처 \n(숫자만 입력)`,
      key: "owner_phone",
      t: "s",
      isRequired: true,
      v: "01022223333",
    },
    {
      title: `*영업상권 \n(반경만가능 / 단위: m / 제한: 3000)`,
      key: "phone",
      t: "n",
      isRequired: true,
      v: "1500",
    },
  ],
};

const storeSale = [
  {
    brandName: "string",
    brandCode: "string",
    name: "string",
    code: "string",
    sales_day: "string",
    sales_time: "string",
    menu_name: "string",
    order_count: "number",
    total_sales: "number",
    address: "string",
    order_type: "string",
  },
];

export { csvStoreInfo, storeSale };
