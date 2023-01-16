const formSearchStore = {
  initVal: {
    searchType: "storeName",
    text: "",
    address: "total",
    status: "total",
    rank: "total",
    // status: [
    //   "statusOpen",
    //   "statusClose",
    //   "statusRest",
    //   "statusReady",
    //   "statusEtc",
    // ],
    // rank: ["rankA", "rankB", "rankC", "rankD", "rankE"],
    openDate: "total",
  },
  formKey: "StoreInfo",
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
                { text: "매장명", value: "storeName" },
                { text: "매장코드", value: "storeCode" },
                { text: "대표자명", value: "ownerName" },
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
          labelText: "매장타입",
          type: "chkTotalbox",
          key: "rank",
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
          labelText: "매장상태",
          type: "chkTotalbox",
          key: "status",
          values: [
            { text: "개점", value: "statusOpen" },
            { text: "폐점", value: "statusClose" },
            { text: "휴점", value: "statusRest" },
            { text: "대기", value: "statusReady" },
            { text: "기타", value: "statusEtc" },
          ],
          isRequired: false,
        },
      ],
      {
        labelText: "개업일",
        type: "dateTotalDbl",
        key: "openDate",
        isRequired: false,
      },
    ],
  ],
};

const formStoreInfo = {
  initVal: {
    storeName: "",
    storeCode: "",
    rank: "",
    status: "",
    storePhone: undefined,
    address: "",
    addressDetail: "",
    bizNumber: "",
    ownerName: "",
    ownerPhone: "",
    openDate: undefined,
  },
  formKey: "StoreInfoHandle",
  fields: [
    [
      {
        labelText: "매장명",
        type: "text",
        key: "storeName",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장코드",
        type: "text",
        key: "storeCode",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "매장상태",
        type: "slct",
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
        type: "slct",
        key: "rank",
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
        labelText: "매장연락처",
        type: "text",
        key: "storePhone",
        variant: "filled",
        isRequired: false,
      },
      {
        labelText: "사업자등록번호",
        type: "text",
        key: "bizNumber",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "대표자명",
        type: "text",
        key: "ownerName",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "대표자 연락처",
        type: "text",
        key: "ownerPhone",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: "주소",
        type: "addr",
        key: "address",
        variant: "filled",
        isRequired: true,
      },
      {
        labelText: " ",
        type: "text",
        key: "addressDetail",
        variant: "filled",
        isRequired: false,
        placeholder: "상세주소 입력란",
      },
      {
        labelText: "개업일",
        type: "date",
        key: "openDate",
        variant: "filled",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchStore, formStoreInfo };
