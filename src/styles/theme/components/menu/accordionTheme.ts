// Lib
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";

const accordionTheme = {
  baseStyle: (props: GlobalStyleProps) => {
    const { colorScheme: c, theme } = props;

    return {
      root: {},
      container: {},
      button: {},
      panel: {},
      icon: {},
    };
  },
  variants: {
    searchEngine: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;
      return {
        root: {
          p: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          minW: "180px",
          transition: theme.transition.easing["ease-in"],
          backgroundColor: "transparent",
        },
        container: {
          border: "none",
          bg: "transparent",
        },
        button: {
          justifyContent: "space-between",
          bg: theme.colors.primary.main.color,
          color: theme.colors.primary.main.font,
          borderRadius: theme.radii.basic,
          _hover: {
            bg: theme.colors.primary.reverse.hover,
            color: theme.colors.primary.reverse.font,
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
          borderRadius: theme.radii.basic,
          fontSize: "0.8rem",
          fontWeight: "bold",
          color: theme.colors.primary.reverse.font,
        },
        icon: {},
      };
    },
    sideMenu: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;
      return {
        root: {},
        container: {},
        button: {},
        panel: {},
        icon: {},
      };
    },
  },
  defaultProps: { variant: "" },
};

export default accordionTheme;
