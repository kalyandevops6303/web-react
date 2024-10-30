import React, { useState } from "react";
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import Tooltip from "../Tooltip";
import { Eye, EyeOff } from "react-feather";
import { TextInputType } from "@/flexternships/constraints/enums/form-enums";

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
        isPassword
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        // Validate based on type
        let isValid = true;

        if (type === TextInputType.NUMERIC) {
            isValid = !isNaN(Number(newValue)); // Check if value is numeric
        }

        // Only call onChange if valid
        if (!isValid) return;
        if (type === TextInputType.NUMERIC) {
            onChange(Number(newValue));
        } else {
            onChange(newValue);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={`${Styles.formFieldContainer} ${className ?? ''}`}>
            <div className={Styles.formInputLabelContainer}>
                <label className={Styles.formInputLabel}>{label}</label>
                {required && <span className={Styles.requiredAsterisk}>*</span>}
                {tooltip && <Tooltip content={tooltip} />}
            </div>
            {
                textarea ? (
                    <textarea
                        placeholder={placeholder}
                        className={`${Styles.formInput} ${readOnly ? Styles.formInputReadOnly : (error ? Styles.formInputError : Styles.formInputDefault)} ${Styles.formInputTextarea}`}
                        disabled={readOnly}
                        value={value}
                        onChange={handleChange}
                    />
                ) : (
                    <div className="w-full flex flex-col relative">
                        <input
                            type={isPassword && !showPassword ? "password" : "text"}
                            placeholder={placeholder}
                            className={`${Styles.formInput} ${readOnly ? Styles.formInputReadOnly : (error ? Styles.formInputError : Styles.formInputDefault)}`}
                            disabled={readOnly}
                            value={value?.toString() ?? ''}
                            onChange={handleChange}
                        />
                        {isPassword && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                        {
                            extra && (
                                <span className={Styles.inputTextExtra}>
                                    {extra}
                                </span>
                            )
                        }
                    </div>
                )
            }
            {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
        </div>
    );
}

type InputProps = {
    value: number | string;
    onChange: (newValue: number | string) => void;
    label: string; // Required field
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
};
