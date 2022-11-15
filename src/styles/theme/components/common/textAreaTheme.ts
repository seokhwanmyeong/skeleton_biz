// Lib
import { extendTheme } from "@chakra-ui/react";
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

const textAreaTheme = extendTheme({
  components: {
    Textarea: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {},
    },
  },
});

export default textAreaTheme;
