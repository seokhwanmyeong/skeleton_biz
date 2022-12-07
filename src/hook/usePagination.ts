type Options<I = any> = {
  isDirectApi?: boolean;
  divide?: number;
  totalRegisters: number;
  page: number;
  items: I[];
  registersPerPage: number;
  siblingsCount?: number;
};

type Pagination<I = any> = {
  pageItems: I[];
  dividePages: number[];
  currentPage: number;
  lastPage: number;
  next: {
    exist: boolean;
    nextPage: number;
  };
  prev: {
    exist: boolean;
    prevPage: number;
  };
  siblingsCount: number;
};

const usePagination = <I = any>({
  isDirectApi = false,
  totalRegisters,
  divide = 5,
  page,
  items,
  registersPerPage,
  siblingsCount = 1,
}: Options<I>): Pagination<I> => {
  const currentPage = page;
  const lastPage = Math.ceil(totalRegisters / registersPerPage);
  const totalPages = lastPage === 0 ? 1 : lastPage;
  const calcDivide =
    currentPage % divide === 0
      ? Math.trunc(currentPage / divide) - 1
      : Math.trunc(currentPage / divide);
  const dividePages = Array(divide)
    .fill(calcDivide * divide + 1)
    .map((num, idx) => num + idx)
    .filter((num) => totalPages >= num);
  const fisrt = dividePages[0];
  const last = dividePages[divide - 1];
  const prev = {
    exist: fisrt > divide,
    prevPage: fisrt > divide ? fisrt - 1 : fisrt,
  };
  const next = {
    exist: totalPages > last,
    nextPage: totalPages > last ? last + 1 : last,
  };
  const pageStart = (page - 1) * registersPerPage;
  const pageEnd = pageStart + registersPerPage;
  const pageItems = isDirectApi
    ? items.slice(0, registersPerPage)
    : items.slice(pageStart, pageEnd);

  return {
    dividePages,
    currentPage,
    lastPage,
    next,
    prev,
    siblingsCount,
    pageItems,
  };
};

export { usePagination };
