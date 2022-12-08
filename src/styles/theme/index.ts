//  Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { SystemStyleObject } from "@chakra-ui/system";
import { GlobalStyleProps } from "@chakra-ui/theme-tools";
//  Styles
import globalTheme from "@styles/theme/globalTheme";
import inputTheme from "@styles/theme/components/common/inputTheme";
import { btnTheme } from "@styles/theme/components/common/btnTheme";
import headerTheme from "@styles/theme/components/header/headerTheme";
import tagTheme from "@styles/theme/components/common/tagTheme";
import checkboxTheme from "@styles/theme/components/common/checkBoxTheme";
import accordionTheme from "@styles/theme/components/menu/accordionTheme";
import { selectColorScheme } from "@styles/theme/color";

const createTheme = (name: string) => {
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const color = selectColorScheme(name);
  const theme = extendTheme({
    config,
    styles: {
      div: {
        color: "primary.main.font",
        borderColor: "primary.main.bdColor",
      },
      textarea: {
        resize: "none",
      },
    },
    // globalTheme,
    colors: {
      ...color,
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
      Flex: {
        baseStyle: {
          bgColor: "#000000",
        },
      },
    },
  });

  return theme;
};

export { createTheme };
