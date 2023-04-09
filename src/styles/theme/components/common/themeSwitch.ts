const themeSwitch = {
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
        _checked: {
          transform: "translateX(110%)",
        },
        w: "18px",
        h: "18px",
      },
      track: {
        p: "0 2px",
        w: "38px",
        h: "22px",
        alignItems: "center",
        bgColor: "primary.type7",
        _checked: {
          bgColor: "primary.type7",
        },
      },
    },
    filterControl: {
      container: {},
      thumb: {
        _checked: {
          transform: "translateX(230%)",
          bgColor: "#525252",
        },
        w: "0.75rem",
        h: "0.75rem",
        bgColor: "#525252",
      },
      track: {
        p: "0 1px",
        w: "2.5rem",
        h: "1rem",
        alignItems: "center",
        bgColor: "primary.type3",
        border: "1px solid",
        borderColor: "neutral.gray6",
        _checked: {
          bgColor: "primary.typ3",
        },
      },
    },
  },
  defaultProps: {
    variant: "view",
  },
};

export default themeSwitch;
