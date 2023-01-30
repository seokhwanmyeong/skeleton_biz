const checkboxTheme = {
  baseStyle: {
    container: {},
    label: {
      fontSize: "1.2rem",
    },
    control: {
      w: "1.2rem",
      h: "1.2rem",
    },
    icon: {},
  },
  variants: {
    withTag: {
      control: { display: "none" },
      container: {},
      label: {},
      icon: { display: "none" },
    },
  },
  defaultProps: {},
};

export default checkboxTheme;
