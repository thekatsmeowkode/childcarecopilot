import React from "react";
import * as d3 from "d3";
import { useMemo } from "react";
import { getSummaryStats } from "../../utils/getSummaryStats";
import { VerticalBox } from "../boxplotComponents/VerticalBox";
import { AxisLeft } from "../boxplotComponents/AxisLeft";
import { AxisBottom } from "../boxplotComponents/AxisCategoric";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 50 };
const JITTER_WIDTH = 40;

const BoxPlot = ({ width, height, data }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const { chartMin, chartMax, groups } = useMemo(() => {
    const [chartMin, chartMax] = d3.extent(
      data.agesInMonths.map((d) => d.value)
    );
    const groups = [...new Set(data.agesInMonths.map((d) => d.name))];
    return { chartMin, chartMax, groups };
  }, [data]);

  // Compute scales
  const yScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    .range([boundsHeight, 0]);
  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(groups)
    .padding(0.25);

  // Build the box shapes
  const allShapes = groups.map((group, i) => {
    const groupData = data.agesInMonths
      .filter((d) => d.name === group)
      .map((d) => d.value);
    const sumStats = getSummaryStats(groupData);

    if (!sumStats) {
      return null;
    }

    const { min, q1, median, q3, max } = sumStats;

    const allCircles = groupData.map((value, i) => (
      <circle
        key={i}
        cx={
          xScale.bandwidth() / 2 -
          JITTER_WIDTH / 2 +
          Math.random() * JITTER_WIDTH
        }
        cy={yScale(value)}
        r={2}
        fill="grey"
        fillOpacity={0.3}
      />
    ));

    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalBox
          width={xScale.bandwidth()}
          q1={yScale(q1)}
          median={yScale(median)}
          q3={yScale(q3)}
          min={yScale(min)}
          max={yScale(max)}
          stroke="black"
          fill={"#ead4f5"}
        />
        {allCircles}
      </g>
    );
  });

  return (
    <div className="boxplot">
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          <AxisLeft yScale={yScale} pixelsPerTick={30} />
          {/* X axis uses an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom xScale={xScale} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BoxPlot;
