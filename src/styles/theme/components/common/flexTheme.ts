// Lib
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";

const tagTheme = {
  baseStyle: (props: GlobalStyleProps) => {
    console.log(props);

    return {
      backgroundColor: "primary.main.bg",
    };
  },
  variants: {},
  defaultProps: {},
};

export default tagTheme;
