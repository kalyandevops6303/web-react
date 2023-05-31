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
      cursor: default;
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
`;

export const AccountImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${theme.navPillText};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.red};
    margin-left: 4px;
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

  .select__multi-value__remove {
    svg {
      color: ${theme.white};
    }
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
`;

export const UploadIconContainer = styled.div`
  background: ${theme.uploadIconBackground};
  border-radius: 50%;
  padding: 4px 5px;
  width: fit-content;
`;
