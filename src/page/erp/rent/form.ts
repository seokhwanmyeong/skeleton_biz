const formSearchRent = {
  initVal: {
    searchType: "rentName",
    text: "",
    address: "total",
    rentRank: "total",
    createdAt: "total",
  },
  formKey: "RentInfo",
  fields: [
    [
      [
        {
          type: "bind",
          key: "searchTypeText",
          element: [
            {
              labelText: "검색어",
              type: "slct",
              key: "searchType",
              values: [
                { text: "매물명", value: "rentName" },
                { text: "매물코드", value: "rentCode" },
              ],
              isRequired: true,
            },
            {
              type: "text",
              key: "text",
              isRequired: false,
            },
          ],
        },
        {
          labelText: "주소",
          type: "slctAddr",
          key: "address",
          isRequired: false,
        },
      ],
      [
        {
          labelText: "매물타입",
          type: "chkTotalbox",
          key: "rentRank",
          values: [
            { text: "A타입", value: "rankA" },
            { text: "B타입", value: "rankB" },
            { text: "C타입", value: "rankC" },
            { text: "D타입", value: "rankD" },
            { text: "E타입", value: "rankE" },
          ],
          isRequired: false,
        },
        {
          labelText: "등록일",
          type: "dateTotalDbl",
          key: "createdAt",
          isRequired: false,
        },
      ],
    ],
  ],
};

const formRentInfo = {
  initVal: {
    rentName: "",
    rentRank: "",
    address: "",
    expectDay: "",
    sector: "",
    size: 0,
    floor: 0,
    rentalFee: 0,
    deposit: 0,
    premium: 0,
    managementFee: 0,
    img: [],
  },
  formKey: "RentInfoHandle",
  fields: [
    [
      {
        labelText: "매물명",
        type: "text",
        key: "rentName",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매물타입",
        type: "slct",
        key: "rentRank",
        values: [
          { text: "항목선택", value: "" },
          { text: "A타입", value: "A_RANK" },
          { text: "B타입", value: "B_RANK" },
          { text: "C타입", value: "C_RANK" },
          { text: "D타입", value: "D_RANK" },
          { text: "E타입", value: "E_RANK" },
        ],
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
        labelText: "입점가능일",
        type: "date",
        key: "expectDay",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "현업종",
        type: "text",
        key: "sector",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "실평수",
        type: "number",
        key: "size",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "층수",
        type: "number",
        key: "floor",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "임대료",
        type: "number",
        key: "rentalFee",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "보증금",
        type: "number",
        key: "deposit",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "권리금",
        type: "number",
        key: "premium",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "관리비",
        type: "number",
        key: "managementFee",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "사진",
        type: "img",
        key: "img",
        variant: "filled",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchRent, formRentInfo };
