//  LIB
import React, { forwardRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
//  Components
import PaginationItem from "@components/table/PaginationItem";

type PaginationProps = {
  ref?: any;
  dividePages: number[];
  divideNum: number;
  totalPage: number;
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

const Pagination = forwardRef(
  (
    {
      dividePages,
      divideNum,
      totalPage,
      currentPage,
      lastPage,
      next,
      prev,
      siblingsCount,
      onPageChange,
      variant,
    }: PaginationProps,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    return (
      <Flex
        ref={ref}
        m="2rem 0"
        w="100%"
        justifyContent="center"
        flexDirection="row"
        align="center"
      >
        <Flex align="center" flexDirection="row" position="relative">
          {totalPage && (
            <Text
              mr="0.75rem"
              fontFamily="main"
              fontWeight="medium"
              fontSize="xs"
              color="font.primary"
            >
              Total {totalPage} items
            </Text>
          )}
          <PaginationItem
            isPageEvent={true}
            onPageChange={onPageChange}
            page={prev.prevPage}
            key={prev.prevPage}
            customChild={"<"}
            variant={variant}
            isDisabled={!prev.exist}
          />
          {prev.exist && (
            <PaginationItem
              isPageEvent={true}
              onPageChange={onPageChange}
              page={1}
              key="first"
              customChild={"1"}
              variant={variant}
            />
          )}
          {currentPage > divideNum && (
            <Flex w="1.109375rem" h="1.1775rem" align="center" justify="center">
              <Text
                fontFamily="main"
                fontWeight="heavy"
                fontSize="sm"
                color="#00000040"
              >
                ···
              </Text>
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
          {!dividePages.includes(lastPage) && (
            <Flex w="1.109375rem" h="1.1775rem" align="center" justify="center">
              <Text
                fontFamily="main"
                fontWeight="heavy"
                fontSize="sm"
                color="#00000040"
              >
                ···
              </Text>
            </Flex>
          )}
          {next.exist && (
            <>
              <PaginationItem
                isPageEvent={true}
                onPageChange={onPageChange}
                page={lastPage}
                key="last"
                customChild={lastPage}
                variant={variant}
              />
              <PaginationItem
                isPageEvent={true}
                onPageChange={onPageChange}
                page={next.nextPage}
                key={next.nextPage}
                customChild={">"}
                variant={variant}
              />
            </>
          )}
        </Flex>
      </Flex>
    );
  }
);

export default Pagination;
