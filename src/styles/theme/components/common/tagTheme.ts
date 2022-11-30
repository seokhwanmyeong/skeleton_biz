// Lib
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";

const tagTheme = {
  baseStyle: {
    container: {
      alignSelf: "baseline",
      border: "none",
    },
    label: {},
    closeButton: {},
  },
  variants: {
    filterOption: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;
      return {
        container: {
          w: "auto",
          bg: mode(theme.colors.custom2, theme.colors.custom1)(props),
          alignSelf: "baseline",
          justifyContent: "space-between",
        },
        label: {
          color: mode(theme.colors.custom1, theme.colors.custom2)(props),
        },
      };
    },
    checkbox: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;

      return {
        container: {
          w: "auto",
          bg: mode(theme.colors.custom2, theme.colors.custom1)(props),
          alignSelf: "baseline",
          justifyContent: "space-between",
        },
        label: {
          color: mode(theme.colors.custom1, theme.colors.custom2)(props),
        },
      };
    },
  },
  defaultProps: {},
};

export default tagTheme;
