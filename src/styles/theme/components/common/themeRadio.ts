const themeRadio = {
  baseStyle: {
    container: {},
    label: {
      position: "relative",
      top: "-1px",
      fontSize: "xs",
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
        borderRadius: "chk",
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
            borderRadius: "chk",
            bgColor: "primary.type7",
          },
          _hover: {
            bgColor: "#FFFFFF",
            borderColor: "border.radio",
          },
        },
        _hover: {
          _before: {
            content: '""',
            display: "inline-block",
            position: "relative",
            w: "0.5rem",
            h: "0.5rem",
            borderRadius: "chk",
            bgColor: "primary.type7",
          },
        },
      },
      label: {
        top: "1px",
        textStyle: "base",
        fontSize: "sm",
        fontWeight: "medium",
        lineHeight: "2rem",
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

export default themeRadio;
