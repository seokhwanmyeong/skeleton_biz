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
      p: "1rem 1.5rem",
      w: "auto",
      h: "fit-content",
      fontSize: "md",
    },
    page: {
      fontSize: "1.2rem",
      p: 0,
      w: "2rem",
      h: "2rem",
    },
  },
  variants: {
    base: {
      p: "0.5rem",
      bgColor: "bg.primary",
      borderRadius: "base",
      fontFamily: "main",
      fontStyle: "normal",
      color: "primary.main.font",
      transition: "0.3s",
      _hover: {
        bgColor: "primary.main.hover",
      },
    },
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
    reverse: {
      bgColor: "primary.reverse.bg",
      borderRadius: "base",
      color: "primary.reverse.font",
      transition: "0.3s",
      _hover: {
        bgColor: "primary.reverse.hover",
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
      fontSize: "xs",
      bg: "primary.main.bg",
      borderRadius: "base",
      border: "1px solid",
      borderColor: "primary.main.bdColor",
      color: "primary.main.font",
      transition: "0.3s",
      _hover: {
        opacity: 0.8,
        color: "primary.main.font",
        bg: "primary.main.hover",
      },
      _active: {
        opacity: 1,
        bg: "primary.reverse.bg",
        color: "primary.reverse.font",
        cursor: "initial",
        border: "1px solid",
        borderColor: "primary.reverse.bdColor",
      },
    },
  },
  defaultProps: {
    size: "auto",
    variant: "base",
  },
};

export { btnTheme };
