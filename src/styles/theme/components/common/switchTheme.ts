const switchTheme = {
  variants: {
    view: {
      container: {},
      thumb: {
        transform: "translateX(3.5rem - 1.5rem)",
        _checked: {
          transform: "translateX(2rem)",
        },
      },
      track: {
        w: "4rem",
        h: "1.5rem",
      },
    },
    themeChanger: {
      container: {
        w: "100%",
        h: "100%",
      },
      thumb: {
        // transform: "translateX(3.5rem - 1.5rem)",
        _checked: {
          transform: "translateX(130%)",
        },
        w: "18px",
        h: "18px",
      },
      track: {
        p: 0,
        w: "42px",
        h: "22px",
        alignItems: "center",
        bgColor: "primary.type7",
        _checked: {
          bgColor: "primary.type7",
        },
        // w: "2.625rem",
        // h: "1.5rem",
      },
    },
  },
  defaultProps: {
    variant: "view",
  },
};

export default switchTheme;
