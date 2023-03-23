const themeTable = {
  baseStyle: {
    table: {
      borderColor: "font.primary",
    },
    thead: {
      zIndex: "2",
      tr: {
        zIndex: "1",
        th: {
          position: "sticky",
          zIndex: "1",
          top: 0,
          p: "1.03125rem 1rem",
          bgColor: "bg.thead",
          borderBottom: "0",
          fontFamily: "main",
          fontSize: "xs",
          fontWeight: "strong",
          color: "font.primary",
          textAlign: "left",
          verticalAlign: "middle",
          wordBreak: "keep-all",
          _after: {
            content: '""',
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            w: "1px",
            h: "1.375rem",
            bgColor: "#0000000f",
          },
          _last: {
            _after: {
              display: "none",
            },
          },
        },
      },
    },
    tbody: {
      zIndex: "1",
      tr: {
        td: {
          p: "1.03125rem 1rem",
          bgColor: "bg.primary",
          borderBottom: "1px solid",
          borderColor: "#0000000f",
          fontFamily: "main",
          fontSize: "xs",
          fontWeight: "medium",
          color: "font.primary",
          textAlign: "left",
          verticalAlign: "middle",
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
