const themeTable = {
  baseStyle: {
    table: {
      borderColor: "font.primary",
      borderCollapse: "separate",
      borderSpacing: "0 0.5rem",
      position: "relative",
      top: "-0.5rem",
      height: "100%",
    },
    thead: {
      zIndex: "2",
      position: "relative",
      tr: {
        zIndex: "1",
        th: {
          // position: "sticky",
          zIndex: "1",
          top: "0.5rem",
          p: "0.875rem 0 0.9375rem",
          bgColor: "#FFFFFF",
          borderBottom: "0",
          fontFamily: "main",
          fontSize: "xs",
          fontWeight: "strong",
          color: "font.secondary",
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
      _before: {
        zIndex: -1,
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        left: "-0.375rem",
        w: "calc(100% + 0.375rem)",
        h: "100%",
        bgColor: "#FFFFFF",
      },
    },
    tbody: {
      zIndex: "1",
      tr: {
        td: {
          p: "0.8125rem 0.75rem",
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
  variants: {
    base: {
      table: {
        height: "100%",
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
};

export default themeTable;
