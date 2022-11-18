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
    sideMenu: {},
    searchEngine: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;
      console.log(theme);
      return {
        root: {
          p: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          minW: "180px",
          transition: theme.transition.easing["ease-in"],
        },
        container: {
          border: "none",
        },
        button: {
          justifyContent: "space-between",
          bg: mode(theme.color.custom3, theme.color.custom2)(props),
          borderRadius: theme.radii.basic,
          _hover: {
            bg: mode(theme.color.custom2, theme.color.custom3)(props),
            color: mode(theme.color.custom3, theme.color.custom2)(props),
          },
        },
        icon: {},
      };
    },
    searchEngineSub: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;

      return {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        },
        container: {
          border: "none",
        },
        icon: {},
      };
    },
  },
  defaultProps: { variant: "" },
};

export default accordionTheme;
