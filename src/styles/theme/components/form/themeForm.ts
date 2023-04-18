const themeForm = {
  baseStyle: {
    container: {
      label: {
        m: 0,
        textStyle: "base",
        color: "font.primary",
      },
      p: {
        textStyle: "base",
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
        alignItems: "center",
        gap: "2rem",
        label: {
          display: "flex",
          minW: "3.75rem",
          flex: "none",
          fontSize: "md",
          fontWeight: "strong",
          lineHeight: "2rem",
          color: "font.title",
        },
        p: {
          fontSize: "md",
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

export default themeForm;