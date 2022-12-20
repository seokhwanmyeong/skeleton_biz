const linkTheme = {
  baseStyle: {
    color: "primary.main.font",
    textDecoration: "none",
    outline: "none",
    _hover: {
      fontWeight: "bold",
      textDecoration: "none",
    },
    _active: {
      fontWeight: "bold",
      textDecoration: "none",
    },
  },
  sizes: {},
  variants: {
    linkBtn: {
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      h: "100%",
      p: "0 1rem",
      _after: {
        // content: "attr(data-text)",
        content: 'attr(data-text) / ""',
        h: "0",
        visibility: "hidden",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
        fontWeight: "bold",
      },
    },
  },
  defaultProps: {},
};

export default linkTheme;
