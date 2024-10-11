import React, { useState } from "react";
import { Info } from "react-feather";

interface TooltipProps {
  content: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, className }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div 
        className={`relative inline-block ${className ?? ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      {/* Info icon */}
      <div
        className="flex items-center justify-center text-grey-200"
      >
        <Info size={16} />
      </div>

      {/* Tooltip content */}
      {showTooltip && (
        <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 p-1 min-w-36 max-w-52 text-xs bg-gray-800 text-white rounded shadow-lg z-10 break-words">
          {content}
          {/* Tooltip arrow pointing left */}
          <div className="absolute top-1/2 left-2 transform -translate-x-full -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
