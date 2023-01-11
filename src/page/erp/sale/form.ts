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
      [
        {
          type: "bind",
          key: "duration",
          element: [
            {
              labelText: "기간 타입",
              type: "slct",
              key: "durType",
              values: [
                { text: "평균매출", value: "saleAvg" },
                { text: "누적매출", value: "saleAmount" },
              ],
              variant: "filled",
              isRequired: false,
              width: "25%",
            },
            {
              type: "dateDbl",
              key: "date",
              variant: "filled",
              isRequired: false,
              width: "75%",
            },
          ],
        },
        {},
      ],
    ],
  ],
};

export { formSearchSale };
