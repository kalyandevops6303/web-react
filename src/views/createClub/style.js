import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const GroupLabelWrapper = styled.div`
  span {
    color: #b9b9c3;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const EmailVerifyModalContainer = styled.div`
  padding-left: 10rem;
  padding-right: 10rem;
`;

export const EducationInstitutionModalContainer = styled.div`
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

  .form-check-label.form-label {
    color: ${theme.checkboxLabel};
  }
`;
