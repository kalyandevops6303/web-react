import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const HeaderContainer = styled.div`
  box-shadow: 0px 2px 8px ${theme.headerShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.headerBackground};
  width: 100%;
  padding: 15px 0;
  .logo-wrap {
    display: flex;
    font-size: 14px;
    .version {
      margin-top: 0.4rem;
    }
    .onboarding-header-logo {
      max-height: 28px;
    }
  }
`;

export const TabsContainer = styled.div`
  .nav-pills .nav-link.active {
    background: ${theme.activeNavPillBackground};
    border-radius: 5px;
    border: none;
    box-shadow: none;

    svg {
      stroke: ${theme.activeNavPillText};
    }

    span {
      color: ${theme.activeNavPillText};
    }
  }

  .nav-pills .nav-link {
    svg {
      stroke: ${theme.navPillText};
    }

    span {
      color: ${theme.navPillText};
    }
  }

  .nav-item {
    .nav-link {
      cursor: ${(props) => (props.isEditing ? 'pointer' : 'default')};
    }
  }
`;

export const AccountDetailsFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.red};
    margin-left: 4px;
  }

  .filled-form-control {
    border: 1px solid ${theme.inputBorder};
  }

  .form-control:disabled {
    background-color: ${theme.inputBackground};
  }

  .input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
    background-color: ${theme.inputBackground};
    border-top: 1px solid ${theme.inputBorder};
    border-left: 1px solid ${theme.inputBorder};
    border-bottom: 1px solid ${theme.inputBorder};
    border-right: none;
  }

  .image-container {
    .btn {
      margin-left: 20px;
      margin-right: 10px;
    }

    .file-input {
      display: none;
    }

    .selected-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
  }

  .custom-country-disabled-dropdown {
    .country__select__control--is-disabled {
      background-color: ${theme.inputBackground};
      border: 1px solid ${theme.inputBorder};

      .country__select__indicators {
        display: none;
      }

      .country__select__value-container--has-value {
        .custom-value {
          img {
            margin-right: 8px;
          }
        }
      }
    }
  }
`;

export const AccountImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${theme.navPillText};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 5rem;
  }
`;

export const ProfileFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.red};
    margin-left: 4px;
  }

  .disabled-input {
    background-color: #f2f2f2 !important;
    cursor: not-allowed !important;
    border: none !important;
  }

  // dropdown styles
  .select__placeholder {
    font-size: 12px;
    color: ${theme.textMuted};
  }
  .select__indicator {
    svg {
      color: ${theme.textMuted};
    }
  }

  .select__control {
    border-color: ${theme.inputBorderColor};

    svg {
      color: ${theme.textMuted};
    }

    .select__placeholder {
      color: ${theme.textMuted};
    }
  }

  .upload-button {
    width: fit-content;

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
  }

  .select__multi-value .select__multi-value__label {
    padding: 0.26rem 0.3rem 0.26rem 0.6rem;
  }

  .select__multi-value .select__multi-value__remove {
    padding-left: 0.5rem;
  }

  .select__multi-value__remove {
    svg {
      color: ${theme.white};
    }
  }

  .select__multi-value {
    margin: 0.1rem 0.7rem 0.1rem 0;
  }

  .time-zone-border {
    border-bottom: 2px solid ${theme.infoIcon};
  }

  .form-check-input:not(:disabled):checked {
    box-shadow: 0px 2px 4px ${theme.checkboxShadow};
  }

  .form-check-input:checked {
    background-color: ${theme.activeNavPillText};
    border-color: ${theme.activeNavPillText};
  }

  .buttons-row-border {
    border-bottom: 1px solid ${theme.checkboxLabel};
  }

  .custom-checkbox-border {
    .form-check-input {
      border: 1.5px solid ${theme.inputBorderColor};
    }
    .form-check-input:checked {
      border: 1.5px solid ${theme.activeNavPillText};
    }
  }

  .form-check-label.form-label {
    color: ${theme.checkboxLabel};
  }

  .checkbox-custom-margin {
    margin-right: 50px;
  }

  .image-container {
    .btn {
      margin-left: 20px;
      margin-right: 10px;
    }

    .file-input {
      display: none;
    }

    .selected-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
  }
  .order-list {
    li {
      margin-top: 15px;
    }
  }

  .form-control.is-invalid {
    background-image: none;
  }
`;

export const UploadIconContainer = styled.div`
  background: ${theme.uploadIconBackground};
  border-radius: 50%;
  padding: 4px 5px;
  width: fit-content;
`;

export const BackButtonContainer = styled.div`
  .upload-button {
    width: fit-content;

    .add-icon-container {
      background: ${theme.activeNavPillText};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: fit-content;
    }

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
  }
`;

export const AccountCreatedImageContainer = styled.div`
  margin: -30px 0 -70px 20px;
`;
