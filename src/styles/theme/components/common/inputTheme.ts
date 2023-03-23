const inputTheme = {
  baseStyle: {
    // addon: {},
    field: {
      px: "0.5rem",
      h: "1.5rem",
      border: "1px solid",
      borderRadius: "base",
      textStyle: "input",
      fontSize: "0.8125rem",
      fontWeight: "regular",
      lineHeight: "1.5rem",
    },
    // element: {},
  },
  sizes: {
    base: {},
  },
  variants: {
    base: {},
    fileHidden: {
      field: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        m: 0,
        p: 0,
        pl: "100%",
        w: "100%",
        h: "100%",
        borderRadius: "base",
        opacity: 0.5,
        zIndex: 1,
        cursor: "pointer",
        border: "1px dashed",
        borderColor: "primary.main.bdColor",
        _hover: {
          border: "1px dashed",
          opacity: 1,
        },
      },
    },
    form: {},
  },
  defaultProps: {
    size: "base",
    variants: "base",
  },
};

export default inputTheme;
