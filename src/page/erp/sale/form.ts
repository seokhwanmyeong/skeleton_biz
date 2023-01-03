const formSearchSale = {
  initVal: {
    address: "total",
    durType: "saleAvg", // saleAmount
    date: {
      start: "",
      end: "",
    },
  },
  formKey: "StoreSale",
  fields: [
    [
      {
        labelText: "지역",
        type: "slctAddr",
        key: "address",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "기간 타입",
        type: "radio",
        key: "durType",
        values: [
          { text: "평균매출", value: "saleAvg" },
          { text: "누적매출", value: "saleAmount" },
        ],
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "기간",
        type: "dateDbl",
        key: "date",
        variant: "filled",
        isRequired: false,
      },
    ],
  ],
};

const formStoreSale = {
  initVal: {
    name: "",
    code: "",
    rank: "",
    status: "",
    phone: undefined,
    address: "",
    address_detail: "",
    biz_number: "",
    owner_name: "",
    owner_phone: "",
    open_date: undefined,
  },
  formKey: "StoreInfoHandle",
  fields: [
    [
      {
        labelText: "매장명",
        type: "text",
        key: "name",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장코드",
        type: "text",
        key: "code",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장상태",
        type: "radio",
        key: "status",
        values: [
          { text: "개점", value: "STATUS_OPEN" },
          { text: "폐점", value: "STATUS_CLOSE" },
          { text: "휴점", value: "STATUS_RESET" },
          { text: "대기", value: "STATUS_READY" },
          { text: "기타", value: "STATUS_ETC" },
        ],
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장타입",
        type: "radio",
        key: "rank",
        values: [
          { text: "A타입", value: "A_RANK" },
          { text: "B타입", value: "B_RANK" },
          { text: "C타입", value: "C_RANK" },
          { text: "D타입", value: "D_RANK" },
          { text: "E타입", value: "E_RANK" },
        ],
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장연락처",
        type: "text",
        key: "phone",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "주소",
        type: "text",
        key: "address",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "주소상세",
        type: "text",
        key: "address_detail",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "대표자명",
        type: "text",
        key: "owner_name",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "대표자 연락처",
        type: "text",
        key: "owner_phone",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "개업일",
        type: "date",
        key: "open_date",
        variant: "filled",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchSale, formStoreSale };
