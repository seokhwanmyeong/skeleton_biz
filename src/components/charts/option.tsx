export class Option {
  constructor({
    chartType = "line",
    chartOption = {
      title: "",
      width: 360,
      height: 280,
      padding: 60,
      rectW: 20,
      innerRadius: 10,
      outerRadius: 10,
      labelRadius: 10,
      // format:,
      name: "",
      color: {},
      stroke: "none",
      strokeWidth: 1,
      strokeLinejoin: "round",
      padAngle: 0,
    },
  }) {
    chartOption.padAngle =
      chartOption.stroke === "none" ? 1 / chartOption.outerRadius : 0;
    chartOption.stroke = chartOption.innerRadius > 0 ? "none" : "white";
  }
}
