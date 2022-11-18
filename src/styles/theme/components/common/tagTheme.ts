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
          w: "100%",
          bg: mode(theme.color.custom2, theme.color.custom1)(props),
          alignSelf: "auto",
          justifyContent: "space-between",
        },
        label: {
          color: mode(theme.color.custom1, theme.color.custom2)(props),
        },
      };
    },
  },
  defaultProps: {},
};

export default tagTheme;
