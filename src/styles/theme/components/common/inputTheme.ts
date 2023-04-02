const inputTheme = {
  baseStyle: {
    // addon: {},
    field: {
      px: "0.5rem",
      h: "1.5rem",
      background: "#FFFFFF",
      border: "1px solid",
      borderRadius: "base",
      textStyle: "input",
      fontSize: "xs",
      fontWeight: "regular",
      lineHeight: "1.5rem",
      _placeholder: {
        position: "relative",
        top: "1px",
        textStyle: "input",
        fontSize: "xs",
        fontWeight: "regular",
        lineHeight: "1.4rem",
        color: "font.placeholder",
      },
      _focus: {
        bgColor: "bg.primary",
      },
    },
    // element: {},
  },
  sizes: {
    base: {},
  },
  variants: {
    base: {
      field: {
        background: "#FFFFFF",
      },
    },
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
        opacity: 0,
        zIndex: 1,
        cursor: "pointer",
        border: 0,
      },
    },
    form: {},
    pwd: {
      field: {},
    },
  },
  defaultProps: {
    size: "base",
    variants: "base",
  },
};

export default inputTheme;
