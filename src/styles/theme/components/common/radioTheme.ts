const radioTheme = {
  baseStyle: {
    container: {},
    label: {
      position: "relative",
      top: "-1px",
      fontSize: "xs",
      div: { position: "relative", top: "1px" },
    },
    control: {
      w: "1rem",
      h: "1rem",
    },
    icon: {},
  },
  size: {
    base: {
      container: {},
      label: {},
      control: {
        w: "1rem",
        h: "1rem",
      },
      icon: {},
    },
  },
  variants: {
    search: {
      control: {
        w: "1rem",
        h: "1rem",
        borderRadius: "base",
        borderColor: "border.radio",
        bgColor: "#FFFFFF",
        _checked: {
          bgColor: "#FFFFFF",
          borderColor: "border.radio",
          _before: {
            content: '""',
            display: "inline-block",
            position: "relative",
            w: "0.5rem",
            h: "0.5rem",
            borderRadius: "base",
            bgColor: "primary.type7",
          },
        },
      },
    },
    withTag: {
      control: { display: "none" },
      container: {},
      label: { m: "0px" },
      icon: { display: "none" },
    },
  },
  defaultProps: {
    size: "base",
  },
};

export default radioTheme;
