import type { Query } from "@cubejs-client/core";

const querySaleDashboard: {
  initQ: Query | Query[];
} = {
  initQ: [
    {
      measures: [`Sales.sum`],
      dimensions: [`StoreInfo.storeName`],
      limit: 10,
      order: [["Sales.sum", "desc"]],
      timeDimensions: [
        {
          dimension: "Sales.saleDate",
          granularity: "month",
        },
      ],
    },
    {
      measures: [`Sales.sum`],
      dimensions: [`Sales.menuNm`],
      limit: 10,
      order: [["Sales.sum", "desc"]],
      timeDimensions: [
        {
          dimension: "Sales.saleDate",
          granularity: "month",
        },
      ],
    },
    {
      measures: [`Sales.sum`],
      dimensions: [`Sales.dlvType`],
      limit: 10,
      order: [["Sales.sum", "asc"]],
      timeDimensions: [
        {
          dimension: "Sales.saleDate",
          granularity: "month",
        },
      ],
    },
  ],
};

const queryStoreList = {
  initQ: {
    measures: [`StoreInfo.count`],
    dimensions: [
      `StoreInfo.storeName`,
      `StoreInfo.storeCode`,
      `StoreInfo.addr`,
      `StoreInfo.addrDetail`,
      `StoreInfo.storeStatus`,
      `StoreInfo.storeRank`,
      `StoreInfo.openDate`,
    ],
    timeDimensions: [],
    limit: 10,
    offset: 1,
  },
  totalQ: {
    measures: [`StoreInfo.count`],
  },
};

const querySaleList = {
  initQ: {
    measures: [`Sales.avg`, `Sales.sum`],
    dimensions: [
      `StoreInfo.storeName`,
      `StoreInfo.storeCode`,
      `StoreInfo.storeRank`,
      `StoreInfo.openDate`,
    ],
    limit: 10,
    offset: 1,
  },
};

export { querySaleDashboard, queryStoreList, querySaleList };
