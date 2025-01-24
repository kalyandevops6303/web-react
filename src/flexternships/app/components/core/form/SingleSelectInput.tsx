import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { Controller } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import { PaginatedData } from '@/flexternships/services/user-management';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { isEmpty } from 'lodash';

export default function SingleSelectInput(props: InputProps) {
  const {
    name,
    control,
    label,
    required,
    placeholder = 'Select option',
    className,
    loadOptions,
    pageSize = 10,
    error,
    maxMenuHeight,
    disabled = false,
    defaultFirstOption = false,
    allowSelectionOfEmptyValue = false,
    ...restProps
  } = props;

  const loadHandler = async (
    search: string,
    _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
    additional: { page: number } | undefined = { page: 1 },
    onChange: (value: { _id: string; name: string }) => void,
  ) => {
    const page = additional.page;
    const data = await loadOptions(page, pageSize, search);
    if (defaultFirstOption && data.data.length > 0) {
      onChange({ _id: data.data[0]._id, name: data.data[0].name });
    }
    return {
      options: data.data.map((choice) => ({ label: choice.name, value: choice._id })),
      hasMore: data.metadata.has_next_page,
      additional: { page: page + 1 },
    };
  };

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
            {...restProps}
            defaultOptions={defaultFirstOption}
            value={
              (!isEmpty(value) && !isEmpty(value.name) && !isEmpty(value._id)) ||
              (allowSelectionOfEmptyValue && !isEmpty(value) && value._id === '')
                ? { label: value.name, value: value._id }
                : null
            }
            loadOptions={(search, loadedOptions, additional: { page: number } | undefined) =>
              loadHandler(search, loadedOptions, additional, onChange)
            }
            onChange={(newValue) => {
              if (newValue) {
                onChange({ _id: newValue.value, name: newValue.label });
              } else {
                onChange(null);
              }
            }}
            isDisabled={disabled}
            maxMenuHeight={maxMenuHeight}
            placeholder={placeholder} // Direct string for placeholder
            classNames={{
              control: () => `
                ${error ? Styles.formInputError : Styles.formInputDefault}
                ${disabled ? 'bg-grey-50' : ''}
                p-0.5
              `,
              placeholder: () => 'text-xs font-normal leading-5.5 text-grey-200', // Styling applied here
              singleValue: () => 'text-sm text-grey-600 font-normal leading-5.5 not-italic',
              option: (state) => `
                text-xs font-normal leading-5 not-italic
                ${
                  state.isSelected
                    ? 'bg-trublue-secondary-500 text-white'
                    : state.isFocused
                    ? 'bg-trublue-secondary-50'
                    : 'bg-white text-grey-600'
                }
              `,
              dropdownIndicator: () => (disabled ? 'text-grey-muted' : 'text-grey-300'),
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
  maxMenuHeight?: number;
  disabled?: boolean;
  defaultFirstOption?: boolean;
  allowSelectionOfEmptyValue?: boolean;
  isClearable?: boolean;
};

type OptionType = {
  label: string;
  value: string;
};
