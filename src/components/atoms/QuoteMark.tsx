'use client'
import React from "react";

const QuoteMark: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M7 9h4v6H5V9c0-2.2 1.8-4 4-4v2c-1.1 0-2 .9-2 2zm8 0h4v6h-6V9c0-2.2 1.8-4 4-4v2c-1.1 0-2 .9-2 2z" fill="#000" />
  </svg>
);

export default QuoteMark;