//  LIB
import React, { useContext, useCallback, useMemo, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { BarStack } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { withTooltip, Tooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { localPoint } from "@visx/event";
import { motion } from "framer-motion";

//  Type
interface Data {
  admi_nm: string;
  cty_nm: string;
  sale_amt: number;
  yyyymm: string;
  mTotal: number;
  wTotal: number;
  sale_mon: string;
  sale_tue: string;
  sale_wed: string;
  sale_thu: string;
  sale_fri: string;
  sale_sat: string;
  sale_sun: string;
  [key: string]: string | number;
}

type TooltipData = {
  bar: SeriesPoint<Data>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

interface ChartProps {
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  events?: boolean;
  data: [];
  accessKey: string;
  total: number;
  isDivide?: boolean;
  legend: {
    [key: string]:
      | {
          key: string;
          title: string;
          check: boolean;
        }
      | string[];
  };
}

//  Style
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};
const purple1 = "#6c5efb";
const purple2 = "#c998ff";
const purple3 = "#ffffff";
const background = "#555555";

const ChartBar = ({
  data,
  accessKey,
  total,
  isDivide,
  legend,
}: {
  data: any;
  // keys: string[];
  accessKey: string;
  // title: any;
  total: number;
  isDivide?: boolean;
  legend: any;
}) => {
  return (
    <ParentSize>
      {({ width, height }) => (
        <Chart
          data={data}
          accessKey={accessKey}
          total={total}
          isDivide={isDivide}
          width={width}
          height={height}
          legend={legend}
        />
      )}
    </ParentSize>
  );
};

const Chart = withTooltip<ChartProps, TooltipData>(
  ({
    data = [],
    accessKey,
    total,
    isDivide = false,
    legend,
    width,
    height,
    events = false,
    margin = defaultMargin,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }: ChartProps & WithTooltipProvidedProps<TooltipData>) => {
    const keyOfLe: any = legend.key;
    const [keyState, setKetState] = useState<any>(keyOfLe);
    const [legendProps, setLegendProps] = useState<any>(legend);
    let tooltipTimeout: number;

    //  accessors
    const getAccess = useCallback((d: any) => d[accessKey], [accessKey]);
    const { xMax, yMax } = useMemo(() => {
      const _xMax = width - margin.left - margin.right;
      let _yMax = height - margin.top - margin.bottom;

      return {
        xMax: _xMax,
        yMax: isDivide ? _yMax / 2 : _yMax,
      };
    }, [width, height, isDivide]);

    //  scales
    const { amountScale, accessScale, colorScale } = useMemo(() => {
      const amountScale: any = {
        over: scaleLinear<number>({
          domain: [0, total],
          range: [yMax, 0],
          nice: true,
        }),
      };

      if (isDivide) {
        amountScale.under = scaleLinear<number>({
          domain: [0, total],
          range: [0, yMax],
          // domain: [total, 0],
          // range: [yMax, 0],
          nice: true,
        });
      }
      return {
        amountScale: amountScale,
        accessScale: scaleBand<number>({
          domain: data.map(getAccess),
          range: [0, xMax],
          padding: 0.4,
          round: true,
        }),
        colorScale: scaleOrdinal({
          domain: keyOfLe,
          range: [purple1, purple2, purple3],
        }),
      };
    }, [xMax, yMax, isDivide]);

    //  Handler
    const keyHandler = (key: string) => {
      const baseState = {
        ...legendProps,
        [key]: {
          ...legendProps[key],
          check: !legendProps[key].check,
        },
      };

      setLegendProps(baseState);
      console.log(baseState);
      console.log(
        Object.values(baseState)
          .filter((li: any) => li.check)
          .map((li: any) => {
            return li.key;
          })
      );
      setKetState(
        Object.values(baseState)
          .filter((li: any) => li.check)
          .map((li: any) => {
            return li.key;
          })
      );
    };

    return width < 10 ? null : (
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={background} rx={14} />
          <Group top={margin.top} left={margin.left}>
            <BarStack
              data={data}
              keys={
                isDivide
                  ? keyState.includes(keyOfLe[0])
                    ? [keyOfLe[0]]
                    : []
                  : keyState
              }
              height={yMax}
              x={getAccess}
              xScale={accessScale}
              yScale={amountScale.over}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack, idx) => {
                  return barStack.bars.map((bar) => {
                    return (
                      <motion.rect
                        layout
                        key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        transition={{
                          default: {
                            duration: 0.5,
                            delay: idx === 1 ? 0.1 : 0,
                          },
                        }}
                        transform={`rotate(180, ${bar.x + bar.width / 2}, ${
                          bar.y + bar.height / 2
                        })`}
                        initial={{
                          fill: `${bar.color}00`,
                          height: 0,
                        }}
                        animate={{
                          fill: bar.color,
                          height: bar.height,
                        }}
                        onClick={() => {
                          if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={(e) => {
                          console.log(e.target);
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const top = bar.y + margin.top;
                          const left = bar.x + bar.width + margin.left;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: top,
                            tooltipLeft: left,
                          });
                        }}
                      />
                    );
                  });
                })
              }
            </BarStack>
            <AxisLeft
              hideAxisLine
              hideTicks
              scale={amountScale.over}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: "end",
                dy: "0.33em",
              })}
            />
            <AxisBottom
              hideTicks
              top={yMax}
              scale={accessScale}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          </Group>
          {isDivide && (
            <Group top={margin.top + yMax + 30} left={margin.left}>
              <BarStack
                data={data}
                keys={keyState.includes(keyOfLe[1]) ? [keyOfLe[1]] : []}
                height={yMax}
                x={getAccess}
                xScale={accessScale}
                yScale={amountScale.under}
                color={colorScale}
              >
                {(barStacks) =>
                  barStacks.map((barStack, idx) => {
                    return barStack.bars.map((bar) => {
                      return (
                        <motion.rect
                          key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                          x={bar.x}
                          width={bar.width}
                          height={-bar.height}
                          fill={bar.color}
                          transition={{
                            default: {
                              duration: 0.5,
                              delay: idx === 1 ? 0.4 : 0,
                            },
                          }}
                          initial={{
                            fill: `${bar.color}00`,
                            height: 0,
                          }}
                          animate={{
                            fill: bar.color,
                            height: -bar.height,
                          }}
                          onClick={() => {
                            if (events)
                              alert(`clicked: ${JSON.stringify(bar)}`);
                          }}
                          onMouseLeave={() => {
                            tooltipTimeout = window.setTimeout(() => {
                              hideTooltip();
                            }, 100);
                          }}
                          onMouseMove={(e) => {
                            if (tooltipTimeout) clearTimeout(tooltipTimeout);
                            const top = bar.y + yMax + margin.top;
                            const left = bar.x + bar.width + margin.left;
                            const eventSvgCoords = localPoint(e);

                            showTooltip({
                              tooltipData: bar,
                              tooltipTop: eventSvgCoords
                                ? eventSvgCoords.y
                                : undefined,
                              tooltipLeft: eventSvgCoords
                                ? eventSvgCoords.x
                                : undefined,
                            });
                          }}
                        />
                      );
                    });
                  })
                }
              </BarStack>
              <AxisBottom
                hideTicks
                top={0}
                scale={accessScale}
                stroke={purple3}
                tickStroke={purple3}
                tickLabelProps={() => ({
                  fill: purple3,
                  fontSize: 11,
                  textAnchor: "middle",
                })}
                tickComponent={() => null}
              />
              <AxisLeft
                hideAxisLine
                hideTicks
                scale={amountScale.under}
                stroke={purple3}
                tickStroke={purple3}
                tickLabelProps={() => ({
                  fill: purple3,
                  fontSize: 11,
                  textAnchor: "end",
                  dy: "0.33em",
                })}
              />
            </Group>
          )}
        </svg>
        <div
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
            scale={colorScale}
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
                      onClick={() => keyHandler(label.text)}
                    >
                      <svg width={15} height={15}>
                        <rect
                          stroke={label.value}
                          fill={
                            keyState.includes(label.text)
                              ? label.value
                              : "transparent"
                          }
                          width={15}
                          height={15}
                        />
                      </svg>
                      <LegendLabel align="left" margin="0 0 0 4px">
                        {legendProps[label.text]?.title || ""}
                      </LegendLabel>
                    </LegendItem>
                  ))}
                </Flex>
              );
            }}
          </LegendOrdinal>
        </div>
        {tooltipOpen && tooltipData && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{ ...tooltipStyles }}
          >
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}</div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default React.memo(ChartBar);
