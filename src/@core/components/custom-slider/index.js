import React, { useState, useRef, useEffect } from 'react';
import './customSlider.scss';

const CustomSlider = ({ sliderValue, onChange, max = 12 }) => {
  const [value, setValue] = useState(sliderValue ?? 0);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef(null);

  const handleMove = (clientX) => {
    if (sliderRef.current) {
      // Get the bounding rectangle of the slider element
      const rect = sliderRef.current.getBoundingClientRect();
      // Calculate the percentage of the slider width where the interaction occurred
      // (clientX - rect.left) gives us the x-coordinate relative to the slider's left edge
      // Dividing by rect.width gives us the percentage along the slider's width
      const percentage = (clientX - rect.left) / rect.width;
      // Convert the percentage to a value within the slider's range (0 to max)
      const newValue = Math.round(percentage * max);
      // Update the state with the new value, ensuring it stays within the valid range
      setValue(Math.max(0, Math.min(max, newValue)));
      onChange(Math.max(0, Math.min(max, newValue)));
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent default dragging behavior
    setIsDragging(true);
    setShowTooltip(true);
    handleMove(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX || e.touches[0].clientX);
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const renderMarks = () => {
    const marks = [];
    for (let i = 0; i <= max; i++) {
      marks.push(<div key={i} className="slider__mark" style={{ left: `${(i / max) * 100}%` }} />);
    }
    return marks;
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mousemove', handleDragMove);
    // touch events for mobile support
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);

    return () => {
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
    };
  }, [isDragging]);

  // Update value when sliderValue prop changes this case is required for save drafts functionality
  useEffect(() => {
    if (!sliderValue) {
      setValue(0);
    } else {
      setValue(sliderValue);
    }
  }, [sliderValue]);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
        <div className="slider__progress" style={{ width: `${(value / max) * 100}%` }} />
        <div className="slider__thumb" style={{ left: `${(value / max) * 100}%` }} onMouseEnter={handleMouseEnter}>
          <div className={`slider__tooltip ${showTooltip || sliderValue > 0 ? 'slider__tooltip--visible' : ''}`}>
            {value.toString().padStart(2, '0')} Hrs
          </div>
        </div>
      </div>
      {renderMarks()}
      <div className="slider-labels">
        <span>0</span>
        <span>12</span>
      </div>
    </div>
  );
};

export default CustomSlider;
