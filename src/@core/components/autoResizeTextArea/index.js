import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'reactstrap';

const AutoResizeTextarea = ({ placeholder, className, invalid, name, onChange, error, value: propValue }) => {
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [value, setValue] = useState('');

  useEffect(() => {
    // Update local state only when propValue changes
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  useEffect(() => {
    if (textareaRef.current) {
      const lines = textareaRef.current.value.split('\n').length;
      const lineHeight = 26; // You may need to adjust this based on your font size and line height
      const minLines = 1;

      let newHeight = lines * lineHeight;
      if (newHeight < lineHeight * minLines) {
        newHeight = lineHeight * minLines;
      }

      setTextareaHeight(newHeight + 'px');
    }
  }, [value]);

  const handleTextareaChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Input
      className={className}
      innerRef={textareaRef}
      invalid={invalid}
      type="textarea"
      style={{ height: textareaHeight }}
      onChange={handleTextareaChange}
      placeholder={placeholder}
      name={name}
      value={value}
      rows={1}
    />
  );
};

export default AutoResizeTextarea;
