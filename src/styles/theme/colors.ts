type Colors = {
  primary: {};
  secondary: {};
  system: {};
  font: {};
  bg: {};
  border: {};
  neutral: {};
};

export const selectColorScheme = (type: string) => {
  const primary: { [key: string]: {} } = {
    type1: "#FEFFE6",
    type2: "#FFFFB8",
    type3: "#FFFB8F",
    type4: "#FFF566",
    type5: "#FFEC3D",
    type6: "#FADB14",
    type7: "#D4B106",
    type8: "#AD8B00",
    type9: "#876800",
    type10: "#614700",
  };
  const secondary: { [key: string]: {} } = {
    second1: {
      type1: "#E6FFFB",
      type2: "#B5F5EC",
      type3: "#87E8DE",
      type4: "#5CDBD3",
      type5: "#36CFC9",
      type6: "#13C2C2",
      type7: "#08979C",
      type8: "#006D75",
      type9: "#00474F",
      type10: "#002329",
    },
    secon2: {
      type1: "#FFF2E8",
      type2: "#FFD8BF",
      type3: "#FFBB96",
      type4: "#FF9C6E",
      type5: "#FF7A45",
      type6: "#FA541C",
      type7: "#D4380D",
      type8: "#AD2102",
      type9: "#871400",
      type10: "#610B00",
    },
  };
  const colorTheme: { [key: string]: Colors } = {
    light: {
      primary: {
        main: {
          color: "#ffffff",
          bg: "#ffffff",
          hover: "#dddddd",
          font: "#1a202c",
          bdColor: "#ededed",
        },
        reverse: {
          color: "#1a202c",
          bg: "#1a202c",
          hover: "#555555",
          font: "#ffffff",
          bdColor: "#ededed",
        },
      },
      secondary: {
        main: {
          color: "#ffffff",
          hover: "#dddddd",
          font: "#1a202c",
          bdColor: "ededed",
        },
        reverse: {
          color: "#1a202c",
          hover: "#555555",
          font: "#ffffff",
          bdColor: "ededed",
        },
      },
      bg: {
        primary: "#FFFFFF",
        deco: "#FFFFFF",
        inverse: "#000000",
        thead: "#FAFAFA",
      },
      border: {
        input: "#D9D9D9",
        chkBox: "#D9D9D9",
      },
      font: {
        inverse: "#FFFFFF",
        title: "#000000CC",
        primary: "#000000CC",
        secondary: "#00000080",
        disabled: "#00000040",
        placeholder: "#00000040",
      },
      system: {
        default: {
          red: "#FF3B30",
          orange: "#FF9500",
          yellow: "#FFCC00",
          green: "#34C759",
          teal: "#5AC8FA",
          blue: "#007AFF",
          indigo: "#5856D6",
          pulple: "#AF52DE",
          pink: "#FF2D55",
          gray: {
            type1: "#8E8E93",
            type2: "#AEAEB2",
            type3: "#C7C7CC",
            type4: "#D1D1D6",
            type5: "#E5E5EA",
            type6: "#F2F2F7",
          },
        },
        accessible: {
          red: "#D70015",
          orange: "#C93400",
          yellow: "#B25000",
          green: "#248A3D",
          teal: "#0071A4",
          blue: "#0040DD",
          indigo: "#3634A3",
          pulple: "#8944AB",
          pink: "#D30F45",
          gray: {
            type1: "#6C6C70",
            type2: "#8E8E93",
            type3: "#AEAEB2",
            type4: "#BCBCC0",
            type5: "#D8D8DC",
            type6: "#EBEBF0",
          },
        },
      },
      neutral: {
        gray1: "#FFFFFF",
        gray2: "#FAFAFA",
        gray3: "#F5F5F5",
        gray4: "#F0F0F0",
        gray5: "#D9D9D9",
        gray6: "#BFBFBF",
        gray7: "#8C8C8C",
        gray8: "#595959",
        gray9: "#434343",
        gray10: "#262626",
        gray11: "#1F1F1F",
        gray12: "#141414",
        gray13: "#000000",
      },
    },
    dark: {
      primary: {
        main: {
          color: "#1a202c",
          bg: "#1a202c",
          hover: "#555555",
          font: "#ffffff",
          bdColor: "#ededed",
        },
        reverse: {
          color: "#ffffff",
          bg: "#ffffff",
          hover: "#dddddd",
          font: "#1a202c",
          bdColor: "#ededed",
        },
      },
      secondary: {
        main: {
          color: "#1a202c",
          hover: "#555555",
          font: "#ffffff",
          bdColor: "#ededed",
        },
        reverse: {
          color: "#ffffff",
          hover: "#dddddd",
          font: "#1a202c",
          bdColor: "#ededed",
        },
      },
      bg: {
        primary: "#242426",
        deco: "#242426",
        inverse: "#FFFFFF",
        thead: "#1a1a1a",
      },
      border: {
        input: "#D9D9D9",
        chkBox: "#D9D9D9",
      },
      font: {
        inverse: "#FFFFFF",
        title: "#ffffff",
        primary: "#ffffff",
        secondary: "#ffffff",
        disabled: "#ffffff",
        placeholder: "#ffffff",
      },
      system: {
        default: {
          red: "#FF3B30",
          orange: "#FF9500",
          yellow: "#FFCC00",
          green: "#34C759",
          teal: "#5AC8FA",
          blue: "#007AFF",
          indigo: "#5856D6",
          pulple: "#AF52DE",
          pink: "#FF2D55",
          gray: {
            type1: "#8E8E93",
            type2: "#AEAEB2",
            type3: "#C7C7CC",
            type4: "#D1D1D6",
            type5: "#E5E5EA",
            type6: "#F2F2F7",
          },
        },
        accessible: {
          red: "#FF6961",
          orange: "#FFB340",
          yellow: "#FFD426",
          green: "#30DB5B",
          teal: "#70D7FF",
          blue: "#409CFF",
          indigo: "#7D7AFF",
          pulple: "#DA8FFF",
          pink: "#FF6482",
          gray: {
            type1: "#AEAEB2",
            type2: "#7C7C80",
            type3: "#545456",
            type4: "#444446",
            type5: "#363638",
            type6: "#242426",
          },
        },
      },
      neutral: {
        gray1: "#FFFFFF",
        gray2: "#FAFAFA",
        gray3: "#F5F5F5",
        gray4: "#F0F0F0",
        gray5: "#D9D9D9",
        gray6: "#BFBFBF",
        gray7: "#8C8C8C",
        gray8: "#595959",
        gray9: "#434343",
        gray10: "#262626",
        gray11: "#1F1F1F",
        gray12: "#141414",
        gray13: "#000000",
      },
    },
  };

  return (
    {
      ...colorTheme[type],
      primary: { ...colorTheme[type].primary, ...primary },
      secondary: { ...colorTheme[type].secondary, ...secondary },
    } ?? {
      ...colorTheme.light,
      primary: { ...colorTheme.light.primary, ...primary },
      secondary: { ...colorTheme.light.secondary, ...secondary },
    }
  );
};
