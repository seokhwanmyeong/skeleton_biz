const themeTable = {
  baseStyle: {
    table: {
      // border: "1px solid",
      borderColor: "primary.main.bdColor",
    },
    thead: {
      tr: {
        bgColor: "#000000",
        th: {
          color: "primary.main.font",
          bgColor: "primary.main.bg",
          // border: "1px solid",
          // borderColor: "primary.main.bdColor",
          textAlign: "center",
        },
        _even: {
          th: {
            bgColor: "primary.main.bg",
            // border: "1px solid",
            // borderColor: "primary.main.bdColor",
          },
        },
      },
    },
    tbody: {
      tr: {
        td: {
          fontSize: "1.2rem",
          bgColor: "primary.main.bg",
          // border: "1px solid",
          // borderColor: "primary.main.bdColor",
          textAlign: "center",
          color: "primary.main.font",
        },
      },
    },
    tfoot: {
      tr: {
        th: {
          color: "primary.main.font",
          bgColor: "primary.main.bg",
          // border: "1px solid",
          // borderColor: "primary.main.bdColor",
          textAlign: "center",
        },
      },
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
};

export default themeTable;
