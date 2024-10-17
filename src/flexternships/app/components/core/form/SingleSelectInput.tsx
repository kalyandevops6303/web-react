import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { Controller } from "react-hook-form";
import { AsyncPaginate } from 'react-select-async-paginate';
import { PaginatedData } from '@/flexternships/services/static-data-services';
import { GroupBase, OptionsOrGroups, SingleValue } from 'react-select';

export default function SingleSelectInput(props: InputProps) {
  const {
    name,
    control,
    label,
    required,
    placeholder,
    className,
    loadOptions,
    pageSize,
    error
  } = props;

  const loadHandler = async (search: string, loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>, additional: { page: number } | undefined) => {
    const page = additional?.page || 1;
    const data = await loadOptions(page, pageSize ?? 10, search);
    return {
      options: data.data.map(choice => ({ label: choice.name, value: choice._id })),
      hasMore: data.metadata.has_next_page,
      additional: { page: page + 1 }
    }
  }

  return (
    <div className={`${Styles.formFieldContainer} ${className ?? ''}`}>
      <div className={Styles.formInputLabelContainer}>
        <label className={Styles.formInputLabel}>{label}</label>
        {required && <span className={Styles.requiredAsterisk}>*</span>}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <AsyncPaginate
            value={(value && value.name && value._id) ? { label: value.name, value: value._id } : null}
            loadOptions={loadHandler}
            onChange={(newValue) => {
              if (newValue) {
                onChange({ _id: newValue.value, name: newValue.label });
              } else {
                onChange(null);
              }
            }}
            maxMenuHeight={220}
            placeholder={placeholder ?? 'Select options'}  // Direct string for placeholder
            classNames={{
              control: (state) => `
                ${error ? Styles.formInputError : Styles.formInputDefault}
                p-0.5
              `,
              placeholder: () => 'text-xs font-normal leading-5.5 text-grey-200', // Styling applied here
              singleValue: () => 'text-sm text-grey-600 font-normal leading-5.5 not-italic',
              option: (state) => `
                text-xs font-normal leading-5 not-italic
                ${state.isSelected ? 'bg-trublue-secondary-500 text-white' : state.isFocused ? 'bg-trublue-secondary-50' : 'bg-white text-grey-600'}
              `,
              dropdownIndicator: () => 'text-grey-300',
              indicatorSeparator: () => 'hidden',
            }}
          />

        )}
      />
      {error && <p className={Styles.formInputErrorMessage}>{error}</p>}
    </div>
  );
}

type InputProps = {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  pageSize?: number;
  loadOptions: (page: number, pageSize: number, search: string) => Promise<PaginatedData>;
  error?: string;
};

type OptionType = {
  label: string;
  value: string;
}
