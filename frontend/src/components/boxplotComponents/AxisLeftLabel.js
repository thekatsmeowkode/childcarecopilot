import React from "react";

const AxisLeftLabel = ({ text, x, y, rotation }) => (
  <text
    x={x}
    y={y}
    fontSize="12px"
    textAnchor="middle"
    alignmentBaseline="middle"
    transform={`rotate(${rotation}, ${x}, ${y})`}
  >
    {text}
  </text>
);

export default AxisLeftLabel;
