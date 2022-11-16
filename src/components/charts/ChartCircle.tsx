import { useRef, useEffect } from "react";
import * as d3 from "d3";

type ChartCircleProps = {
  Data: any;
  title?: string;
  keyName: string;
  valName: string;
  zKey?: string;
  Group?: boolean;
  width: number;
  height: number;
  innerRadius?: number;
  outerRadius: number;
  labelRadius?: number;
  arcColor?: any[];
  stroke?: string;
  strokeWidth?: number;
  strokeLinejoin?: string;
  padAngle?: number;
  svgStyle?: any;
  pathStyle?: any;
  arcStyle?: any;
};

type xData = {
  [key: string]: string;
};
type yData2 = {
  [key: string]: number;
};

const ChartCircle = (props: ChartCircleProps) => {
  const {
    Data,
    title,
    keyName = "",
    valName = "",
    zKey,
    Group = false,
    width = 360,
    height = 300,
    innerRadius = 0,
    outerRadius = 148,
    labelRadius = 110,
    arcColor,
    stroke = "none",
    strokeWidth = 1,
    strokeLinejoin = "round",
    padAngle = 0,
    svgStyle,
    pathStyle,
    arcStyle,
  } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef && !Data) {
      return;
    }

    //  Dimensions & ChartData
    const keyArr: string[] = d3.map(Data, (d: xData) => d[keyName]);
    const valArr: number[] = d3.map(Data, (d: yData2) => d[valName]);
    const dataIdx = d3
      .range(keyArr.length)
      .filter((i: number) => !isNaN(valArr[i]));
    const total: number = d3.sum(valArr);
    const colors: any[] =
      arcColor ||
      d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), keyArr.length);

    //  SELECTIONS
    const svg = d3
      .select(svgRef.current)
      .classed("chart-circle", true)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", svgStyle);

    //  SET: Arcs.
    const arcs = d3
      .pie()
      .sort((a, b) => (a > b ? 1 : -1))
      .padAngle(padAngle)
      .value((_, i) => valArr[i])(dataIdx);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    svg
      .append("g")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
      .classed("test", true)
      .attr("fill", (_, i) => colors[i])
      .attr("d", arc as any)
      .append("title")
      .text((_, i) => keyArr[i]);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("font-size", 10)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join((enter) => {
        let g = enter.append("text");

        g.attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`);
        g.append("tspan").text((_, i) => keyArr[i]);
        g.append("tspan")
          .text((_, i) => `${((valArr[i] / total) * 100).toFixed(1)}%`)
          .attr("x", 0)
          .attr("y", 15);
        return g;
      });
  }, [Data, svgRef]);

  return <svg ref={svgRef} />;
};

export default ChartCircle;
