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
        backgroundColor: "transparent",
      },
      container: {
        border: "none",
        bg: "transparent",
      },
      button: {
        justifyContent: "space-between",
        bg: "primary.main.color",
        color: "primary.main.font",
        borderRadius: "radii.basic",
        _hover: {
          bg: "primary.reverse.hover",
          color: "primary.reverse.font",
        },
        _expanded: {
          mb: "5px",
        },
      },
      panel: {
        display: "flex",
        flexDirection: "column",
        w: "480px",
        bg: "transparent",
        borderRadius: "radii.basic",
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: "primary.reverse.font",
      },
      icon: {},
    },
    sideMenu: {
      root: {
        minWidth: "200px",
        borderRight: "1px solid",
        borderColor: "primary.main.bdColor",
        color: "primary.main.font",
      },
      container: {},
      button: {},
      panel: {},
      icon: {},
    },
  },
  defaultProps: { variant: "" },
};

export default accordionTheme;
