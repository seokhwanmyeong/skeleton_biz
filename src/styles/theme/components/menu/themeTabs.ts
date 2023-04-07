const themeTabs = {
  variants: {
    detailPage: {
      root: {
        w: "100%",
        h: "100%",
      },
      tablist: {
        w: "fit-content",
      },
      tab: {
        position: "relative",
        padding: "0 1rem 1rem",
        gap: "0.8125rem",
        textStyle: "base",
        fontSize: "md",
        fontWeight: "regular",
        color: "font.secondary",
        transition: "0.3s",
        svg: {
          color: "inherit",
          transition: "0.5s",
        },
        p: {
          position: "relative",
          textStyle: "base",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "1rem",
          color: "inherit",
          transition: "all 0.1s",
        },
        _after: {
          content: '""',
          position: "absolute",
          bottom: "0px",
          display: "inline-block",
          w: "100%",
          h: "4px",
          opacity: 0,
          bgColor: "primary.type7",
          transition: "all linear 0.3s 0s",
        },
        _selected: {
          fontWeight: "strong",
          color: "font.primary",
          p: {
            fontWeight: "strong",
            color: "font.primary",
          },
          svg: {
            color: "primary.type7",
          },
          _after: {
            opacity: 1,
          },
        },
        _hover: {
          p: {
            fontWeight: "strong",
            color: "font.primary",
          },
          svg: {
            color: "primary.type7",
            transition: "0.5s",
          },
          _after: {
            opacity: 1,
          },
        },
      },
      tabpanels: { w: "100%", h: "100%" },
      tabpanel: {
        overflow: "hidden",
        p: "0",
        w: "100%",
        h: "100%",
      },
    },
    upjongBox: {
      root: {
        w: "100%",
        h: "100%",
      },
      tablist: {
        w: "100%",
      },
      tab: {
        position: "relative",
        padding: "0rem 0rem 0.375rem",
        w: "100%",
        gap: "0.4rem",
        transition: "0.3s",
        p: {
          fontFamily: "main",
          fontSize: "xs",
          fontStyle: "normal",
          fontWeight: "regular",
          lineHeight: "1rem",
          color: "font.disabled",
        },
        _selected: {
          fontWeight: "strong",
          color: "font.primary",
          p: {
            fontWeight: "strong",
            color: "font.primary",
          },
          _after: {
            content: '""',
            position: "absolute",
            bottom: "0px",
            display: "inline-block",
            w: "100%",
            h: "1px",
            bgColor: "primary.type7",
          },
        },
        _disabled: {
          p: {
            fontWeight: "strong",
            color: "font.primary",
          },
          _after: {
            display: "none",
          },
        },
        _hover: {
          p: {
            fontWeight: "strong",
            color: "font.primary",
          },
          _after: {
            content: '""',
            position: "absolute",
            bottom: "0px",
            display: "inline-block",
            w: "100%",
            h: "1px",
            bgColor: "primary.type7",
          },
        },
      },
      tabpanels: { w: "100%", h: "100%" },
      tabpanel: {
        overflow: "hidden",
        p: "1.3125rem 1.1875rem 0.875rem",
        // w: "100%",
        w: "29.5rem",
        minW: "20rem",
        h: "100%",
        minH: "9.375rem",
      },
    },
  },
};

export default themeTabs;
