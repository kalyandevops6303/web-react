import React, { useState } from 'react';

interface CheckboxOptionsProps {
  options: string[];
}

const CheckboxOptions: React.FC<CheckboxOptionsProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      }
      return [...prev, option];
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg border ${
            selectedOptions.includes(option)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white'
          } cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
          onClick={() => handleOptionChange(option)}
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
              selectedOptions.includes(option)
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
            }`}
          >
            {selectedOptions.includes(option) && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-gray-700 text-base">{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxOptions;