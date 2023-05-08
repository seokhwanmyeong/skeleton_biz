const themeBtn = {
  sizes: {
    auto: {
      p: "0.25rem 1rem",
      w: "auto",
      h: "fit-content",
      bg: "primary.type8",
      fontFamily: "main",
      fontStyle: "normal",
      fontSize: "md",
      color: "font.inverse",
      borderRadius: "base",
      _hover: {
        bgColor: "primary.type8",
      },
    },
    page: {
      fontSize: "1.2rem",
      p: 0,
      w: "2rem",
      h: "2rem",
    },
  },
  variants: {
    subMenu: {
      p: "0",
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.25rem",
      lineHeight: "1.4375rem",
      textStyle: "base",
      fontSize: "md",
      fontWeight: "regular",
      color: "font.secondary",
      bgColor: "transparent",
      svg: {
        color: "font.primary",
      },
      _active: {
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
      },
      _hover: {
        bgColor: "transparent",
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
      },
    },
    inputElement: {
      bgColor: "primary.main.bg",
      borderRadius: "base",
      color: "primary.main.font",
      lineHeight: 1.5,
      transition: "0.3s",
      _hover: {
        bgColor: "primary.main.hover",
      },
    },
    pagenation: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      minW: "17.75px",
      w: "auto",
      h: "18.48px",
      borderRadius: "pagenation",
      border: "1px solid",
      borderColor: "transparent",
      fontFamily: "main",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "18.48px",
      color: "font.primary",
      transition: "0.3s",
      _hover: {
        color: "primary.type7",
      },
      _active: {
        cursor: "initial",
        color: "primary.type7",
        borderColor: "primary.type7",
      },
    },
    search: {
      padding: "0 0.984375rem",
      w: "auto",
      h: "2rem",
      gap: "0.5rem",
      textStyle: "base",
      fontSize: "sm",
      fontWeight: "regular",
      lineHeight: "1px",
      _hover: {
        bgColor: "primary.type9",
      },
    },
    filterSearch: {
      padding: "0 0.4375rem",
      w: "auto",
      h: "1.5rem",
      gap: "0.625rem",
      bgColor: "primary.type7",
      textStyle: "base",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1",
      _hover: {
        bgColor: "primary.type7",
      },
    },
    editor: {
      padding: "0 0.984375rem",
      w: "auto",
      h: "2rem",
      gap: "0.5rem",
      bgColor: "transparent",
      border: "1px solid",
      borderColor: "primary.type8",
      textStyle: "base",
      fontSize: "sm",
      fontWeight: "regular",
      lineHeight: "1px",
      color: "primary.type8",
      _hover: {
        bgColor: "primary.type8",
        color: "font.inverse",
      },
      _disabled: {
        _hover: {
          color: "primary.type8",
        },
      },
    },
    linkBtn: {
      p: "0",
      bg: "transparent",
      fontSize: "xs",
      color: "primary.type7",
      _hover: {
        bg: "transparent",
      },
    },
    upload: {
      display: "flex",
      flexDirection: "row",
      p: "5px 16px",
      gap: "8px",
      w: "148px",
      h: "32px",
      bgColor: "bg.primary",
      border: "1px solid",
      borderColor: "border.input",
      boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
      borderRadius: "base",
      flex: "none",
      order: 0,
      flexGrow: 0,
      fontFamily: "main",
      fontStyle: "normal",
      fontWeight: "medium",
      fontSize: "sm",
      lineHeight: "1.375rem",
      color: "#000000D9",
      _hover: {
        color: "#FFFFFF",
        svg: {
          color: "#FFFFFF",
          borderColor: "transparent",
        },
      },
    },
    filterTop: {
      p: 0,
      w: "2rem",
      bg: "none",
      flexDirection: "column",
      justifyContent: "center",
      gap: "0.375rem",
      textStyle: "base",
      fontWeight: "regular",
      fontSize: "sm",
      lineHeight: "1.25rem",
      color: "font.primary",
      div: {
        w: "2rem",
        h: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgColor: "#FFFFFF",
        backdropFilter: "blur(5px)",
        filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: "neutral.gray8",
        borderRadius: "52px",
        transition: "2s",
      },
      _active: {
        bg: "none",
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
      },
      _hover: {
        bg: "none",
        fontWeight: "strong",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
        },
      },
    },
    filterTop02: {
      p: 0,
      minW: "3.25rem",
      flexDirection: "column",
      justifyContent: "center",
      gap: "0.25rem",
      bg: "none",
      textStyle: "base",
      fontWeight: "regular",
      fontSize: "xs",
      lineHeight: "1.0625rem",
      color: "font.primary",
      div: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        w: "2.625rem",
        h: "1.6875rem",
        bg: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
        filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
        backdropFilter: "blur(5px)",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: "neutral.gray8",
        borderRadius: "70px",
      },
      _active: {
        bg: "none",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
          svg: {
            color: "neutral.gray1",
          },
        },
      },
      _hover: {
        bg: "none",
        div: {
          bg: "linear-gradient(180deg, #D4B106 0%, rgba(212, 177, 6, 0) 100%)",
          svg: {
            color: "neutral.gray1",
          },
        },
      },
    },
    filterTopMain: {
      bg: "none",
      textStyle: "base",
      fontWeight: "strong",
      fontSize: "md",
      lineHeight: "1",
      color: "font.secondary",
      _active: {
        bg: "none",
        div: {
          bgColor: "primary.type7",
        },
      },
      _hover: {
        bg: "none",
        div: {
          bgColor: "primary.type7",
        },
      },
    },
    filterInit: {
      m: 0,
      padding: 0,
      w: "auto",
      h: "auto",
      bg: "none",
      flexDirection: "column",
      justifyContent: "center",
      gap: "0.375rem",
      textStyle: "base",
      fontWeight: "regular",
      fontSize: "sm",
      lineHeight: "1.25rem",
      color: "font.primary",
      p: {
        textStyle: "base",
      },
      _active: {
        fontWeight: "strong",
      },
      _hover: {
        bgColor: "none",
        fontWeight: "strong",
      },
    },
    backBtn: {
      position: "absolute",
      top: 0,
      left: "-3rem",
      zIndex: 1,
      gap: "4px",
      bg: "none",
      // fontFamily: 'Vox',
      fontWeight: "strong",
      fontSize: "0.6875rem",
      lineHeight: "0.9375rem",
      p: {
        p: "0 2px",
        bg: "font.title",
        color: "font.inverse",
      },
      svg: {
        color: "font.title",
      },
      _active: {
        bg: "none",
      },
      _hover: {
        bg: "none",
      },
    },
    slctArea: {
      w: "100%",
      minW: "5.5rem",
      h: "1.75rem",
      bgColor: "neutral.gray1",
      border: "1px solid",
      borderColor: "neutral.gray6",
      borderRadius: "base",
      fontWeight: "strong",
      fontSize: "0.75rem",
      lineHeight: 1,
      color: "font.secondary",
      _hover: {
        bgColor: "primary.type7",
        color: "#EDEDED",
      },
    },
    slctUpjong: {
      w: "100%",
      h: "1.75rem",
      bgColor: "neutral.gray1",
      border: "1px solid",
      borderColor: "neutral.gray6",
      borderRadius: "base",
      fontWeight: "strong",
      fontSize: "0.6875rem",
      lineHeight: "normal",
      color: "font.secondary",
      _hover: {
        bgColor: "primary.type7",
        borderColor: "primary.type7",
        color: "#EDEDED",
      },
      _active: {
        color: "#EDEDED",
        bgColor: "primary.type7",
      },
    },
    alert: {
      w: "fit-content",
      h: "2rem",
      gap: "0.5rem",
      textStyle: "base",
      fontSize: "sm",
      fontWeight: "strong",
      lineHeight: "normal",
      bgColor: "primary.type7",
      _hover: {
        bgColor: "primary.type8",
      },
    },
    infoBox: {
      padding: "0 0.5rem",
      w: "auto",
      h: "1.5rem",
      bgColor: "neutral.gray1",
      border: "1px solid",
      borderColor: "neutral.gray6",
      borderRadius: "2px",
      textStyle: "base",
      fontSize: "sm",
      fontWeight: "regular",
      lineHeight: "normal",
      color: "font.secondary",
      p: {
        position: "relative",
        top: "-1px",
        textStyle: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "normal",
        color: "inherit",
      },
      _hover: {
        bgColor: "neutral.gray1",
      },
      _active: {
        bgColor: "primary.type7",
        borderColor: "primary.type7",
        color: "neutral.gray1",
        _hover: {
          bgColor: "primary.type7",
        },
      },
    },
    modalSubmit: {
      p: "0 0.5rem",
      w: "auto",
      h: "2rem",
      gap: "0.625rem",
      bgColor: "primary.type7",
      border: "1px solid",
      borderColor: "primary.type8",
      textStyle: "base",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1",
      _hover: {
        bgColor: "primary.type7",
      },
    },
  },
  defaultProps: {
    size: "auto",
  },
};

export default themeBtn;
