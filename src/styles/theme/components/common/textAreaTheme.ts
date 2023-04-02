// Lib
import { extendTheme } from "@chakra-ui/react";

const textAreaTheme = {
  baseStyle: {
    p: "5px 12px",
    bgColor: "neutral.gray1",
    border: "1px solid",
    borderColor: "neutral.gray5",
    borderRadius: "base",
    fontFamily: "main",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: "xs",
    lineHeight: "1.375rem",
  },
  size: {
    base: {
      borderRadius: "base",
      fontFamily: "main",
      fontStyle: "normal",
      fontWeight: "regular",
      fontSize: "xs",
      lineHeight: "1.375rem",
    },
  },
  variants: {
    base: {
      p: "5px 12px",
      bgColor: "neutral.gray1",
      border: "1px solid",
      borderColor: "neutral.gray5",
      _disabled: {},
      _placehold: {},
    },
  },
  defaultProps: {
    size: "base",
    variant: "base",
  },
};

export default textAreaTheme;
