// Lib
import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import {
  mode,
  StyleFunctionProps,
  GlobalStyleProps,
} from "@chakra-ui/theme-tools";
import { ComponentStyleConfig } from "@chakra-ui/react";

const btnTheme = {
  sizes: {
    auto: {
      p: "0.25rem 1rem",
      w: "auto",
      h: "fit-content",
      bgColor: "primary.type7",
      fontFamily: "main",
      fontStyle: "normal",
      fontSize: "md",
      color: "font.inverse",
      borderRadius: "2px",
      _hover: {
        bgColor: "primary.type8",
      },
    },
    page: {
      fontSize: "1.2rem",
      p: 0,
      w: "2rem",
      h: "2rem",
    },
  },
  variants: {
    subMenu: {
      p: "0",
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
      lineHeight: "0.875rem",
      fontFamily: "main",
      fontSize: "0.8125rem",
      fontStyle: "normal",
      fontWeight: "regular",
      color: "font.primary",
      bgColor: "transparent",
      _active: {
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
        svg: {
          color: "#FFFFFF",
        },
      },
      _hover: {
        bgColor: "transparent",
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
        svg: {
          color: "#FFFFFF",
        },
      },
    },
    inputElement: {
      bgColor: "primary.main.bg",
      borderRadius: "base",
      color: "primary.main.font",
      lineHeight: 1.5,
      transition: "0.3s",
      _hover: {
        bgColor: "primary.main.hover",
      },
    },
    pagenation: {
      display: "flex",
      alignItems: "center",
      minW: "17.75px",
      w: "auto",
      h: "18.48px",
      borderRadius: "pagenation",
      border: "1px solid",
      borderColor: "transparent",
      fontSize: "0.8125rem",
      fontWeight: "medium",
      lineHeight: "1.375rem",
      color: "font.primary",
      transition: "0.3s",
      _hover: {
        color: "primary.type7",
      },
      _active: {
        cursor: "initial",
        color: "primary.type7",
        borderColor: "primary.type7",
      },
    },
    search: {
      p: "0.25rem 1rem",
      w: "auto",
      h: "auto",
      gap: "0.5rem",
      fontSize: "sm",
      lineHeight: "1.5rem",
    },
    linkBtn: {
      p: "0.5rem 1rem",
    },
  },
  defaultProps: {
    size: "auto",
  },
};

export { btnTheme };
