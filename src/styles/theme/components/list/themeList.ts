const themeList = {
  baseStyle: {},
  variants: {
    modalMoBileBuilding: {
      container: {
        p: "1.875rem 2.375rem 0",
        h: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        overflowY: "scroll",
        "::-webkit-scrollbar": {
          w: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          borderRadius: "50",
          bg: `#C1C1C1`,
        },
        "::-webkit-scrollbar-track-piece:end": {
          bg: "transparent",
          mb: "3rem",
        },
        "::-webkit-scrollbar-track-piece:start": {
          bg: "transparent",
          mt: "4px",
        },
      },
      item: {
        w: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "2.125rem",
        p: {
          w: "45%",
          textStyle: "base",
          fontSize: "md",
          fontWeight: "strong",
          lineHeight: "1.5rem",
          _last: {
            w: "55%",
            fontWeight: "medium",
          },
        },
      },
    },
  },
  defaultProps: {},
};

export default themeList;
