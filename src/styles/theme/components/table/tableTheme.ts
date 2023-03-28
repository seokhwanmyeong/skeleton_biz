const themeTable = {
  baseStyle: {
    table: {
      borderColor: "font.primary",
      borderCollapse: "separate",
      borderSpacing: "0 0.5rem",
    },
    thead: {
      zIndex: "2",
      tr: {
        zIndex: "1",
        th: {
          position: "sticky",
          zIndex: "1",
          top: 0,
          p: "1.1875rem 0 0.6875rem",
          bgColor: "inherit",
          borderBottom: "0",
          fontFamily: "main",
          fontSize: "xs",
          fontWeight: "strong",
          color: "font.primary",
          textAlign: "center",
          verticalAlign: "middle",
          wordBreak: "keep-all",
          // _after: {
          //   content: '""',
          //   position: "absolute",
          //   top: "50%",
          //   right: 0,
          //   transform: "translateY(-50%)",
          //   w: "1px",
          //   h: "1.375rem",
          //   bgColor: "#0000000f",
          // },
          // _last: {
          //   _after: {
          //     display: "none",
          //   },
          // },
        },
      },
    },
    tbody: {
      zIndex: "1",
      tr: {
        td: {
          p: "1.03125rem 1rem",
          bgColor: "inherit",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "#0000000f",
          fontFamily: "main",
          fontSize: "xs",
          fontWeight: "medium",
          color: "font.primary",
          textAlign: "center",
          verticalAlign: "middle",
          _first: {
            borderLeft: "1px solid #0000000f",
            borderRadius: "10.6749px 0 0 10.6749px",
          },
          _last: {
            borderRight: "1px solid #0000000f",
            borderRadius: "0 10.6749px 10.6749px 0",
          },
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
