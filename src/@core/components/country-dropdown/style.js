import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const CountryDropdownWrapper = styled.div`
  .country__select__control {
    padding-left: 12px;
    font-size: 12px;
    min-width: 110px;
    max-width: 110px;
    border: 1px solid ${theme.borderInputColor};
    box-shadow: none;
    cursor: pointer;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid ${theme.borderInputColor};
      box-shadow: none;
    }
  }
  .country__select__value-container {
    display: contents;
    padding-left: 10px;
  }
  .country__select__indicator-separator {
    display: none;
  }
  .country__select__input-container {
    margin: 0px;
  }
  .country__select__menu {
    width: 220px;
  }
  .country__select__indicator {
    padding-left: 0px;
    svg {
      color: ${theme.gray};
    }
  }
  .custom-option.focused {
    background-color: ${theme.switchBgColor};
  }
  .mobile-input {
    margin-left: 1rem;
  }
  .country-code {
    padding-left: 4px;
    vertical-align: middle;
  }
  .custom-option {
    padding: 3px 0 3px 10px;
    font-size: 13px;
  }
`;
export default CountryDropdownWrapper;
