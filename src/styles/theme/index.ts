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
import linkTheme from "@styles/theme/components/common/Link";
import selectTheme from "@styles/theme/components/common/selectTheme";
import themeTable from "@styles/theme/components/table/tableTheme";
import formTheme from "@styles/theme/components/form/formTheme";
import switchTheme from "@styles/theme/components/common/switchTheme";
import radioTheme from "@styles/theme/components/common/radioTheme";

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
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      strong: 700,
      heavy: 900
    },
    lineHeights: {
      normal: "normal",
      base: 1,
      shorter: 1.03,
      short: 1.14,
      tall: 1.19,
      taller: "1.28",
      "body": "1.34",
      "foot": "1.42",
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
          color: "primary.main.font",
          opacity: 0.8,
        },
        text: {
          fontSize: "lg",
          color: "primary.main.font",
        },
      },
      h1: {
        fontFamily: 'main',
        fontSize: '3xl',
        fontWeight: 'strong',
        lineHeight: 'shorter',
        letterSpacing: 'normal'
      },
      h2: {
        fontFamily: 'main',
        fontSize: '2xl',
        fontWeight: 'strong',
        lineHeight: 'short',
        letterSpacing: 'normal'
    },
      h3: {
        fontFamily: 'main',
        fontSize: 'xl',
        fontWeight: 'strong',
        lineHeight: 'short',
        letterSpacing: 'normal'
    },
      h4: {
        fontFamily: 'main',
        fontSize: 'lg',
        fontWeight: 'strong',
        lineHeight: 'tall',
        letterSpacing: 'normal'
      },
      h5: {
        fontFamily: 'main',
        fontSize: 'md',
        fontWeight: 'strong',
        lineHeight: 'taller',
        letterSpacing: 'normal'
      },
      body: {
        regular: {
          fontFamily: 'main',
          fontSize: 'sm',
          fontWeight: 'regular',
          lineHeight: 'body',
          letterSpacing: 'normal'
        },
        bold: {
          fontFamily: 'main',
          fontSize: 'sm',
          fontWeight: 'medium',
          lineHeight: 'body',
          letterSpacing: 'normal'
        },
        strong: {
          fontFamily: 'main',
          fontSize: 'sm',
          fontWeight: 'strong',
          lineHeight: 'body',
          letterSpacing: 'normal'
        },
      }
    },
    radii: {
      base: "0.5rem",
    },
    breakpoints: {
      mobile: "320px",
      tablet: "768px",
      pc: "1280px",
    },
    components: {
      Input: inputTheme,
      Button: btnTheme,
      Tag: tagTheme,
      Accordion: accordionTheme,
      Checkbox: checkboxTheme,
      Radio: radioTheme,
      Select: selectTheme,
      Link: linkTheme,
      Heading: headingTheme,
      Table: themeTable,
      Form: formTheme,
      Switch: switchTheme,
      Tabs: {
        variants: {
          detailPage: {
            root: {
              w: "100%",
            },
            tablist: {
              w: "100%",
              justifyContent: "flex-start",
              borderBottom: "1px solid #DEDEDE",
            },
            tab: {
              p: "0.5rem 3rem",
              borderTop: "1px solid",
              borderRight: "1px solid",
              borderColor: "#DEDEDE",
              color: "primary.main.font",
              _first: {
                borderLeft: "1px solid",
                borderLeftRadius: "base",
                borderBottomRadius: "0",
                borderColor: "#DEDEDE",
              },
              _last: {
                borderRightRadius: "base",
                borderBottomRadius: "0",
                borderColor: "#DEDEDE",
              },
              _selected: {
                backgroundColor: "primary.reverse.bg",
                fontWeight: "bold",
                color: "primary.reverse.font",
              },
            },
            tabpanels: {},
            tabpanel: {
              p: "3rem",
            },
          },
        },
      },
    },
  });

  return theme;
};

export { createTheme };
