import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const PaymentTableWrapper = styled.div`
  .checkboxCol {
    padding: 5px 10px !important;
    width: 10px !important;
  }

  .transactionCol {
    width: 180px !important;
  }

  .accordionCol {
    width: 10px !important;
  }

  .statusCol {
    width: 200px !important;
  }
  .amountCol {
    width: 100px !important;
  }

  .form-check-input:not(:disabled):checked {
    box-shadow: 0px 2px 4px ${theme.checkboxShadow};
  }
  .form-check-input:checked {
    background-color: ${theme.activeNavPillText};
    border-color: ${theme.activeNavPillText};
  }
  .form-check-input {
    border: 1.5px solid ${theme.inputBorderColor};
  }
  .form-check-input:checked {
    border: 1.5px solid ${theme.activeNavPillText};
  }
`;

export default PaymentTableWrapper;
