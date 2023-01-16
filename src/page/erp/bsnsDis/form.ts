const formSearchBsnsDis = {
  initVal: {
    searchType: "bsnsDisName",
    text: "",
    address: "total",
    bsnsDisStatus: "total",
  },
  formKey: "BsnsDisSearch",
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
                { text: "상권명", value: "bsnsDisName" },
                { text: "상권코드", value: "bsnsDisCode" },
                { text: "연동매장명", value: "bsnsDisLink" },
              ],
              variant: "filled",
              isRequired: false,
            },
            {
              type: "text",
              key: "text",
              variant: "filled",
              isRequired: false,
            },
          ],
        },
        {
          labelText: "지역",
          type: "slctAddr",
          key: "address",
          variant: "filled",
          isRequired: false,
        },
      ],
      {
        labelText: "상권상태",
        type: "chkTotalbox",
        key: "bsnsDisStatus",
        values: [
          { text: "영업상권", value: "disMain" },
          { text: "후보상권", value: "disSub" },
          { text: "예약상권", value: "disReserve" },
          { text: "배달상권", value: "disDlvry" },
        ],
        isRequired: false,
      },
    ],
  ],
};

export { formSearchBsnsDis };
