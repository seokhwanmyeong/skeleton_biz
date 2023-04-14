import { defineStyle } from "@chakra-ui/react";

const themeHeading = {
  baseStyle: {
    mb: 0,
    fontFamily: "Roboto",
    fontStyle: "noemal",
    fontWeight: "strong",
    color: "font.primary",
  },
  variants: {
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
    filterBox: {
      w: "max-content",
      bg: "none",
      fontSize: "sm",
      lineHeight: "1.46",
      color: "font.title",
      textAlign: "left",
    },
    alertTitle: {
      m: 0,
      textStyle: "base",
      fontSize: "md",
      lineHeight: "1.5rem",
      color: "font.title",
    },
  },
};

export default themeHeading;
