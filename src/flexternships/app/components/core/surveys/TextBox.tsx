import React, { useRef, useEffect, useState } from 'react';

interface TextBoxProps {
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  resize?: boolean;
  error?: string;
  success?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  maxLength?: number;
  className?: string;
  [key: string]: any;
}

const TextBox: React.FC<TextBoxProps> = ({
  value = '',
  onChange,
  placeholder = '',
  multiline = false,
  rows = 3,
  disabled = false,
  readOnly = false,

  // Styling
  minWidth = '200px',
  maxWidth = '100%',
  height,
  maxHeight,
  resize = true,
  error = '',
  success = false,
  required = false,
  label = '',
  helperText = '',
  maxLength,
  className = '',
  ...props
}) => {
  const inputRef = useRef(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState('auto');
  useEffect(() => {
    if (!inputRef.current || !hiddenSpanRef.current) return;
    const contentWidth = hiddenSpanRef.current.offsetWidth;
    const newWidth = contentWidth + 32;

    const minWidthPx = parseInt(minWidth);
    const maxWidthPx = maxWidth === '100%' ? window.innerWidth : parseInt(maxWidth);

    const constrainedWidth = Math.max(minWidthPx, Math.min(newWidth, maxWidthPx));

    setWidth(`${constrainedWidth}px`);
  }, [value, minWidth, maxWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };

  const baseClasses = `
    px-3 
    py-2 
    border 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-green-500 
    focus:border-transparent
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    transition-all
    duration-200
    ${error ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'}
    ${!resize && multiline ? 'resize-none' : ''}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={hiddenSpanRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'pre',
          font: window.getComputedStyle(document.body).font,
        }}
      >
        {value || placeholder}
      </span>

      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {multiline ? (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          style={{
            width,
            height,
            maxHeight,
            minWidth,
            maxWidth,
          }}
          className={baseClasses}
          {...props}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={{
            width,
            height,
            minWidth,
            maxWidth,
          }}
          className={baseClasses}
          {...props}
        />
      )}

      {(helperText || error) && (
        <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>{error || helperText}</p>
      )}

      {maxLength && (
        <div className="text-xs text-gray-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextBox;
