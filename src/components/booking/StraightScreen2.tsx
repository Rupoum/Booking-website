"use client"
import React from "react";

const StraightScreen2 = ({
  width = 700,
  height = 20,
  darkMode = false, // New prop for dark mode
}: {
  width?: number;
  height?: number;
  darkMode?: boolean; // Type definition for dark mode
}) => {
  const curveOffset = height * 1.4; // Controls the curvature of the screen
  const fillColor = darkMode ? "white" : "black"; // Set fill color based on dark mode

  return (
    <div className="flex flex-col justify-center items-center">
      <svg
        width={width}
        className="mt-6"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          d={`M 0,${height} L 0,0 Q ${
            width / 2
          },${curveOffset} ${width},0 L ${width},${height} Z`}
          fill={fillColor} // Use dynamic fill color
        />
      </svg>
      <p className="mt-8 text-gray-500 dark:text-white ">
        All eyes this way please!
      </p>
    </div>
  );
};

export default StraightScreen2;