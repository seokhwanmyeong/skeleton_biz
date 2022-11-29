// Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import {
  mode,
  GlobalStyleProps,
  StyleFunctionProps,
  StyleConfig,
} from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

// Styles
import globalTheme from "@styles/theme/globalTheme";
import inputTheme from "@styles/theme/components/common/inputTheme";
import btnTheme from "@styles/theme/components/common/btnTheme";
import headerTheme from "@styles/theme/components/header/headerTheme";
import tagTheme from "@styles/theme/components/common/tagTheme";
import checkboxTheme from "@styles/theme/components/common/checkBoxTheme";
import accordionTheme from "@styles/theme/components/menu/accordionTheme";
import { selectColorScheme } from "@styles/theme/color";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: GlobalStyleProps): SystemStyleObject => ({
      textarea: {
        resize: "none",
      },
    }),
  },
  // globalTheme,
  colors: {
    ...selectColorScheme("light"),
    custom1: "#dddddd",
    custom2: "#1a202c",
    custom3: "#fffefee6",
  },
  size: {
    tag: {
      option: "1.25rem",
    },
  },
  radii: {
    basic: "5px",
  },
  transition: {
    basic: "0.5s",
  },
  components: {
    headerTheme,
    Input: inputTheme,
    Button: btnTheme,
    Tag: tagTheme,
    Accordion: accordionTheme,
    Checkbox: checkboxTheme,
  },
});

export default theme;
