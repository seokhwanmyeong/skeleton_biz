const formSearchHistory = {
  initVal: {
    historyType: "total",
    searchType: "title",
    text: "",
  },
  formKey: "HistorySearch",
  fields: [
    [
      [
        {
          type: "bind",
          key: "searchTypeText",
          element: [
            {
              labelText: "구분항목",
              type: "slct",
              key: "historyType",
              values: [
                { text: "전체", value: "total" },
                { text: "로그", value: "log" },
                { text: "작성", value: "write" },
              ],
              isRequired: true,
              width: "50%",
            },
            {
              labelText: "검색어",
              type: "slct",
              key: "searchType",
              values: [
                { text: "제목", value: "title" },
                { text: "작성자", value: "writer" },
              ],
              isRequired: true,
              width: "60%",
            },
            {
              type: "text",
              key: "text",
              isRequired: false,
              width: "120%",
            },
          ],
        },
      ],
    ],
  ],
};

const formHistoryInfo = {
  initVal: {
    writer: "",
    historyType: "write",
    createdAt: "",
    location: "",
    title: "",
    content: "",
    img: [],
  },
  formKey: "StoreInfoHandle",
  fields: [
    [
      {
        labelText: "작성자",
        type: "text",
        key: "writer",
        isRequired: false,
        isDisabled: true,
      },
      {
        labelText: "구분",
        type: "text",
        key: "historyType",
        isRequired: false,
        isDisabled: true,
      },
      {
        labelText: "작성일",
        type: "date",
        key: "createdAt",
        isRequired: false,
        isDisabled: true,
      },
      {
        labelText: "작성위치",
        type: "text",
        key: "location",
        isRequired: false,
      },
      {
        labelText: "제목",
        type: "text",
        key: "title",
        isRequired: true,
      },
      {
        labelText: "내용",
        type: "text",
        key: "content",
        isRequired: true,
      },
      {
        labelText: "사진",
        type: "img",
        key: "img",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchHistory, formHistoryInfo };
