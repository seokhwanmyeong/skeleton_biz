import React from "react";
import { Button, ThemeTypings } from "@chakra-ui/react";

type PaginationItemProps = {
  isPageEvent?: boolean;
  isCurrent?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  customChild?: any;
  variant?: string;
};

const PaginationItem = ({
  isPageEvent = false,
  isCurrent = false,
  page,
  onPageChange,
  customChild,
  variant = "pagenation",
}: PaginationItemProps) => {
  return (
    <Button
      variant={variant}
      size="page"
      isActive={isCurrent}
      onClick={() => {
        !isCurrent && onPageChange(page);
      }}
    >
      {isPageEvent ? customChild : page}
    </Button>
  );
};

export default PaginationItem;
