"use client";

import { format } from "date-fns";
import { ChevronDown } from "react-feather";
import { Popover, PopoverContent, PopoverTrigger } from "@flexternships/app/components/ui/popover";
import Styles from "@flexternships/styles/components/core/form-fields.module.css";
import { Calendar } from "@flexternships/app/components/ui/calendar";
import { dateToEpoch, epochToDate } from "@flexternships/utils/date-utils";

export function DatePicker(props: InputProps) {
    const { label, value, onChange, required, placeholder, className, error } = props; // Destructure setValue and name
    const handleDateSelection = (date: Date | undefined) => {
        if (date === undefined) {
            date = new Date();
        }
        onChange(dateToEpoch(date));
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className={`${Styles.formFieldContainer} ${className || ""}`}>
                    <div className={Styles.formInputLabelContainer}>
                        <span className={Styles.formInputLabel}>{label}</span>
                        {required && <span className={Styles.requiredAsterisk}>*</span>}
                    </div>
                    <div className={`${Styles.formDateInput} ${error ? Styles.formInputError : Styles.formInputDefault}`}>
                        {value ? (
                            <span className={Styles.formDateFilled}>
                                {format(epochToDate(value), "PPP")}
                            </span>
                        ) : (
                            <span className={Styles.formDatePlaceholder}>
                                {placeholder}
                            </span>
                        )}
                        <ChevronDown className="text-grey-200" size={16} />
                    </div>
                    {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                    mode="single"
                    selected={epochToDate(value)}
                    onSelect={handleDateSelection}
                    // initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

type InputProps = {
    label: string;                          // Required field
    value: number
    onChange: (newVal: number) => void;
    required?: boolean;                     // Optional field
    placeholder?: string;                   // Optional field
    className?: string;                     // Optional field
    error?: string
};
