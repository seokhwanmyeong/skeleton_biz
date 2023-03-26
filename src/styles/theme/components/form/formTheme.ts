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
    create: {
      container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        label: {
          mr: "4.9rem",
          fontSize: "xs",
          fontWeight: "700",
          color: "font.title",
          lineHeight: "1.5rem",
        },
        p: {
          fontSize: "xs",
          fontWeight: "medium",
          lineHeight: "1.5rem",
          color: "font.title",
        },
      },
    },
  },
  defaultProps: {},
};

export default formTheme;
