const themeText = {
  sizes: {},
  variants: {
    outlet: {
      textStyle: "base",
      fontWeight: "regular",
      fontSize: "md",
      color: "font.secondary",
    },
    search: {
      fontWeight: "regular",
      fontSize: "xs",
      color: "#FFFFFF",
    },
    cardContent: {
      w: "auto",
      textStyle: "base",
      textAlign: "center",
      fontWeight: "regular",
      fontSize: "1.25rem",
      lineHeight: "2rem",
      color: "font.title",
    },
    detailSub: {
      fontWeight: "regular",
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      color: "#26232380",
    },
    sectionSub: {
      fontFamily: "main",
      fontStyle: "normal",
      fontWeight: "regular",
      fontSize: "xs",
      color: "font.section.sub",
    },
    filterTopArea: {
      textAlign: "center",
      fontWeight: "strong",
      fontSize: "xs",
      lineHeight: 1,
      color: "#26232380",
      textShadow: "0px 6.4px 6.4px rgba(0, 0, 0, 0.25)",
    },
    textArea: {
      p: "5px 12px",
    },
  },
  defaultProps: {},
};

export default themeText;
