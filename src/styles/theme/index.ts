//  Lib
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
//  Default
import resetTheme from "@styles/theme/reset";
//  color
import { selectColorScheme } from "@src/styles/theme/colors";
//  Common
import headingTheme from "@styles/theme/components/common/headingTheme";
import inputTheme from "@styles/theme/components/common/inputTheme";
import { btnTheme } from "@styles/theme/components/common/btnTheme";
import tagTheme from "@styles/theme/components/common/tagTheme";
import checkboxTheme from "@styles/theme/components/common/checkBoxTheme";
import accordionTheme from "@styles/theme/components/menu/accordionTheme";
import linkTheme from "@styles/theme/components/common/linkTheme";
import selectTheme from "@styles/theme/components/common/selectTheme";
import themeTable from "@styles/theme/components/table/tableTheme";
import formTheme from "@styles/theme/components/form/formTheme";
import switchTheme from "@styles/theme/components/common/switchTheme";
import radioTheme from "@styles/theme/components/common/radioTheme";
import textTheme from "@styles/theme/components/common/textTheme";

const createTheme = (name: string) => {
  const config: ThemeConfig = {
    // initialColorMode: "light",
    useSystemColorMode: false,
  };
  const theme = extendTheme({
    config,
    styles: {
      global: resetTheme,
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
      // main: "Noto Sans KR, sans-serif;",
      // main: "Roboto, sans-serif",
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
        fontSize: "md",
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
        color: "font.primary",
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
      body: {
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
      pc: "1280px",
    },
    components: {
      Accordion: accordionTheme,
      Checkbox: checkboxTheme,
      Radio: radioTheme,
      Select: selectTheme,
      Heading: headingTheme,
      Link: linkTheme,
      Form: formTheme,
      Table: themeTable,
      Button: btnTheme,
      Input: inputTheme,
      Tag: tagTheme,
      Switch: switchTheme,
      Tabs: {
        variants: {
          detailPage: {
            root: {
              w: "100%",
              h: "100%",
            },
            tablist: {
              w: "fit-content",
              gap: "1.5rem",
            },
            tab: {
              position: "relative",
              padding: "0 0.5rem 1rem",
              gap: "0.8125rem",
              transition: "0.3s",
              p: {
                fontFamily: "main",
                fontSize: "xs",
                fontStyle: "normal",
                fontWeight: "regular",
                lineHeight: "1rem",
                color: "font.secondary",
              },
              svg: {
                color: "font.secondary",
                transition: "0.5s",
              },
              _selected: {
                fontWeight: "strong",
                color: "font.primary",
                p: {
                  fontWeight: "strong",
                  color: "font.primary",
                },
                svg: {
                  color: "primary.type7",
                },
                _after: {
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  display: "inline-block",
                  w: "100%",
                  h: "4px",
                  bgColor: "primary.type7",
                },
              },
              _hover: {
                p: {
                  fontWeight: "strong",
                  color: "font.primary",
                },
                svg: {
                  color: "primary.type7",
                  transition: "0.5s",
                },
                _after: {
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  display: "inline-block",
                  w: "100%",
                  h: "4px",
                  bgColor: "primary.type7",
                },
              },
            },
            tabpanels: { w: "100%", h: "100%" },
            tabpanel: {
              overflow: "hidden",
              p: "0",
              w: "100%",
              h: "100%",
            },
          },
        },
      },
      Text: textTheme,
    },
  });

  return theme;
};

export { createTheme };
