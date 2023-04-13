const themeLink = {
  baseStyle: {
    textStyle: "base",
    color: "font.primary",
    textDecoration: "none",
    outline: "none",
    lineHeight: "normal",
    _hover: {
      fontWeight: "strong",
      textDecoration: "none",
    },
  },
  sizes: {},
  variants: {
    headMenuOff: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.75rem",
      h: "100%",
      textStyle: "header.menu",
      color: "font.placeholder",
      _hover: {
        fontWeight: "strong",
        color: "primary.type7",
        svg: { color: "primary.type7" },
      },
    },
    headMenuOn: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.75rem",
      h: "100%",
      textStyle: "header.menu",
      color: "primary.type7",
      cursor: "default",
    },
  },
  defaultProps: {},
};

export default themeLink;
