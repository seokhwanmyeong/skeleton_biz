export const selectColorScheme = (type: string) => {
  const colorTheme: { [key: string]: {} } = {
    light: {
      primary: {
        main: "#ffffff",
        overlay: "#000000",
        hover: "#dddddd",
        font: "#ffffff14",
      },
      secondary: {
        main: "#ffffff14",
        overlay: "#ffffff",
        hover: "#51515114",
        font: "#ffffff",
      },
      confirm: {
        main: "#4372ff",
        hover: "#1751ff",
        disabled: "#96b0ff",
        font: "#ffffff",
      },
      cancel: {
        main: "#ff6161",
        hover: "#ff2929",
        disabled: "#ffb4b4",
        font: "#ffffff",
      },
    },
    black: {
      primary: {
        main: "#ffffff14",
        overlay: "#ffffff",
        hover: "#51515114",
        font: "#ffffff",
      },
      secondary: {
        main: "#ffffff",
        overlay: "#000000",
        hover: "#dddddd",
        font: "#ffffff14",
      },
      confirm: {
        main: "#4372ff",
        hover: "#1751ff",
        disabled: "#96b0ff",
        font: "#ffffff",
      },
      cancel: {
        main: "#ff6161",
        hover: "#ff2929",
        disabled: "#ffb4b4",
        font: "#ffffff",
      },
    },
    test1: {},
    test2: {},
    bbq: {},
  };

  return colorTheme[type];
};
