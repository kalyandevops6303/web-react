import React, { useState, useRef, useEffect } from 'react';
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import Tooltip from '../Tooltip';
import { Eye, EyeOff } from 'react-feather';
import { TextInputType } from '@/flexternships/constraints/enums/form-enums';
import escape from 'escape-html';

export default function TextInput(props: InputProps) {
  const {
    type = TextInputType.ALPHANUMERIC,
    label,
    required,
    placeholder,
    className,
    readOnly,
    textarea,
    value,
    onChange,
    extra,
    error,
    tooltip,
    isPassword,
    allowViewPassword = true,
    isMasked = false,
    escapeHtml = true,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textarea && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, textarea]);

  const unescapeHtml = (str: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const originalValue = e.target.value;
    let valueToStore = originalValue;

    // Escape HTML if enabled, but only for the stored value
    if (escapeHtml) {
      valueToStore = escape(originalValue);
    }

    // Validate based on type
    let isValid = true;

    if (type === TextInputType.NUMERIC) {
      isValid = !isNaN(Number(originalValue)); // Validate using original input
    }

    // Only call onChange if valid
    if (!isValid) return;
    if (type === TextInputType.NUMERIC) {
      onChange(Number(originalValue));
    } else {
      onChange(valueToStore); // Send escaped value to parent
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${Styles.formFieldContainer} ${className ?? ''}`}>
      {label && (
        <div className={Styles.formInputLabelContainer}>
          <label className={Styles.formInputLabel}>{label}</label>
          {required && <span className={Styles.requiredAsterisk}>*</span>}
          {tooltip && <Tooltip content={tooltip} />}
        </div>
      )}
      {textarea ? (
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          className={`${Styles.formInput} ${
            readOnly ? Styles.formInputReadOnly : error ? Styles.formInputError : Styles.formInputDefault
          } ${Styles.formInputTextarea}`}
          disabled={readOnly}
          value={escapeHtml ? unescapeHtml(value.toString()) : value}
          onChange={handleChange}
        />
      ) : (
        <div className="w-full flex flex-col relative">
          <input
            type={isPassword && !showPassword ? 'password' : 'text'}
            placeholder={placeholder}
            className={`${Styles.formInput} ${
              readOnly ? Styles.formInputReadOnly : error ? Styles.formInputError : Styles.formInputDefault
            }`}
            disabled={readOnly}
            value={
              isMasked
                ? '*'.repeat(value?.toString().length ?? 0)
                : escapeHtml
                ? unescapeHtml(value?.toString() ?? '')
                : value?.toString() ?? ''
            }
            onChange={handleChange}
          />
          {isPassword && allowViewPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {extra && <span className={Styles.inputTextExtra}>{extra}</span>}
        </div>
      )}
      {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
    </div>
  );
}

type InputProps = {
  value: number | string;
  onChange: (newValue: number | string) => void;
  label?: string; // Optional field
  type?: TextInputType; // Optional field
  required?: boolean; // Optional field
  readOnly?: boolean; // Optional field
  textarea?: boolean; // Optional field
  placeholder?: string; // Optional field
  className?: string; // Optional field
  extra?: string;
  tooltip?: string;
  error?: string;
  isPassword?: boolean; // New optional field for password input
  allowViewPassword?: boolean; // New optional field for password input
  isMasked?: boolean; // New optional field for masked input
  escapeHtml?: boolean; // New optional field for escaping HTML
};
