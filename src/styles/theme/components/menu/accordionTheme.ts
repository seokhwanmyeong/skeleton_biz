// Lib
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const accordionTheme = {
  baseStyle: {
    root: {
      fontFamily: "main",
    },
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
        gap: "0.5rem",
        minW: "30rem",
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
          mb: "0.5rem",
        },
      },
      panel: {
        display: "flex",
        flexDirection: "column",
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
        minWidth: "20rem",
        borderRight: "1px solid",
        borderColor: "primary.main.bdColor",
        color: "primary.main.font",
      },
      container: {
        _first: {
          border: "none",
        },
      },
      button: {
        p: "1rem 2rem",
        fontSize: "1.6rem",
      },
      panel: {},
      icon: {},
    },
    dashboardRent: {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        h: "100%",
        color: "font.primary",
      },
      container: {},
      button: {
        p: "0rem 0.5rem",
        h: "2.5em",
        border: "1px solid",
        borderRadius: "base",
        borderColor: "rgba(0, 0, 0, 0.15)",
        fontSize: "xs",
        fontWeight: "strong",
        color: "rgba(38, 35, 35, 0.5)",
        _expanded: {
          borderRadius: "2px 2px 0 0",
          borderBottom: "none",
          color: "font.primary",
          _hover: {
            bg: "transparent",
          },
        },
      },
      panel: {
        p: "0 1rem 1rem 0.5rem",
        position: "relative",
        top: "-1px",
        color: "font.primary",
        border: "1px solid",
        borderTop: "none",
        borderRadius: "0 0 2px 2px",
        borderColor: "rgba(0, 0, 0, 0.15)",
        _expanded: {},
      },
      icon: {},
    },
  },
  defaultProps: { variant: "" },
};

export default accordionTheme;
