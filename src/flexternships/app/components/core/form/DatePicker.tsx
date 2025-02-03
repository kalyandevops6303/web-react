'use client';

import React from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'react-feather';
import { Calendar } from '@flexternships/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@flexternships/app/components/ui/popover';
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { dateToEpoch, epochToDate, getTodayDate } from '@flexternships/utils/date-utils';
import { DateTime } from 'luxon';

// reference for value and on change implementation: https://github.com/gpbl/react-day-picker/discussions/1149

export function DatePicker(props: InputProps) {
  const {
    label,
    value,
    onChange,
    required,
    placeholder,
    className,
    error,
    fromDate,
    timeZone = 'Asia/Kolkata',
    disabled = false,
  } = props;

  const calendarRef = React.useRef<HTMLButtonElement>(null);

  const handleDateSelection = (date: Date | undefined) => {
    let timezoneAdjustedDate = getTodayDate(timeZone);
    if (date) {
      timezoneAdjustedDate = DateTime.fromJSDate(date)
        .setZone(timeZone, { keepLocalTime: true })
        .startOf('day')
        .toJSDate();
    }
    onChange(dateToEpoch(timezoneAdjustedDate));
    calendarRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} ref={calendarRef} asChild>
        <div className={`${Styles.formFieldContainer} ${className || ''}`}>
          {label && (
            <div className={Styles.formInputLabelContainer}>
              <span className={Styles.formInputLabel}>{label}</span>
              {required && <span className={Styles.requiredAsterisk}>*</span>}
            </div>
          )}
          <div className={`${Styles.formDateInput} ${error ? Styles.formInputError : Styles.formInputDefault}`}>
            {value ? (
              <span className={Styles.formDateFilled}>
                {value
                  ? format(
                      DateTime.fromJSDate(epochToDate(value))
                        .setZone(timeZone)
                        .setZone('local', { keepLocalTime: true })
                        .toJSDate(),
                      'PPP',
                    )
                  : placeholder}
              </span>
            ) : (
              <span className={Styles.formDatePlaceholder}>{placeholder}</span>
            )}
            <ChevronDown className="text-grey-200" size={16} />
          </div>
          {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={
            value
              ? DateTime.fromJSDate(epochToDate(value))
                  .setZone(timeZone)
                  .setZone('local', { keepLocalTime: true })
                  .toJSDate()
              : undefined
          }
          onSelect={handleDateSelection}
          fromDate={
            fromDate
              ? DateTime.fromJSDate(fromDate).setZone(timeZone).setZone('local', { keepLocalTime: true }).toJSDate()
              : undefined
          }
        />
      </PopoverContent>
    </Popover>
  );
}

type InputProps = {
  label?: string;
  value: number;
  onChange: (newVal: number) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
  fromDate?: Date;
  timeZone?: string;
  disabled?: boolean;
};
