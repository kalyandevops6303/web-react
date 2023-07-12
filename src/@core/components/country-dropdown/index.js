/* eslint-disable react/require-default-props */
import React from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import CountryFile from '../../../utility/constants/CountryList.json';
import CountryDropdownWrapper from './style';

const options = CountryFile.map((country) => ({
  value: country.dial_code, // Add the country code as the value
  label: country.label, // Use the country name as the label
  code: country.code,
  dial_code: country.dial_code,
  _id: country._id,
}));

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
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <CountryDropdownWrapper>
      <Select
        className="select-class"
        classNamePrefix="country__select"
        style={{
          fontSize: '13px',
          paddingLeft: '12px',
        }}
        options={options}
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
          Input: MaxLengthInput,
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
