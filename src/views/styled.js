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
  .open-listing-color {
    background: ${theme.succesGreenBg};
    color: ${theme.succesGreenColor};
  }
`;

const FormWrapper = styled.div`
  .select__placeholder {
    font-size: 12px;
    color: ${theme.textMuted};
  }
  .select__indicator {
    svg {
      color: ${theme.textMuted};
    }
  }
`;
const SecondaryFiltersWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .marketplace-search {
    min-width: 18rem;
  }
  .select__control {
    min-width: 14rem;
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
`;
export { CardWrapper, Header, CustomBadge, FormWrapper, SecondaryFiltersWrap };
