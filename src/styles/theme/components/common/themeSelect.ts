const themeSelect = {
  sizes: {},
  variants: {
    base: {
      field: {
        px: "0.5rem",
        h: "1.5rem",
        border: "1px solid",
        borderColor: "neutral.gray5",
        borderRadius: "base",
        textStyle: "input",
        fontSize: "xs",
        fontWeight: "regular",
        lineHeight: "1.5rem",
        bgColor: "bg.primary",
        options: {},
      },
      icon: {
        color: "border.input",
      },
    },
    search: {
      field: {
        px: "0.5rem",
        h: "2rem",
        bgColor: "bg.primary",
        border: "1px solid",
        borderColor: "neutral.gray5",
        borderRadius: "base",
        textStyle: "input",
        fontSize: "md",
        lineHeight: "2rem",
        options: {},
      },
      icon: {
        color: "font.placeholder",
      },
    },
    editor: {
      field: {
        px: "0.5rem",
        h: "2rem",
        bgColor: "bg.primary",
        border: "1px solid",
        borderColor: "neutral.gray5",
        borderRadius: "base",
        textStyle: "input",
        fontSize: "md",
        lineHeight: "2rem",
        options: {},
      },
      icon: {
        color: "font.placeholder",
      },
    },
    modalEditor: {
      field: {
        px: "0.5rem",
        w: "100%",
        h: "1.5rem",
        border: "1px solid",
        borderColor: "neutral.gray5",
        borderRadius: "base",
        textStyle: "input",
        fontSize: "sm",
        fontWeight: "regular",
        lineHeight: "1.5rem",
        bgColor: "bg.primary",
        options: {},
        zIndex: "1",
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
      icon: {
        color: "border.input",
        zIndex: "1",
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
};

export default themeSelect;
