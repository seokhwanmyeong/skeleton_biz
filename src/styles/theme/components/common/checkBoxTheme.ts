// Lib
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";

const checkboxTheme = {
  baseStyle: {
    control: {},
    container: {},
    label: {},
    icon: {},
  },
  variants: {
    withTag: (props: GlobalStyleProps) => {
      const { colorScheme: c, theme } = props;

      return {
        control: { display: "none" },
        container: {},
        label: {},
        icon: { display: "none" },
      };
    },
  },
  defaultProps: {},
};

export default checkboxTheme;
