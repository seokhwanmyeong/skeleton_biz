//  Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
//  Default
import themeReset from "@styles/theme/reset";
//  color
import { selectColorScheme } from "@styles/theme/colors";
//  Component Theme
import themeHeading from "@styles/theme/components/common/themeHeading";
import themeInput from "@styles/theme/components/common/themeInput";
import themeBtn from "@styles/theme/components/common/themeBtn";
import themeTag from "@styles/theme/components/common/themeTag";
import themeCheckbox from "@styles/theme/components/common/themeCheckbox";
import themeAccordion from "@styles/theme/components/menu/themeAccordion";
import themeLink from "@styles/theme/components/common/themeLink";
import themeSelect from "@styles/theme/components/common/themeSelect";
import themeTable from "@styles/theme/components/table/themeTable";
import themeForm from "@styles/theme/components/form/themeForm";
import themeSwitch from "@styles/theme/components/common/themeSwitch";
import themeRadio from "@styles/theme/components/common/themeRadio";
import themeText from "@styles/theme/components/common/themeText";
import themeTextArea from "@styles/theme/components/common/themeTextArea";
import themeDrawer from "@styles/theme/components/modal/themeDrawer";
import themeTabs from "@styles/theme/components/menu/themeTabs";
import themeList from "@styles/theme/components/list/themeList";

const createTheme = (name: string) => {
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };
  const theme = extendTheme({
    config,
    styles: {
      global: themeReset,
    },
    colors: selectColorScheme(name),
    size: {
      tag: {
        option: "1.25rem",
      },
      switch: "50rem",
    },
    fonts: {
      main: "Roboto, sans-serif",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      title: "1.75rem",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      strong: 700,
      heavy: 900,
    },
    lineHeights: {
      normal: "normal",
      base: 1,
      shorter: 1.03,
      short: 1.14,
      tall: 1.19,
      taller: "1.28",
      body: "1.34",
      foot: "1.42",
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    textStyles: {
      base: {
        fontFamily: "main",
        fontStyle: "normal",
      },
      list: {
        title: {
          fontSize: "lg",
          color: "font.primary",
          opacity: 0.8,
        },
        text: {
          fontSize: "lg",
          color: "font.primary",
        },
      },
      input: {
        fontFamily: "main",
        fontStyle: "normal",
        fontWeight: "regular",
        color: "font.title",
      },
      chkBox: {
        fontFamily: "main",
        fontStyle: "normal",
        fontWeight: "regular",
        color: "font.primary",
      },
      h1: {
        fontFamily: "main",
        fontSize: "3xl",
        fontWeight: "strong",
        lineHeight: "shorter",
        letterSpacing: "normal",
      },
      h2: {
        fontFamily: "main",
        fontSize: "2xl",
        fontWeight: "strong",
        lineHeight: "short",
        letterSpacing: "normal",
      },
      h3: {
        fontFamily: "main",
        fontSize: "xl",
        fontWeight: "strong",
        lineHeight: "short",
        letterSpacing: "normal",
      },
      h4: {
        fontFamily: "main",
        fontSize: "lg",
        fontWeight: "strong",
        lineHeight: "tall",
        letterSpacing: "normal",
      },
      h5: {
        fontFamily: "main",
        fontSize: "md",
        fontWeight: "strong",
        lineHeight: "taller",
        letterSpacing: "normal",
      },
      header: {
        menu: {
          fontFamily: "main",
          fontSize: "lg",
          fontWeight: "strong",
          lineHeight: "1.375rem",
          letterSpacing: "normal",
        },
      },
      body: {
        title: {
          fontFamily: "main",
          fontSize: "lg",
          fontWeight: "strong",
          lineHeight: "1.4375rem",
          letterSpacing: "normal",
        },
        regular: {
          fontFamily: "main",
          fontSize: "sm",
          fontWeight: "regular",
          lineHeight: "body",
          letterSpacing: "normal",
        },
        bold: {
          fontFamily: "main",
          fontSize: "sm",
          fontWeight: "medium",
          lineHeight: "body",
          letterSpacing: "normal",
        },
        strong: {
          fontFamily: "main",
          fontSize: "sm",
          fontWeight: "strong",
          lineHeight: "body",
          letterSpacing: "normal",
        },
      },
    },
    radii: {
      base: "4px",
      pagenation: "4px",
      Box: "12px",
      chk: "2px",
    },
    breakpoints: {
      mobile: "320px",
      tablet: "768px",
      pc: "1260px",
    },
    components: {
      Accordion: themeAccordion,
      Checkbox: themeCheckbox,
      Radio: themeRadio,
      Select: themeSelect,
      Heading: themeHeading,
      Link: themeLink,
      Form: themeForm,
      Table: themeTable,
      Button: themeBtn,
      Input: themeInput,
      Tag: themeTag,
      Switch: themeSwitch,
      Drawer: themeDrawer,
      TextArea: themeTextArea,
      Tabs: themeTabs,
      Text: themeText,
      List: themeList,
      // IconButton: {
      //   baseStyle: {},
      //   variants: {
      //     ghost: {
      //       display: "none",
      //       appearance: "none",
      //       alignItems: "center",
      //       justifyContent: "center",
      //       userSelect: "none",
      //       position: "relative",
      //       whiteSpace: "nowrap",
      //       verticalAlign: "middle",
      //       outline: "2px solid transparent",
      //       outlineOffset: "2px",
      //       width: "auto",
      //       lineheight: 1.2,
      //       borderRadius: "base",
      //       p: 0,
      //       height: "fit-content",
      //       fontFamily: "main",
      //       fontStyle: "normal",
      //       fontSize: "md",
      //     },
      //   },
      // },
    },
  });

  return theme;
};

export { createTheme };
