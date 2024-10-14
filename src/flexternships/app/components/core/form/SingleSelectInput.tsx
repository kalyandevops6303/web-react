import React, { useState } from "react";
import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { useFieldArray, UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown, X } from "react-feather";
import { Popover, PopoverContent, PopoverTrigger } from "@flexternships/app/components/ui/popover";

export default function SingleSelectInput(props: InputProps) {
  const {
    value,
    onChange,
    choices,
    label,
    required,
    placeholder,
    className,
  } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`${Styles.formFieldContainer} ${className ?? ''} relative`}>
          <div className={Styles.formInputLabelContainer}>
            <label className={Styles.formInputLabel}>{label}</label>
            {required && <span className={Styles.requiredAsterisk}>*</span>}
          </div>

          <div className={`${Styles.formInput} ${Styles.formInputDefault} ${Styles.formMultiSelectInput}`}>
            {
              value?.name ? (
                <div className="grow">
                  {value.name}
                </div>
              ) : (
                <div className={`${Styles.placeholder}`}>
                  {placeholder}
                </div>
              )
            }
            <span className="text-grey-300">
              <ChevronDown />
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className={`h-72 overflow-y-scroll p-0 bg-white ${className ?? ''}`}>
        <div className="flex flex-col">
          {
            choices.map((item, index) => (
              <div key={index} className="py-2.5 px-4 hover:bg-trublue-light hover:text-trublue text-grey-heading text-sm" onClick={() => onChange(item)}>
                {item.name}
              </div>
            ))
          }
        </div>
      </PopoverContent>
    </Popover>
  );
}

type InputProps = {
  value: Choice,
  onChange: (newVal: Choice) => void
  label: string; // Required field
  required?: boolean; // Optional field
  placeholder?: string; // Optional field
  className?: string; // Optional field
  choices: Choice[]
};


type Choice = {
  _id: string
  name: string
}