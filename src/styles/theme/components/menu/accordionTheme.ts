// Lib
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const accordionTheme = {
  baseStyle: {
    root: {},
    container: {},
    button: {},
    panel: {},
    icon: {},
  },
  variants: {
    searchEngine: {
      root: {
        p: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        minW: "180px",
        transition: "0.3s",
      },
      container: {
        border: "none",
        bg: "transparent",
      },
      button: {
        justifyContent: "space-between",
        bg: "primary.main.bg",
        color: "primary.main.font",
        borderRadius: "radii.basic",
        _hover: {
          bg: "primary.main.hover",
          color: "primary.main.font",
        },
        _expanded: {
          mb: "5px",
        },
      },
      panel: {
        display: "flex",
        flexDirection: "column",
        w: "480px",
        bg: "primary.main.bg",
        borderRadius: "radii.basic",
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: "primary.main.font",
      },
      icon: {},
    },
    menuSide: {
      root: {
        minWidth: "200px",
        borderRight: "1px solid",
        borderColor: "primary.main.bdColor",
        color: "primary.main.font",
      },
      container: {
        _first: {
          border: "none",
        },
      },
      button: {},
      panel: {},
      icon: {},
    },
  },
  defaultProps: { variant: "" },
};

export default accordionTheme;
