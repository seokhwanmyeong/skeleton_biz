const formSearchClient = {
  initVal: {
    searchType: "clientName",
    text: "",
    address: "total",
    clientStep: "total",
    path: "total",
    createdAt: "total",
  },
  formKey: "ClientSearch",
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
                { text: "고객명", value: "clientName" },
                { text: "담당자명", value: "memberName" },
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
          labelText: "희망지역",
          type: "slctAddr",
          key: "address",
          isRequired: false,
        },
      ],
      [
        {
          labelText: "등록일",
          type: "dateTotalDbl",
          key: "createdAt",
          isRequired: false,
        },
        {
          labelText: "고객상태",
          type: "chkTotalbox",
          key: "clientStep",
          values: [
            { text: "상담대기", value: "stepReady" },
            { text: "상담중", value: "stepCurrent" },
            { text: "상담완료", value: "stepComplete" },
            { text: "종료", value: "stepEnd" },
          ],
          isRequired: false,
        },
      ],
      {
        labelText: "유입경로",
        type: "chkTotalbox",
        key: "path",
        values: [
          { text: "지인소개", value: "pathFriend" },
          { text: "온라인광고", value: "pathOnline" },
          { text: "TV,지면광고", value: "pathTv" },
          { text: "박람회", value: "pathExpo" },
          { text: "포탈검색", value: "pathPortal" },
        ],
        isRequired: false,
      },
    ],
  ],
};

const formClientInfo = {
  initVal: {
    clientName: "",
    clientPhone: "",
    clientStep: "stepReady",
    path: "pathOnline",
    age: 0,
    job: "",
    resident: "",
    exp: false,
    address: "",
    startFund: 0,
    favorRent: "",
    memberName: "",
    createdAt: "",
  },
  formKey: "ClientInfoHandle",
  fields: [
    [
      {
        labelText: "고객명",
        type: "text",
        key: "clientName",
        isRequired: true,
      },
      {
        labelText: "고객연락처",
        type: "text",
        key: "clientPhone",
        isRequired: true,
      },
      {
        labelText: "고객상태",
        type: "slct",
        key: "clientStep",
        values: [
          { text: "상담대기", value: "stepReady" },
          { text: "상담중", value: "stepCurrent" },
          { text: "상담완료", value: "stepComplete" },
          { text: "종료", value: "stepEnd" },
        ],
        isRequired: true,
      },
      {
        labelText: "유입경로",
        type: "slct",
        key: "path",
        values: [
          { text: "지인소개", value: "pathFriend" },
          { text: "온라인광고", value: "pathOnline" },
          { text: "TV,지면광고", value: "pathTv" },
          { text: "박람회", value: "pathExpo" },
          { text: "포탈검색", value: "pathPortal" },
        ],
        isRequired: true,
      },
      {
        labelText: "나이",
        type: "text",
        key: "age",
        isRequired: false,
      },
      {
        labelText: "직업",
        type: "text",
        key: "job",
        isRequired: false,
      },
      {
        labelText: "거주지",
        type: "slctAddr",
        key: "resident",
        isRequired: false,
      },
      {
        labelText: "창업경험",
        type: "radio",
        key: "exp",
        values: [
          { text: "예", value: true },
          { text: "아니오", value: false },
        ],
        isRequired: false,
      },
      {
        labelText: "희망지역",
        type: "slctAddr",
        key: "address",
        isRequired: false,
      },
      {
        labelText: "창업자금",
        type: "number",
        key: "startFund",
        isRequired: false,
      },
      {
        labelText: "관심매물",
        type: "text",
        key: "favorRent",
        isRequired: false,
      },
      {
        labelText: "담당자명",
        type: "text",
        key: "memberName",
        isRequired: true,
      },
      {
        labelText: "등록일",
        type: "date",
        key: "createdAt",
        isRequired: false,
      },
    ],
  ],
};

export { formSearchClient, formClientInfo };
