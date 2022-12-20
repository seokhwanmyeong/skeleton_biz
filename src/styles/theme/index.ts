//  Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
//  Default
import resetTheme from "@styles/theme/reset";
//  Common
import headingTheme from "@styles/theme/components/common/headingTheme";
import inputTheme from "@styles/theme/components/common/inputTheme";
import { btnTheme } from "@styles/theme/components/common/btnTheme";
import tagTheme from "@styles/theme/components/common/tagTheme";
import checkboxTheme from "@styles/theme/components/common/checkBoxTheme";
import accordionTheme from "@styles/theme/components/menu/accordionTheme";
import linkTheme from "@styles/theme/components/common/Link";
import { selectColorScheme } from "@src/styles/theme/foundation/color";
//  Component
import headerTheme from "@styles/theme/components/header/headerTheme";

const createTheme = (name: string) => {
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const color = selectColorScheme(name);
  const theme = extendTheme({
    config,
    styles: {
      ...resetTheme,
    },
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
      // headerTheme,
      Input: inputTheme,
      Button: btnTheme,
      Tag: tagTheme,
      Accordion: accordionTheme,
      Checkbox: checkboxTheme,
      Link: linkTheme,
      Heading: headingTheme,
    },
  });

  return theme;
};

export { createTheme };
