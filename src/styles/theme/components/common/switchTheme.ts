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
    filterControl: {
      container: {
        // w: "100%",
        // h: "100%",
      },
      thumb: {
        // transform: "translateX(3.5rem - 1.5rem)",
        _checked: {
          transform: "translateX(140%)",
          bgColor: "#525252",
        },
        w: "14px",
        h: "14px",
        bgColor: "#525252",
      },
      track: {
        p: "2px",
        w: "34px",
        h: "15px",
        alignItems: "center",
        bgColor: "#FFFFFF",
        border: "1px solid",
        borderColor: "neutral.gray6",
        _checked: {
          bgColor: "primary.type3",
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
