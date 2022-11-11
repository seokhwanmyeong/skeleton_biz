// Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

// Styles
import globalTheme from "./globalTheme";
import inputTheme from "./components/inputTheme";
import btnTheme from "./components/btnTheme";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: GlobalStyleProps): SystemStyleObject => ({
      "html, body": {
        // color: mode('black.100', 'white.100')(props),
        // bg: mode('black.100', 'white.100')(props),
      },
      "h1, h2, h3, h4, p, a, span, div": {
        // color: mode('white.100', 'black.100')(props),
      },
      textarea: {
        resize: "none",
      },
      input: {
        color: "#ffffff",
      },
    }),
  },
  // globalTheme,
  color: {
    themeColor: "#ffffff",
  },
  components: {
    Input: inputTheme,
    Button: btnTheme,
    ChakraTag: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        borderRadius: "base",
      },
      variants: {
        base: { p: "0.5rem" },
        s: { w: "0.2rem" },
        sm: { w: "0.4rem" },
        m: { w: "0.6rem" },
        wm: { w: "0.8rem" },
        w: { w: "1rem" },
      },
      defaultProps: {
        variant: "base",
      },
    },
  },
});

export default theme;
