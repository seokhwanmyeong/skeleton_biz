import { extendTheme } from "@chakra-ui/react";

const selectTheme = {
  sizes: {},
  variants: {
    base: {
      field: {
        px: "0.5rem",
        h: "1.5rem",
        border: "1px solid",
        borderColor: "border.input",
        borderRadius: "base",
        textStyle: "input",
        fontSize: "sm",
        lineHeight: "1.5rem",
      },
      icon: {
        color: "border.input",
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
};

export default selectTheme;
