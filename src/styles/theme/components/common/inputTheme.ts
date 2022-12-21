// Lib
import { defineStyleConfig } from "@chakra-ui/react";

const inputTheme = defineStyleConfig({
  baseStyle: {
    addon: {},
    field: {},
    element: {},
  },
  sizes: {},
  variants: {
    fileHidden: {
      field: {
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        p: 0,
        pl: "100%",
        w: "100%",
        opacity: 0,
        zIndex: 1,
        cursor: "pointer",
      },
    },
  },
  defaultProps: {},
});

export default inputTheme;
