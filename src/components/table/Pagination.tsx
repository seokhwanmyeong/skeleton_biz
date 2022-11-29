//  LIB
import React from "react";
import { Stack, Text, ThemeTypings } from "@chakra-ui/react";
//  Components
import PaginationItem from "@components/table/PaginationItem";

type PaginationProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  prevPages: number[];
  siblingsCount: number;
  colorScheme?: ThemeTypings["colorSchemes"];
};

const Pagination = ({
  currentPage,
  lastPage,
  prevPages,
  nextPages,
  siblingsCount,
  onPageChange,
  colorScheme,
}: PaginationProps) => {
  return (
    <Stack direction="row" mt="8" justify="flex-end" align="center" spacing="6">
      <Stack direction="row" spacing="4">
        {currentPage > 1 + siblingsCount ? (
          <>
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={1}
            />
            {currentPage > 2 + siblingsCount ? (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            ) : null}
          </>
        ) : null}

        {prevPages.length > 0
          ? prevPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        <PaginationItem
          colorScheme={colorScheme}
          onPageChange={onPageChange}
          page={currentPage}
          isCurrent
        />

        {nextPages.length > 0
          ? nextPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        {currentPage + siblingsCount < lastPage ? (
          <>
            {currentPage + 1 + siblingsCount < lastPage ? (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            ) : null}
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={lastPage}
            />
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default Pagination;
