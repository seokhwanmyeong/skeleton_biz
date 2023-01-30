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

export { queryStoreList, querySaleList };
