import React from 'react';

interface Option {
  text: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="flex gap-3">
      {options.map((option) => {
        const isSelected = value === option.value;  // Compare with option.value instead of entire option object

        return (
          <label
            key={option.value}
            className={`
              inline-flex items-center justify-center px-6 py-1.5 rounded-md
              cursor-pointer transition-all duration-200 text-sm font-medium
              ${isSelected ? 'bg-trublue-light text-trublue border border-trublue' : 'bg-white text-[#666666] border border-[#E5E7EB]'}
              hover:bg-opacity-90
            `}
          >
            <div className="flex items-center gap-2">
              {option.text}
            </div>
            <input
              type="radio"
              name="radio-group"
              value={option.value}
              checked={isSelected}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
