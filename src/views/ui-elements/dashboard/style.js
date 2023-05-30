import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import { CardWrapper } from './styled';

const RewardCardWrapper = styled(CardWrapper)`
  .reward-body {
    padding: 0.5rem 1.5rem 1rem 1.8rem !important;
  }
  .card-reward {
    p {
      line-height: inherit;
    }
    .avatar {
      padding: 0.5rem;
    }
    @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
      .reward-comp {
        gap: 12px;
      }
      .earn-more {
        margin-top: 52px;
      }
    }
    @media only screen and (max-device-width: 450px) {
      .reward-comp {
        gap: 12px;
      }
    }
  }
`;

const EarningCardWrapper = styled(CardWrapper)`
  .earning-head {
    padding: 1.5rem 1.5rem 0.8rem 1.5rem;
  }
  .earning-body {
    padding: 0rem 1.5rem 1rem !important;
  }
  .button-grp {
    .btn-outline-primary {
      border: 1px solid ${theme.blueBorderColor} !important;
    }
    .btn-outline-primary:not(:disabled):not(.disabled).active {
      backgorund-color: rgba(1, 133, 228.5);
    }
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    width: fit-content;
  }
  .card-amount-details {
    @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
      flex-direction: column;
      gap: 8px;
    }
    @media only screen and (max-device-width: 450px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }
`;

const EarningAmount = styled.div`
  background: ${theme.bodyBgColor};
  border-radius: 6px;
  min-width: 135px;
  padding: 0.4rem 1.7rem;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: ${theme.grayTitleColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .amount {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 23px;
    text-align: center;
    color: ${theme.bodyColor};
    word-break: break-all;
  }
  .change {
    margin-top: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.green};
  }
`;

const TimeWrapper = styled.section`
  display: flex;
  .weekdays,
  .weekends {
    ul {
      font-size: 11px;
      display: flex;
      margin: 0;
      padding: 0;
      padding-top: 7px;
      list-style-type: none;
    }
  }
  .weekdays {
    ul {
      justify-content: space-between;
    }
  }
  .weekends {
    ul {
      gap: 14px;
    }
  }
  .dot {
    height: 7px;
    width: 7px;
    display: block;
    background: rgba(217, 217, 217, 0.5);
    border-radius: 50%;
    margin: auto;
    margin-bottom: 6px;
  }
  .active {
    background: #28c76f;
  }
  .line {
    width: 1px;
    background: ${theme.borderInputColor};
    margin: 0 2rem;
    @media only screen and (max-device-width: 1340px) {
      margin: 0 1.6rem;
    }
  }
  @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
    flex-direction: column;
    gap: 16px;
    .weekends {
      ul {
        gap: 32px;
      }
    }
  }
  @media only screen and (max-device-width: 450px) {
    flex-direction: column;
    gap: 16px;
    .weekends {
      ul {
        gap: 32px;
      }
    }
  }
`;
export { CardWrapper, EarningAmount, EarningCardWrapper, RewardCardWrapper, TimeWrapper };
