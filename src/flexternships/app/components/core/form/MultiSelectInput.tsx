import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { useFieldArray } from "react-hook-form";
import { ChevronDown, X } from "react-feather";
import { Popover, PopoverContent, PopoverTrigger } from "@flexternships/app/components/ui/popover";

export default function MultiSelectInput(props: InputProps) {
    const {
        name,
        control,
        choices,
        label,
        required,
        placeholder,
        className,
        error
    } = props;


    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });


    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className={`${Styles.formFieldContainer} ${className ?? ''} relative`}>
                    <div className={Styles.formInputLabelContainer}>
                        <label className={Styles.formInputLabel}>{label}</label>
                        {required && <span className={Styles.requiredAsterisk}>*</span>}
                    </div>

                    <div className={`${Styles.formInput} ${error ? Styles.formInputError : Styles.formInputDefault} ${Styles.formMultiSelectInput}`}>
                        {
                            fields.length === 0 ? (
                                <div className={`${Styles.placeholder}`}>
                                    {placeholder}
                                </div>
                            ) : (
                                <div className="flex flex-row grow flex-wrap gap-2">
                                    {
                                        fields.map((item: any, index) => (
                                            <div key={index} className="p-1 flex flex-row items-center gap-1 bg-trublue-secondary-500 bg-opacity-70 text-white rounded">
                                                <span className="text-xs font-medium leading-5">{item.name}</span>
                                                <span onClick={() => remove(index)}>
                                                    <X size={12} />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <span className="text-grey-300">
                            <ChevronDown />
                        </span>
                    </div>
                    {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
                </div>
            </PopoverTrigger>
            <PopoverContent className={`h-72 overflow-y-scroll p-0 bg-white ${className ?? ''}`}>
                <div className="flex flex-col">
                    {
                        choices.map((item, index) => (
                            <div key={index} className="py-2.5 px-4 hover:bg-trublue-light hover:text-trublue text-grey-heading text-sm" onClick={() => append(item)}>
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
    name: string,
    choices: Choice[]
    control: any
    label: string; // Required field
    required?: boolean; // Optional field
    placeholder?: string; // Optional field
    className?: string; // Optional field
    error?: string
};


type Choice = {
    _id: string
    name: string
}