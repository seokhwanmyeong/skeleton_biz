const themeHeading = {
  baseStyle: {
    mb: 0,
    textStyle: "base",
    fontWeight: "strong",
    fontStyle: "normal",
    color: "font.primary",
  },
  variants: {
    loginHead: {
      fontSize: "3.75rem",
      fontWeight: "heavy",
      lineHeight: 1,
      color: "#262323cc",
    },
    serviceName: {
      fontSize: "xs",
      fontWeight: "heavy",
    },
    subMenu: {
      fontSize: "1.7rem",
      lineHeight: "1.875rem",
      color: "font.primary",
      textAlign: "center",
      opacity: 0.8,
    },
    outlet: {
      textStyle: {
        pc: "body.title",
        tablet: "body.title",
        mobile: "body.title",
      },
      color: "font.primary",
    },
    cardTitle: {
      w: "auto",
      textAlign: "center",
      fontWeight: "regular",
      fontSize: "md",
      lineHeight: "normal",
      color: "font.secondary",
    },
    sectionTitle: {
      fontSize: "1rem",
      color: "font.primary",
    },
    detailTitle: {
      m: 0,
      fontSize: "1.5rem",
      lineHeight: "1.375rem",
      color: "font.primary",
    },
    sigunguTitle: {
      flexShrink: 0,
      w: "fit-content",
      fontSize: "xs",
      lineHeight: "1.05rem",
      letterSpacing: "2.66667px",
      color: "rgba(38, 35, 35, 0.8)",
    },
  },
};

export default themeHeading;
