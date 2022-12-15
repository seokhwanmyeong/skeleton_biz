import { memo, useState, useMemo, useCallback, useEffect } from "react";
import { Flex, theme } from "@chakra-ui/react";
import { Arc } from "@visx/shape";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { ScaleSVG } from "@visx/responsive";
import { motion } from "framer-motion";
import { animated, to } from "@react-spring/web";

const background = "#555555";

const [donutThickness, expandRadius, margin] = [
  100,
  12,
  { top: 20, right: 20, bottom: 20, left: 20 },
];

const ChartDonut = ({ data, accessKey, subKey }: any) => {
  const [tooltipTimeout, setTooltipTimeout] = useState<number>();
  const [active, setActive] = useState<any>(null);
  const [activeDetailArc, setActiveDetailArc] = useState<any>(-1);
  const arr = (d: any) => d[accessKey];
  const subArr = (d: any) => d.value;
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
  } = useTooltip<any>({ tooltipData: { isSub: false } });

  // Color scales
  const { getDataColor, legendColor } = useMemo(
    () => ({
      getDataColor: scaleOrdinal({
        domain: data.map((l: any) => l[accessKey]),
        range: [
          "rgba(93,30,91,1)",
          "rgba(93,30,91,0.8)",
          "rgba(93,30,91,0.6)",
          "rgba(93,30,91,0.4)",
        ],
      }),
      legendColor: scaleOrdinal({
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
      }),
    }),
    [data, accessKey]
  );

  const subData = () => {
    const selectData = data[activeDetailArc];
    let arr = [];

    for (const key in selectData) {
      if (key.includes(subKey))
        arr.push({ title: key, value: selectData[key] });
    }

    return arr;
  };

  const getSubDataColor = scaleOrdinal({
    domain: subData().map((l: any) => l.title),
    range: [
      "rgba(93,30,91,1)",
      "rgba(93,30,91,0.8)",
      "rgba(93,30,91,0.6)",
      "rgba(93,30,91,0.4)",
      "rgba(93,30,91,0.2)",
      "rgba(93,30,91,0.1)",
    ],
  });

  return (
    <ParentSize>
      {({ width, height }) => {
        const { innerWidth, innerHeight } = {
          innerWidth: width - margin.left - margin.right,
          innerHeight: height - margin.top - margin.bottom,
        };

        const { radius, centerY, centerX } = {
          radius: Math.min(innerWidth, innerHeight) / 2,
          centerX: innerWidth / 2,
          centerY: innerHeight / 2,
        };
        // console.log("render");

        return (
          <Flex position="relative" ref={containerRef}>
            <ScaleSVG width={width} height={height}>
              <rect rx={14} width={width} height={height} fill={background} />
              <Group top={centerY + margin.top} left={centerX + margin.left}>
                <Pie
                  data={data}
                  pieValue={arr}
                  outerRadius={(data) =>
                    active === data.index ? radius + expandRadius : radius
                  }
                  innerRadius={(data) =>
                    active === data.index || activeDetailArc === data.index
                      ? radius - donutThickness - expandRadius
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
                          const {
                            data: groupeArc,
                            startAngle,
                            endAngle,
                            index,
                          } = arc;
                          const [centroidX, centroidY] = path.centroid(arc);
                          const hasSpaceForLabel = endAngle - startAngle >= 0.1;

                          return (
                            <Group key={`arc-${index}`}>
                              <motion.path
                                d={pie.path(arc) || undefined}
                                fill={getDataColor(groupeArc[accessKey])}
                                onClick={() => {
                                  activeDetailArc === index
                                    ? setActiveDetailArc(-1)
                                    : setActiveDetailArc(index);
                                }}
                                // onTouchStart={() => onClickDatum(arc)}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeInOut",
                                }}
                                initial={{
                                  d: "",
                                }}
                                animate={{
                                  d: `${pie.path(arc) ?? ""}`,
                                }}
                                onMouseEnter={() => {
                                  setActive(index);
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

                                  showTooltip({
                                    tooltipData: { ...groupeArc, isSub: false },
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
                                <Label
                                  centroidX={centroidX}
                                  centroidY={centroidY}
                                  groupeArc={groupeArc}
                                  accessKey={accessKey}
                                />
                              )}
                            </Group>
                          );
                        })}
                      </>
                    );
                  }}
                </Pie>
                {/* Sub Pie Chart (inner) */}
                {activeDetailArc >= 0 && (
                  <Pie
                    data={subData()}
                    pieValue={subArr}
                    outerRadius={radius - donutThickness - expandRadius}
                    cornerRadius={3}
                    padAngle={0.005}
                  >
                    {(pie) => {
                      const { arcs, path } = pie;
                      return (
                        <>
                          {arcs.map((arc) => {
                            const {
                              data: groupeArc,
                              startAngle,
                              endAngle,
                              index,
                            } = arc;
                            const [centroidX, centroidY] = path.centroid(arc);
                            const hasSpaceForLabel =
                              endAngle - startAngle >= 0.1;

                            return (
                              <Group key={`arc-${index}`}>
                                <motion.path
                                  d={pie.path(arc) || undefined}
                                  fill={getSubDataColor(groupeArc.title)}
                                  stroke="#c5c5c5"
                                  initial={{
                                    pathLength: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    d: `${pie.path(arc)}`,
                                    pathLength: 1,
                                    opacity: 1,
                                  }}
                                  transition={{
                                    pathLength: {
                                      type: "spring",
                                      duration: 1,
                                    },
                                    opacity: {
                                      deley: 20,
                                      duration: 0.5,
                                    },
                                  }}
                                  onMouseOut={() => {
                                    hideTooltip();
                                  }}
                                  onMouseEnter={(e) => {
                                    const eventSvgCoords = localPoint(e);

                                    setTooltipTimeout(
                                      window.setTimeout(() => {
                                        showTooltip({
                                          tooltipData: {
                                            ...groupeArc,
                                            isSub: true,
                                          },
                                          tooltipTop:
                                            centerY + margin.top + centroidY,
                                          tooltipLeft:
                                            centerX + margin.left + centroidX,
                                        });
                                      }, 100)
                                    );
                                  }}
                                />
                                {hasSpaceForLabel && (
                                  <motion.text
                                    fill="white"
                                    x={centroidX}
                                    y={centroidY}
                                    dy=".33em"
                                    fontSize={9}
                                    textAnchor="middle"
                                    pointerEvents="none"
                                    transition={{
                                      opacity: {
                                        deley: 1,
                                        duration: 1,
                                      },
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
                                    {groupeArc.value}
                                  </motion.text>
                                )}
                              </Group>
                            );
                          })}
                        </>
                      );
                    }}
                  </Pie>
                )}
                {/* Tooltip Component */}
                {tooltipOpen && (
                  <TooltipInPortal
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                  >
                    <strong>
                      {tooltipData &&
                        (tooltipData.isSub
                          ? tooltipData.title
                          : tooltipData[accessKey])}
                    </strong>
                  </TooltipInPortal>
                )}
              </Group>
            </ScaleSVG>
            {/* Legend Component */}
            <Legend margin={margin} legendColor={legendColor} />
          </Flex>
        );
      }}
    </ParentSize>
  );
};
// const SubPieMemo = memo(
//   ({
//     data,
//     pieValue,
//     outerRadius,
//     colorScale,
//     centerX,
//     centerY,
//     margin,
//     showTooltip,
//     hideTooltip,
//     setTooltipTimeout,
//   }: any) => {
//     return (
//       <Pie
//         data={data}
//         pieValue={pieValue}
//         outerRadius={outerRadius}
//         cornerRadius={3}
//         padAngle={0.005}
//       >
//         {(pie) => {
//           const { arcs, path } = pie;
//           return (
//             <>
//               {arcs.map((arc: any) => {
//                 const { data: groupeArc, startAngle, endAngle, index } = arc;
//                 const [centroidX, centroidY] = path.centroid(arc);
//                 const hasSpaceForLabel = endAngle - startAngle >= 0.1;

//                 return (
//                   <Group key={`arc-${index}`}>
//                     <motion.path
//                       d={pie.path(arc) || undefined}
//                       fill={colorScale(groupeArc.title)}
//                       stroke="#c5c5c5"
//                       initial={{
//                         pathLength: 0,
//                         opacity: 0,
//                       }}
//                       animate={{
//                         d: `${pie.path(arc)}`,
//                         pathLength: 1,
//                         opacity: 1,
//                       }}
//                       transition={{
//                         pathLength: {
//                           type: "spring",
//                           duration: 1,
//                         },
//                         opacity: {
//                           deley: 20,
//                           duration: 0.5,
//                         },
//                       }}
//                       onMouseOut={() => {
//                         hideTooltip();
//                       }}
//                       onMouseEnter={() => {
//                         setTooltipTimeout(
//                           window.setTimeout(() => {
//                             showTooltip({
//                               tooltipData: {
//                                 ...groupeArc,
//                                 isSub: true,
//                               },
//                               tooltipTop: centerY + margin.top + centroidY,
//                               tooltipLeft: centerX + margin.left + centroidX,
//                             });
//                           }, 100)
//                         );
//                       }}
//                     />
//                     {hasSpaceForLabel && (
//                       <motion.text
//                         fill="white"
//                         x={centroidX}
//                         y={centroidY}
//                         dy=".33em"
//                         fontSize={9}
//                         textAnchor="middle"
//                         pointerEvents="none"
//                         transition={{
//                           opacity: {
//                             deley: 1,
//                             duration: 1,
//                           },
//                         }}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                       >
//                         {groupeArc.value}
//                       </motion.text>
//                     )}
//                   </Group>
//                 );
//               })}
//             </>
//           );
//         }}
//       </Pie>
//     );
//   }
// );

const Label = memo(({ centroidX, centroidY, groupeArc, accessKey }: any) => {
  return (
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
  );
});

const Legend = memo(({ legendColor, margin }: any) => {
  return (
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
        {(labels) => (
          <Flex style={{ display: "flex", flexDirection: "row" }}>
            {labels.map((label, i) => {
              const { value, text } = label;

              return (
                <LegendItem key={`legend-quantile-${i}`} margin="0 5px">
                  <svg width={10} height={10}>
                    <rect stroke={value} fill={value} width={10} height={10} />
                  </svg>
                  <Flex as={LegendLabel} fontSize="10px">
                    {text}
                  </Flex>
                </LegendItem>
              );
            })}
          </Flex>
        )}
      </LegendOrdinal>
    </Flex>
  );
});

export default ChartDonut;
