import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 12;
const BUCKET_PADDING = 4;

const COLORS = ["#f2775782", "#0dcaf0"];

export const Histogram = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allGroupNames = data.map((group) => group.group);
  const colorScale = d3.scaleOrdinal().domain(allGroupNames).range(COLORS);

  const xScale = useMemo(() => {
    const maxPerGroup = data.map((group) => Math.max(...group.values));
    const max = Math.max(...maxPerGroup);
    const minPerGroup = data.map((group) => Math.min(...group.values));
    const min = Math.min(...minPerGroup);

    return d3
      .scaleLinear()
      .domain([min - 1, max])
      .range([10, boundsWidth])
      .nice();
  }, [data, width]);

  const bucketGenerator = useMemo(() => {
    return d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(BUCKET_NUMBER));
  }, [xScale]);

  const groupBuckets = useMemo(() => {
    return data.map((group) => {
      return { name: group.group, buckets: bucketGenerator(group.values) };
    });
  }, [data]);

  const yScale = useMemo(() => {
    const max = Math.max(
      ...groupBuckets.map((group) =>
        Math.max(...group.buckets.map((bucket) => bucket?.length))
      )
    );
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height]);

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3
      .axisLeft(yScale)
      .ticks(yScale.domain()[1])
      .tickFormat(d3.format("d"));
    svgElement.append("g").call(yAxisGenerator);

    svgElement
      .append("g")
      .attr("transform", `translate(0, ${boundsHeight})`)
      .call(xAxisGenerator)
      .append("text") // X Axis label
      .attr("x", boundsWidth / 2)
      .attr("y", 35) // Adjust the vertical position of the label
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Age in Months");

    svgElement
      .append("g")
      .call(yAxisGenerator)
      .append("text") // Y Axis label
      .attr("transform", "rotate(-90)")
      .attr("y", -20) // Adjust the vertical position of the label
      .attr("x", -boundsHeight / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Number of Students");

    svgElement
      .append("g")
      .selectAll("text")
      .data(groupBuckets)
      .enter()
      .append("text") // Key labels
      .attr("x", boundsWidth - 500)
      .attr("y", (d, i) => i * 20) // Adjust the vertical position of the labels
      .attr("fill", (d) => colorScale(d.name))
      .text((d) => d.name);
  }, [xScale, yScale, boundsHeight, boundsWidth]);

  const allRects = groupBuckets.map((group, i) =>
    group.buckets.map((bucket, j) => {
      const { x0, x1 } = bucket;
      if (x0 === undefined || x1 === undefined) {
        return null;
      }
      return (
        <rect
          key={i + "_" + j}
          fill={colorScale(group.name)}
          opacity={0.5}
          x={xScale(x0) + BUCKET_PADDING / 2}
          width={xScale(x1) - xScale(x0) - BUCKET_PADDING}
          y={yScale(bucket.length)}
          height={boundsHeight - yScale(bucket.length)}
        />
      );
    })
  );

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  );
};

export default Histogram;
