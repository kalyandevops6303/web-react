import Styles from '@flexternships/styles/components/core/form-fields.module.css';
import { Controller } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import { PaginatedData } from '@/flexternships/services/user-management';
import { GroupBase, OptionsOrGroups } from 'react-select';

export default function MultiSelectInput(props: InputProps) {
  const {
    name,
    control,
    label,
    required,
    placeholder = 'Select options',
    className,
    loadOptions,
    pageSize = 10,
    error,
    maxMenuHeight,
  } = props;

  const loadHandler = async (
    search: string,
    _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
    additional: { page: number } | undefined = { page: 1 },
  ) => {
    const page = additional.page;
    const data = await loadOptions(page, pageSize, search);
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
            isMulti
            value={value?.map((item: Choice) => ({ label: item.name, value: item._id }))}
            loadOptions={loadHandler}
            onChange={(newValue) => {
              onChange(newValue.map((item) => ({ _id: item.value, name: item.label })));
            }}
            maxMenuHeight={maxMenuHeight}
            placeholder={placeholder}
            classNames={{
              control: () => `
                                ${error ? Styles.formInputError : Styles.formInputDefault}
                                p-0.5
                            `,
              placeholder: () => 'text-xs font-normal leading-5.5 text-grey-200',
              multiValue: () => 'bg-trublue-secondary-500 bg-opacity-70 text-white rounded',
              multiValueLabel: () => 'text-xs font-medium leading-5 text-white',
              multiValueRemove: () => 'text-white hover:cursor-pointer bg-transparent',
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
              dropdownIndicator: () => 'text-grey-300 cursor-pointer',
              indicatorSeparator: () => 'text-grey-300',
              clearIndicator: () => 'text-grey-300 cursor-pointer',
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
};

type OptionType = {
  label: string;
  value: string;
};

type Choice = {
  _id: string;
  name: string;
};
