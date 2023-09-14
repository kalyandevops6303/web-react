import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const DisputeFormContainer = styled.div`
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

export const DisputeDetailsContainer = styled.div`
  .blue-btn {
    font-size: 16px;
    color: ${theme.activeNavPillText};
  }

  .upload-btn {
    width: fit-content;

    h5 {
      color: ${theme.activeNavPillText};
    }
  }

  a {
    color: ${theme.headingTextColor};
  }
`;

export const DisputeClosedModalContainer = styled.div`
  .text-blue {
    color: ${theme.lightBlueColor};
  }
`;

export const RepliesContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;
