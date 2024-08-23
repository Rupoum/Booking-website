"use client"
// Square.tsx
import React from "react";

interface SquareProps {
  // Define any props if necessary
}

const Square: React.FC<SquareProps> = () => (
  <div className="w-8 h-8 bg-gray-300 border border-gray-600"></div>
);

export default Square;
