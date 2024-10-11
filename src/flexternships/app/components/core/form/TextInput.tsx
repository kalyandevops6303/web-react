import React from "react";
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import Tooltip from "../Tooltip";

export default function TextInput(props: InputProps) {
    const {
        type = "alphanumeric",
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
        tooltip
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        // Validate based on type
        let isValid = true;

        if (type === "numeric") {
            isValid = !isNaN(Number(newValue)); // Check if value is numeric
        } else if (type === "alphanumeric") {
            // Allow letters and numbers (including special characters if necessary)
            // isValid = /^[a-zA-Z0-9]*$/.test(newValue);
            isValid = true;
        }

        // Only call onChange if valid
        if(!isValid) return;
        if (type==="numeric") {
            onChange(Number(newValue));
        } else {
            onChange(newValue);
        }
    }

    return (
        <div className={`${Styles.formFieldContainer} ${className ?? className}`}>
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
                            placeholder={placeholder}
                            className={`${Styles.formInput} ${readOnly ? Styles.formInputReadOnly : (error ? Styles.formInputError : Styles.formInputDefault)}`}
                            disabled={readOnly}
                            value={value}
                            onChange={handleChange} // Use the updated handleChange
                        />
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
    type?: "alphanumeric" | "numeric"; // Optional field
    required?: boolean; // Optional field
    readOnly?: boolean; // Optional field
    textarea?: boolean; // Optional field
    placeholder?: string; // Optional field
    className?: string; // Optional field
    extra?: string;
    tooltip?: string;
    error?: string;
};
