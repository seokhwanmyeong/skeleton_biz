const formSearchSale = {
  initVal: {
    address: "total",
    rank: "total",
    date: "total",
    searchType: "storeName",
    text: "",
  },
  formKey: "StoreSale",
  fields: [
    [
      [
        {
          labelText: "지역",
          type: "slctAddr",
          key: "address",
          variant: "filled",
          isRequired: false,
        },
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
      ],
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
          labelText: "기간",
          type: "dateTotalDbl",
          key: "date",
          isRequired: false,
        },
      ],
    ],
  ],
};

export { formSearchSale };
