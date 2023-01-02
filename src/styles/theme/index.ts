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
import selectTheme from "@styles/theme/components/common/selectTheme";
import themeTable from "@styles/theme/components/table/tableTheme";
//  Foundation
import { fndtSize } from "@src/styles/theme/foundation/fndtSize";
import { fndtRadius } from "@src/styles/theme/foundation/fndtRadius";
import { selectColorScheme } from "@src/styles/theme/foundation/fndtColor";

const createTheme = (name: string) => {
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };
  const theme = extendTheme({
    config,
    styles: {
      global: resetTheme,
    },
    colors: selectColorScheme(name),
    size: fndtSize,
    radii: fndtRadius,
    components: {
      Input: inputTheme,
      Button: btnTheme,
      Tag: tagTheme,
      Accordion: accordionTheme,
      Checkbox: checkboxTheme,
      Select: selectTheme,
      Link: linkTheme,
      Heading: headingTheme,
      Table: themeTable,
    },
  });

  return theme;
};

export { createTheme };
