const formTheme = {
  baseStyle: {
    container: {
      label: {
        m: 0,
        textStyle: "base",
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
          display: "flex",
          alignItems: "center",
          flex: "none",
          fontSize: "md",
          fontWeight: "strong",
          color: "font.secondary",
          lineHeight: 1,
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
    modal: {
      container: {
        display: "flex",
        alignItems: "flex-start",
        flex: "none",
        fontFamily: "main",
        fontWeight: "strong",
        fontSize: "xs",
        lineHeight: "1.5rem",
        label: {
          fontSize: "xs",
          fontWeight: "strong",
          color: "font.title",
          lineHeight: "1.5rem",
        },
        p: {
          fontSize: "xs",
          fontWeight: "medium",
          color: "font.title",
          lineHeight: "1.5rem",
        },
      },
    },
  },
  defaultProps: {},
};

export default formTheme;
