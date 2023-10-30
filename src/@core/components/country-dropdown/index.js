/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import  { components } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import ReactCountryFlag from '../../../lib/country-flag';
import CountryDropdownWrapper from './style';
import { countriesService } from '../../../services/staticServices';

const CustomOption = ({ innerProps, data, isFocused, isSelected }) => (
  <div className={`custom-option ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}`} {...innerProps}>
    <ReactCountryFlag
      countryCode={data.code}
      svg
      style={{
        width: '2em',
        height: '2em',
      }}
      title={data.code}
    />
    <span className="country-code">
      {data.label}({data.dial_code})
    </span>
  </div>
);
CustomOption.propTypes = {
  innerProps: PropTypes.object,
  data: PropTypes.object,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

const CustomValue = ({ innerProps, data }) => (
  <div className="custom-value" {...innerProps}>
    <ReactCountryFlag
      countryCode={data.code}
      svg
      style={{
        width: '2em',
        height: '2em',
        marginRight:'2px'
      }}
      title={data.code}
    />
    <span className="country-code">{data.dial_code}</span>
  </div>
);
CustomValue.propTypes = {
  innerProps: PropTypes.object,
  data: PropTypes.object,
};
const MaxLengthInput = (props) => <components.Input {...props} maxLength={8} />;

const CountryDropdown = ({ selectedCountry, setSelectedCountry, disabled }) => {
  const [countriesOptions, setCountriesOptions] = useState(null);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const loadCountriesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, countriesOptions),
      };
    }
    try {
      const response = await countriesService();

      const options = response?.data?.data?.map((country) => (
        { 
          label: country.name,
          dial_code: `+${country.dial_code}`,
          code: country.code,
          _id: country._id,
         }
        ));

      setCountriesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  return (
    <CountryDropdownWrapper>
      <AsyncPaginate
        className="select-class"
        classNamePrefix="country__select"
        style={{
          fontSize: '13px',
          paddingLeft: '12px',
        }}
        loadOptions={loadCountriesOptions}
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
          Input: MaxLengthInput,
          LoadingIndicator:() => null
        }}
        value={selectedCountry}
        onChange={handleCountryChange}
        isSearchable
        isDisabled={disabled}
      />
    </CountryDropdownWrapper>
  );
};
CountryDropdown.propTypes = {
  selectedCountry: PropTypes.object,
  setSelectedCountry: PropTypes.object,
  disabled: PropTypes.bool,
};
export default CountryDropdown;
