const formTheme = {
  baseStyle: {
    container: {
      label: {
        m: 0,
        fontFamily: "main",
        fontStyle: "normal",
        color: "font.primary",
      },
    },
  },
  sizes: {},
  variants: {
    search: {
      container: {
        display: "flex",
        flexDirection: "row",
        label: {
          fontSize: "xs",
          fontWeight: "strong",
          color: "font.secondary",
        },
      },
    },
  },
  defaultProps: {},
};

export default formTheme;
