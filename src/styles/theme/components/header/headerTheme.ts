// Lib
import { defineStyleConfig } from "@chakra-ui/react";
import {
  mode,
  StyleFunctionProps,
  GlobalStyleProps,
  StyleConfig,
} from "@chakra-ui/theme-tools";
import { SystemStyleObject } from "@chakra-ui/system";

const headerTheme: Record<string, StyleConfig> = {
  Header: {
    baseStyle: ({ colorMode }) => ({
      position: "fixed",
      top: "0",
      gap: "10",
      w: "100%",
      h: "inherit",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid",
      backgroundColor: colorMode === "dark" ? "gray.800" : "white",
    }),
  },
};

export default headerTheme;
