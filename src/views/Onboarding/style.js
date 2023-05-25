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
`;

export const AccountDetailsFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.asterisk};
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
