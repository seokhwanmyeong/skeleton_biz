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
      p: "0.5rem 1rem",
      w: "auto",
      h: "fit-content",
    },
    page: {
      p: 0,
      w: "2rem",
      h: "2rem",
    },
  },
  variants: {
    base: {
      bgColor: "primary.main.bg",
      borderRadius: "base",
      color: "primary.main.font",
      transition: "0.3s",
      _hover: {
        bgColor: "primary.main.hover",
      },
    },
    reverse: {
      bgColor: "primary.reverse.color",
      borderRadius: "base",
      color: "primary.reverse.font",
      transition: "0.3s",
      _hover: {
        bgColor: "primary.reverse.hover",
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
