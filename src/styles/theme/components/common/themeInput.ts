const themeInput = {
  baseStyle: {
    // addon: {},
    field: {
      px: "0.5rem",
      h: "1.5rem",
      background: "#FFFFFF",
      border: "1px solid",
      borderColor: "neutral.gray5",
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
  },
  sizes: {
    base: {
      textStyle: "base",
    },
  },
  variants: {
    base: {
      field: {
        background: "#FFFFFF",
        borderColor: "neutral.gray5",
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
    search: {
      field: {
        h: "2rem",
        fontSize: "md",
        lineHeight: "2rem",
        _placeholder: {
          fontSize: "sm",
          lineHeight: "2rem",
        },
      },
    },
    editor: {
      field: {
        h: "2rem",
        fontSize: "md",
        lineHeight: "2rem",
        _placeholder: {
          fontSize: "sm",
          lineHeight: "2rem",
        },
      },
    },
    modalEditor: {
      field: {
        zIndex: "1",
        w: "100%",
        h: "1.5rem",
        bgColor: "neutral.gray1",
        border: "1px solid",
        borderColor: "neutral.gray5",
        textStyle: "base",
        fontSize: "sm",
        fontWeight: "regular",
        _hover: { borderColor: "primary.type6" },
        _focus: {
          borderColor: "primary.type6",
          boxShadow: "none",
        },
        _focusVisible: {
          borderColor: "primary.type6",
          boxShadow: "none",
        },
        _invalid: {
          boxShadow: "none",
          borderColor: "system.default.red",
        },
        _autofill: {
          boxShadow: "0 0 0px 1000px #FFFFFF inset",
        },
        _placeholder: {
          fontSize: "sm",
          color: "font.placeholder",
        },
      },
    },
    addr: {
      field: {
        zIndex: "1",
        w: "100%",
        h: "1.5rem",
        bgColor: "neutral.gray3",
        border: "1px solid",
        borderColor: "neutral.gray5",
        textStyle: "base",
        fontSize: "sm",
        fontWeight: "regular",
        _hover: { borderColor: "primary.type6" },
        _focus: {
          borderColor: "primary.type6",
          boxShadow: "none",
        },
        _focusVisible: {
          borderColor: "primary.type6",
          boxShadow: "none",
        },
        _invalid: {
          boxShadow: "none",
          borderColor: "system.default.red",
        },
        _autofill: {
          boxShadow: "0 0 0px 1000px #FFFFFF inset",
        },
        _placeholder: {
          fontSize: "sm",
          color: "font.placeholder",
        },
        _disabled: {
          cursor: "pointer",
        },
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

export default themeInput;
