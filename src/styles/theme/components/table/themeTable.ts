const themeTable = {
  baseStyle: {
    table: {
      borderColor: "font.primary",
      borderCollapse: "separate",
      borderSpacing: "0 0.5rem",
      position: "relative",
      top: "calc(-0.5rem - 4px)",
      height: "100%",
    },
    thead: {
      zIndex: "2",
      position: "relative",
      tr: {
        zIndex: "1",
        th: {
          zIndex: "1",
          position: "sticky",
          top: "0.75rem",
          p: "0 0 0.75rem",
          bgColor: "#FFFFFF",
          borderBottom: "0",
          textStyle: "base",
          fontSize: "md",
          fontWeight: "strong",
          lineHeight: "1",
          color: "font.secondary",
          textAlign: "center",
          verticalAlign: "middle",
          wordBreak: "keep-all",
          _before: {
            zIndex: -1,
            content: '""',
            display: "block",
            position: "absolute",
            top: "-1rem",
            w: "calc(100%)",
            h: "100%",
            bgColor: "#FFFFFF",
          },
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
          p: "0.5rem 0",
          minH: "2.5rem",
          bgColor: "inherit",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "neutral.gray6",
          textStyle: "base",
          fontSize: "sm",
          fontWeight: "regular",
          lineHeight: "0.9375rem",
          color: "font.title",
          textAlign: "center",
          verticalAlign: "middle",
          _first: {
            borderLeft: "1px solid",
            borderRadius: "10.6749px 0 0 10.6749px",
            borderColor: "neutral.gray6",
          },
          _last: {
            borderRight: "1px solid",
            borderRadius: "0 10.6749px 10.6749px 0",
            borderColor: "neutral.gray6",
          },
        },
      },
    },
    tfoot: {
      tr: {
        th: {
          color: "primary.main.font",
          bgColor: "primary.main.bg",
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
