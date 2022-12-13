import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, useDimensions } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { Arc } from "@visx/shape";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { motion } from "framer-motion";
import { ScaleSVG } from "@visx/responsive";
import { animated, to } from "@react-spring/web";

type Props = {};

const ChartDonut = ({ data, accessKey }: any) => {
  const [tooltipTimeout, setTooltipTimeout] = useState<number>();
  const [active, setActive] = useState<any>(null);
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<
    string | null
  >(null);

  // color scales
  const getLetterFrequencyColor = scaleOrdinal({
    domain: data.map((l: any) => l[accessKey]),
    range: [
      "rgba(93,30,91,1)",
      "rgba(93,30,91,0.8)",
      "rgba(93,30,91,0.6)",
      "rgba(93,30,91,0.4)",
    ],
  });
  const legendColor = scaleOrdinal({
    domain: data.map((l: any) => l["date"]),
    range: [
      "rgba(93,30,91,1)",
      "rgba(93,30,91,0.9)",
      "rgba(93,30,91,0.8)",
      "rgba(93,30,91,0.7)",
      "rgba(93,30,91,0.6)",
      "rgba(93,30,91,0.5)",
      "rgba(93,30,91,0.4)",
      "rgba(93,30,91,0.3)",
      "rgba(93,30,91,0.2)",
    ],
  });
  const background = "#555555";

  const arr = (d: any) => d[accessKey];

  return (
    <ParentSize>
      {({ width, height }) => {
        const { containerRef, TooltipInPortal } = useTooltipInPortal({
          detectBounds: true,
          scroll: true,
        });
        const {
          tooltipData,
          tooltipLeft,
          tooltipTop,
          tooltipOpen,
          showTooltip,
          hideTooltip,
        } = useTooltip({
          tooltipData: { date: "", population: 0 },
        });
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;
        const centerY = innerHeight / 2;
        const centerX = innerWidth / 2;
        const donutThickness = 100;

        return (
          <Flex position="relative" ref={containerRef}>
            <ScaleSVG width={width} height={height}>
              <rect rx={14} width={width} height={height} fill={background} />
              <Group top={centerY + margin.top} left={centerX + margin.left}>
                <Pie
                  data={data}
                  pieValue={arr}
                  outerRadius={(data) =>
                    active === data.index ? radius + 8 : radius
                  }
                  innerRadius={(data) =>
                    active === data.index
                      ? radius - donutThickness - 8
                      : radius - donutThickness
                  }
                  cornerRadius={3}
                  padAngle={0.005}
                >
                  {(pie) => {
                    const { arcs, path } = pie;

                    return (
                      <>
                        {arcs.map((arc) => {
                          const groupeArc = arc.data;
                          const [centroidX, centroidY] = path.centroid(arc);
                          const hasSpaceForLabel =
                            arc.endAngle - arc.startAngle >= 0.1;

                          return (
                            <Group key={`arc-${arc.index}`}>
                              <motion.path
                                // d={pie.path(arc) || undefined}
                                fill={getLetterFrequencyColor(
                                  groupeArc[accessKey]
                                )}
                                // onClick={() => onClickDatum(arc)}
                                // onTouchStart={() => onClickDatum(arc)}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeInOut",
                                }}
                                initial={{
                                  d: "0",
                                }}
                                animate={{
                                  d: `${pie.path(arc)}`,
                                }}
                                onMouseEnter={() => {
                                  setActive(arc.index);
                                }}
                                onMouseLeave={() => {
                                  setActive(null);
                                  setTooltipTimeout(
                                    window.setTimeout(() => {
                                      hideTooltip();
                                    }, 100)
                                  );
                                }}
                                onMouseMove={(e) => {
                                  if (tooltipTimeout)
                                    clearTimeout(tooltipTimeout);
                                  const eventSvgCoords = localPoint(e);
                                  console.log(e);

                                  showTooltip({
                                    tooltipData: groupeArc,
                                    tooltipTop: eventSvgCoords
                                      ? eventSvgCoords.y + margin.top
                                      : undefined,
                                    tooltipLeft: eventSvgCoords
                                      ? eventSvgCoords.x + margin.left
                                      : undefined,
                                  });
                                }}
                              />
                              {hasSpaceForLabel && (
                                <text
                                  fill="white"
                                  x={centroidX}
                                  y={centroidY}
                                  dy=".33em"
                                  fontSize={9}
                                  textAnchor="middle"
                                  pointerEvents="none"
                                >
                                  {groupeArc[accessKey]}
                                </text>
                              )}
                            </Group>
                          );
                        })}
                      </>
                    );
                  }}
                </Pie>
                {tooltipOpen && (
                  <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                  >
                    <strong>
                      {tooltipData && tooltipData.date}
                      {tooltipData && tooltipData.population}
                    </strong>
                  </TooltipInPortal>
                )}
              </Group>
            </ScaleSVG>
            <Flex
              style={{
                position: "absolute",
                bottom: margin.top / 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              <LegendOrdinal
                scale={legendColor}
                direction="row"
                labelMargin="0 15px 0 0"
              >
                {(labels) => {
                  return (
                    <Flex style={{ display: "flex", flexDirection: "row" }}>
                      {labels.map((label, i) => (
                        <LegendItem
                          key={`legend-quantile-${i}`}
                          margin="0 5px"
                          // onClick={() => keyHandler(label.text)}
                        >
                          <svg width={10} height={10}>
                            <rect
                              stroke={label.value}
                              // fill={
                              //   keyState.includes(label.text)
                              //     ? label.value
                              //     : "transparent"
                              // }
                              fill={label.value}
                              width={10}
                              height={10}
                            />
                          </svg>
                          <Flex as={LegendLabel} fontSize="10px">
                            {/* {legendProps[label.text]?.title || ""} */}
                            {label.text}
                          </Flex>
                        </LegendItem>
                      ))}
                    </Flex>
                  );
                }}
              </LegendOrdinal>
            </Flex>
          </Flex>
        );
      }}
    </ParentSize>
  );
};

export default ChartDonut;
