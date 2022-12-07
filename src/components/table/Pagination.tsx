//  LIB
import React from "react";
import { Flex } from "@chakra-ui/react";
//  Components
import PaginationItem from "@components/table/PaginationItem";

type PaginationProps = {
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
  onPageChange: (page: number) => void;
  variant?: string;
};

const Pagination = ({
  dividePages,
  currentPage,
  lastPage,
  next,
  prev,
  siblingsCount,
  onPageChange,
  variant,
}: PaginationProps) => {
  // console.log(next, prev);
  return (
    <Flex w="100%" justifyContent="center" flexDirection="row" align="center">
      <Flex flexDirection="row" gap="2" position="relative">
        {prev.exist && (
          <Flex
            position="absolute"
            left="-8rem"
            top="50%"
            transform="translateY(-50%)"
          >
            <PaginationItem
              isPageEvent={true}
              onPageChange={onPageChange}
              page={1}
              key="first"
              customChild={"<<"}
              variant={variant}
            />
            <PaginationItem
              isPageEvent={true}
              onPageChange={onPageChange}
              page={prev.prevPage}
              key={prev.prevPage}
              customChild={"<"}
              variant={variant}
            />
          </Flex>
        )}
        {dividePages &&
          dividePages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              page={page}
              key={page}
              isCurrent={currentPage === page}
              variant={variant}
            />
          ))}
        {next.exist && (
          <Flex
            position="absolute"
            right="-8rem"
            top="50%"
            transform="translateY(-50%)"
          >
            <PaginationItem
              isPageEvent={true}
              onPageChange={onPageChange}
              page={next.nextPage}
              key={next.nextPage}
              customChild={">"}
              variant={variant}
            />
            <PaginationItem
              isPageEvent={true}
              onPageChange={onPageChange}
              page={lastPage}
              key="last"
              customChild={">>"}
              variant={variant}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Pagination;
