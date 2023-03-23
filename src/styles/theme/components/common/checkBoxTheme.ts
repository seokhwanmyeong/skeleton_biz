import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const $size = cssVar("checkbox-size");

const checkboxTheme = {
  baseStyle: {
    container: { fontSize: "sm" },
    label: {
      fontSize: "sm",
      lineHeight: "1.375rem",
      textStyle: "chkBox",
    },
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
    icon: {},
  },
  variants: {
    withTag: {
      control: { display: "none" },
      container: {},
      label: { m: "0px" },
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
      label: {},
      icon: {},
    },
  },
  defaultProps: {},
};

export default checkboxTheme;
