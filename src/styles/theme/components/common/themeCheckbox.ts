import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const $size = cssVar("checkbox-size");

const themeCheckbox = {
  baseStyle: {
    container: { fontSize: "xs", lineHeight: "calc(1.375rem)" },
    label: {
      textStyle: "chkBox",
      top: "-1px",
      marginInlineStart: "0.25rem",
    },
    control: {
      w: "1rem",
      h: "1rem",
      borderColor: "border.chkBox",
      _hover: {
        borderColor: "primary.type6",
        bgColor: "primary.type6",
      },
      _checked: {
        borderColor: "primary.type7",
        bgColor: "primary.type7",
        _hover: {
          borderColor: "primary.type8",
          bgColor: "primary.type8",
        },
      },
    },
    icon: {
      w: "80%",
      h: "80%",
    },
  },
  size: {
    base: {
      fontSize: "0.6875rem",
      lineHeight: "1.375rem",
    },
  },
  variants: {
    withTag: {
      control: { display: "none" },
      container: {},
      label: { m: "0px", fontSize: "sm" },
      icon: { display: "none" },
    },
    table: {
      control: {
        borderColor: "border.chkBox",
        _hover: {
          borderColor: "primary.type6",
          bgColor: "primary.type6",
        },
        _checked: {
          borderColor: "primary.type7",
          bgColor: "primary.type7",
          _hover: {
            borderColor: "primary.type8",
            bgColor: "primary.type8",
          },
        },
      },
      container: {},
      label: {
        fontSize: "sm",
      },
      icon: {},
    },
  },
  defaultProps: {
    size: "base",
  },
};

export default themeCheckbox;
