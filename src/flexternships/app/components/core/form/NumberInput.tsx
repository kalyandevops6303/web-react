import React, { useState } from "react";
import { Minus, Plus } from "react-feather";
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { Controller, UseFormRegisterReturn } from "react-hook-form";

export default function NumberInput(props: InputProps) {
    const { label, value, onChange, min, max, required, className } = props;

    const handleDecrement = () => {
        if (min === undefined || value > min) {
            const newValue = value - 1;
            onChange(newValue);
        }
    };

    const handleIncrement = () => {
        if (max === undefined || value < max) {
            const newValue = value + 1;
            onChange(newValue);
        }
    };

    return (
        <div className={`${Styles.formFieldContainer} ${className ?? ""}`}>
            <div className={Styles.formInputLabelContainer}>
                <label className={Styles.formInputLabel}>{label}</label>
                {required && <span className={Styles.requiredAsterisk}>*</span>}
            </div>

            <div className={Styles.formNumberInputContainer}>
                <button
                    onClick={handleDecrement}
                    disabled={min !== undefined && value <= min}
                    className={`${Styles.inputAction} ${Styles.leftInputAction} ${min !== undefined && value <= min ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Minus size={16} />
                </button>

                <input
                    type="text"
                    readOnly
                    value={value}
                    className={Styles.formNumberInput}
                />
                <button
                    onClick={handleIncrement}
                    disabled={max !== undefined && value >= max}
                    className={`${Styles.inputAction} ${Styles.rightInputAction} ${max !== undefined && value >= max ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}

type InputProps = {
    label: string;
    value: number;
    onChange: (newVal: number) => void;
    min?: number;
    max?: number;
    required?: boolean;
    className?: string;
};