import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { list } from "@chakra-ui/react";

const LineChart = (props: any) => {
  const { Data } = props;
  const svgRef = useRef(null);

  useEffect(() => {
    //  Dimensions
    // if(!svgRef && !Data) {
    //   return
    // }
    
    console.log('render')
    let dimensions = {
      width: 360,
      height: 280,
      padding: 60,
      rectW: 20
    };

    //  Chart Animation
    const transitionPath = d3.transition()
      .ease(d3.easeLinear)
      .duration(1000);

    //  SELECTIONS
    const svg = d3
      .select(svgRef.current)
      .classed("chart", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

    const xScale = d3
      .scaleLinear()
      .domain([0, Number(d3.max(Data.map((li: any) => Number(li.date.split('-')[1]))))])
      .range([0, dimensions.width - dimensions.padding * 2]);
    const yScale = d3
      .scaleLinear()
      .domain([0, Number(d3.max(Data.map((li: any) => li.population)))])
      .range([dimensions.height - dimensions.padding * 2, 0]);

    //  Base Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(12)
      .tickValues([0,1,2,3,4,5,6,7,8,9,10,11,12])
      .tickFormat((d, i) => i === 0 ? '월' : `${d}`)
      .tickSizeOuter(0);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues([0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000])
      .tickFormat((d, i) => i === 0 ? '인구(명)' : `${d}`);

    //  Create 'g' Append
    svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(${dimensions.padding}, ${
          dimensions.height - dimensions.padding
        })`
      )

    svg
      .append("g")
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", dimensions.width - dimensions.padding - dimensions.padding)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -40)
          .attr("y", -30)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text('polulation'))
      .attr(
        "transform",
        `translate(${dimensions.padding}, ${
          dimensions.padding
        })`
      );

    //  Scale : Line
    const generateScaledLine = d3
      .line()
      .x((d: any, i) => {
        const xData: any = Number(d.date.split("-")[1]);
        return xScale(xData);
      })
      .y((d: any, i) => {
        const yData: any = d.population;
        return yScale(yData);
      })
      .curve(d3.curveBasis);
    

    //  Make Path
    const path = svg.append("path")
      .datum(Data)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linecap", 'round')
      .attr("stroke-linejoin", 'round')
      .attr("stroke-width", 1)
      .attr("d", (d) => generateScaledLine(d))
      .attr(
        "transform",
        `translate(${dimensions.padding}, ${dimensions.padding})`
      )

    const pathLength: any = path.node()?.getTotalLength()

    path.attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0)
    
  }, []);

  return <svg ref={svgRef} />;
};

export default LineChart;
