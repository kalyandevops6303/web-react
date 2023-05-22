import React from "react";
import Select, { components } from "react-select";
import ReactCountryFlag from "react-country-flag";
import CountryFile from "../../../utility/constants/CountryList.json";
import { CountryDropdownWrapper } from "./style";

export const CountryDropdown = ({
  selectedCountry,
  setSelectedCountry,
  disabled,
}) => {
  const CustomOption = ({ innerProps, label, data, isFocused, isSelected }) => (
    <div
      className={`custom-option ${isSelected ? "selected" : ""} ${
        isFocused ? "focused" : ""
      }`}
      {...innerProps}
    >
      <ReactCountryFlag
        countryCode={data.code}
        svg
        style={{
          width: "2em",
          height: "2em",
        }}
        title={data.code}
      />
      <span className="country-code">
        {data.label}({data.dial_code})
      </span>
    </div>
  );

  const CustomValue = ({ innerProps, label, data }) => (
    <div className="custom-value" {...innerProps}>
      <ReactCountryFlag
        countryCode={data.code}
        svg
        style={{
          width: "2em",
          height: "2em",
        }}
        title={data.code}
      />
      <span className="country-code">{data.dial_code}</span>
    </div>
  );

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  const MaxLengthInput = (props) => (
    <components.Input {...props} maxLength={8} />
  );

  return (
    <CountryDropdownWrapper>
      <Select
        className="select-class"
        style={{
          fontSize: "13px",
          paddingLeft: "12px",
        }}
        options={CountryFile}
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
