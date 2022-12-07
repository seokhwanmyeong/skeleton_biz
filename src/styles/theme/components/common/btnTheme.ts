// Lib
import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import {
  mode,
  StyleFunctionProps,
  GlobalStyleProps,
} from "@chakra-ui/theme-tools";
import { ComponentStyleConfig } from "@chakra-ui/react";

const btnTheme = {
  baseStyle: {
    borderRadius: "base",
  },
  sizes: {},
  variants: {
    pagenation: {
      fontSize: "xs",
      p: "2",
      bg: "primary.main.bg",
      _hover: {
        opacity: 0.8,
        color: "primary.reverse.font",
        bg: "primary.reverse.bg",
      },
      _active: {
        opacity: 1,
        color: "primary.reverse.font",
        bg: "primary.reverse.bg",
        cursor: "pointer",
      },
    },
  },
  defaultProps: {},
};

export { btnTheme };
