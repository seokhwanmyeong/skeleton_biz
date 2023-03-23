const checkboxTheme = {
  baseStyle: {
    container: {},
    label: {
      fontSize: "1.2rem",
      textStyle: "chkBox",
      lineHeight: "1.375rem",
    },
    control: {
      borderColor: "border.chkBox",
      _hover: {
        borderColor: "primary.type6",
        bgColor: "primary.type6",
      },
      _checked: {
        borderColor: "primary.type7",
        bgColor: "primary.type7",
        _hover: {
          borderColor: "primary.type8",
          bgColor: "primary.type8",
        },
      },
    },
    icon: {},
  },
  variants: {
    withTag: {
      control: { display: "none" },
      container: {},
      label: { m: "0px" },
      icon: { display: "none" },
    },
    table: {
      control: {
        borderColor: "border.chkBox",
        _hover: {
          borderColor: "primary.type6",
          bgColor: "primary.type6",
        },
        _checked: {
          borderColor: "primary.type7",
          bgColor: "primary.type7",
          _hover: {
            borderColor: "primary.type8",
            bgColor: "primary.type8",
          },
        },
      },
      container: {},
      label: {},
      icon: {},
    },
  },
  defaultProps: {},
};

export default checkboxTheme;
