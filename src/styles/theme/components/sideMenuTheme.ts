// Lib
import { extendTheme } from "@chakra-ui/react";
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

const sideMenuTheme = extendTheme({
  components: {
    Accordion: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    AccordionItem: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    AccordionButton: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    AccordionPanel: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    AccordionIcon: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
  },
});

export default sideMenuTheme;
