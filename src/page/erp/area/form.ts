const formSearchArea = {
  initVal: {
    searchType: "name",
    text: "",
    address: "total",
    status: "statusOpen",
  },
  formKey: "StoreSale",
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
                { text: "상권명", value: "name" },
                { text: "상권코드", value: "code" },
                { text: "연동매장명", value: "owner_name" },
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
        key: "status",
        values: [
          { text: "영업상권", value: "statusOpen" },
          { text: "후보상권", value: "statusClose" },
          { text: "예약상권", value: "statusRest" },
          { text: "배달상권", value: "statusReady" },
        ],
        variant: "filled",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchArea };
