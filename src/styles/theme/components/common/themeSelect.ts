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
  },
  defaultProps: {
    variant: "base",
  },
};

export default themeSelect;
