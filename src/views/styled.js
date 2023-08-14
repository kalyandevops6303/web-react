import styled from 'styled-components';
import theme from '../configs/themeVariables';

const CardWrapper = styled.div`
  .card-header {
    padding: 1.6rem 1.8rem;
  }
  .card-body {
    padding: 0.5rem 1.8rem 1rem !important;
  }

  .time-card {
    min-height: 192px;
    .card-body {
      font-size: 13.5px;
    }
  }
  .earn-more {
    margin-top: 38px;
  }
`;

const Header = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;
  color: #5e5873;
  margin-bottom: ${(props) => (props.isTopCards ? '1.5rem' : '0.4rem')};
`;

const CustomBadge = styled.span`
  .light-blue {
    background: ${theme.lightBlueBgColor} !important;
    color: ${theme.lightBlueColor};
  }
  .OPEN {
    background: ${theme.succesGreenBg};
    color: ${theme.succesGreenColor};
  }
  .IN_REVIEW {
    background: ${theme.orange}1f;
    color: ${theme.orange};
  }
  .TERMINATED {
    background: ${theme.darkRedColor}1f;
    color: ${theme.darkRedColor};
  }
  .CLOSED,
  .LISTING_EXPIRED {
    background: ${theme.disabledGrayColor}1f;
    color: ${theme.disabledGrayColor};
  }
  .OPEN_PROJECT {
    background: ${theme.blueColor}1f !important;
    color: ${theme.blueColor};
    border: ${(props) => props.bordered && '1px solid'};
  }
  .INVITED {
    color: ${theme.purpleColor};
    background: ${theme.purpleColor}1f !important;
  }
`;

const FormWrapper = styled.div`
  .select__placeholder,
  .wide__placeholder {
    font-size: 12px;
    color: ${theme.textMuted};
  }
  .select__indicator,
  .wide__indicator {
    svg {
      color: ${theme.textMuted};
    }
  }
`;
const SecondaryFiltersWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.4rem;
  margin-bottom: 2rem;
  .marketplace-search {
    min-width: 18rem;
  }
  .select__control {
    min-width: 12rem;
    width: 12rem;
  }
  .wide__control {
    min-width: 12rem;
    width: 12rem;
  }
  .wide__menu {
    width: 250px;
  }
  .select__clear-indicator {
    padding-right: 0;
  }

  .view-label {
    font-size: 14px;
  }

  .tooltip-inner {
    background-color: ${theme.tooltipColor};
  }

  .tooltip.right .tooltip-arrow {
    border-right: 5px solid ${theme.tooltipColor};
  }

  .reset-btn {
    color: ${theme.activeNavPillText};
    margin-top: auto;
    display: flex;
    gap: 6px;
    .reset-icon {
      background: ${theme.activeNavPillText}1f; //rest blue bg
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
    .reset-label {
      color: ${theme.activeNavPillText};
      font-size: 15px;
      display: flex;
      align-items: center;
    }
  }

  @media only screen and (max-device-width: 600px) {
    .select__control {
      width: 100%;
      margin-bottom: 1rem;
    }
    .wide__control {
      width: 100%;
      margin-bottom: 1rem;
    }
    .wide__menu {
      width: 100%;
    }
    .reset-btn {
      width: 100%;
    }
    #popoverButton {
      width: 12rem;
    }
  }
`;

const TimeWrapper = styled.section`
  display: flex;
  .weekdays,
  .weekends {
    margin-top: auto;
    width: 50%;

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
    height: 8px;
    width: 8px;
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
export { CardWrapper, Header, CustomBadge, FormWrapper, SecondaryFiltersWrap, TimeWrapper };
