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
  .badge {
    border-radius: ${(props) => (props.rounded ? '10px !important' : 'none')};
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .light-blue,
  .NEW,
  .ACTIVE {
    background: ${theme.lightBlueBgColor} !important;
    color: ${theme.lightBlueColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.lightBlueColor}` : 'none')};
  }
  .OPEN {
    background: ${theme.lightGreenBg} !important;
    color: ${theme.lighGreenColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.lighGreenColor}` : 'none')};
  }
  .COMPLETED,
  .ACCEPTED,
  .CREATED,
  .YET_TO_START,
  .TO_BE_LISTED {
    background: ${theme.lightGreenBg} !important;
    color: ${theme.lighGreenColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.lighGreenColor}` : 'none')};
  }
  .ON_GOING,
  .REVIEWED,
  .IN_PROGRESS,
  .DRAFT {
    background: ${theme.orangeColor}1f;
    color: ${theme.orangeColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.orangeColor}` : 'none')};
  }
  .IN_REVIEW {
    background: ${theme.orange}1f;
    color: ${theme.orange};
    border: ${(props) => (props.bordered ? `1px solid ${theme.orange}` : 'none')};
  }
  .TERMINATED,
  .REJECTED,
  .LISTING_EXPIRED {
    background: ${theme.darkRedColor}1f;
    color: ${theme.darkRedColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.darkRedColor}` : 'none')};
  }
  .CLOSED {
    background: ${theme.disabledGrayColor}1f;
    color: ${theme.disabledGrayColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.disabledGrayColor}` : 'none')};
  }
  .OPEN_PROJECT {
    background: ${theme.lightGreenBg}1f !important;
    color: ${theme.lighGreenColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.lighGreenColor}` : 'none')};
  }
  .INVITED {
    color: ${theme.purpleColor};
    background: ${theme.purpleColor}1f !important;
    border: ${(props) => (props.bordered ? `1px solid ${theme.purpleColor}` : 'none')};
  }
  .UPDATED {
    color: ${theme.purpleColor};
    background: ${theme.purpleColor}1f !important;
  }
  .PENDING,
  .PAYMENT_DUE {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.pendingOrangeColor}1f`)} !important;
    color: ${theme.pendingOrangeColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.pendingOrangeColor}` : 'none')};
  }
  .INITIATED,
  .PAYMENT_INITIATED {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.royalBlueColor}1f`)} !important;
    color: ${theme.royalBlueColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.royalBlueColor}` : 'none')};
  }
  .CHECKOUT_PAID {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.fundedBlueColor}1f`)} !important;
    color: ${theme.fundedBlueColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.fundedBlueColor}` : 'none')};
  }
  .TRANSFER_PAID {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.green}1f`)} !important;
    color: ${theme.green};
    border: ${(props) => (props.bordered ? `1px solid ${theme.green}` : 'none')};
  }
  .PAID_AMOUNT {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.green}1f`)} !important;
    color: ${theme.green};
    border: ${(props) => (props.bordered ? `1px solid ${theme.green}` : 'none')};
  }
  .FAILED,
  .PAYMENT_FAILED {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.red}1f`)} !important;
    color: ${theme.red};
    border: ${(props) => (props.bordered ? `1px solid ${theme.red}` : 'none')};
  }
  .RETRY_PAYMENT {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.darkRedColor}1f`)} !important;
    color: ${theme.darkRedColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.darkRedColor}` : 'none')};
  }

  .PAYMENT_PROCESSING,
  .PROCESSING {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.purpleColor}1f`)} !important;
    color: ${theme.purpleColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.purpleColor}` : 'none')};
  }
  .PAYMENT_SUCCESSFUL,
  .SUCCESSFUL {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.succesGreenColor}1f`)} !important;
    color: ${theme.succesGreenColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.succesGreenColor}` : 'none')};
  }
  .FUNDS_AVAILABLE,
  .FUNDED {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.fundedBlueColor}1f`)} !important;
    color: ${theme.fundedBlueColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.fundedBlueColor}` : 'none')};
  }
  .NOT_FUNDED {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.disabledGrayColor}1f`)} !important;
    color: ${theme.disabledGrayColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.disabledGrayColor}` : 'none')};
  }

  .P {
    background: ${(props) => (props.bordered ? '#fff' : `${theme.royalBlueColor}1f`)} !important;
    color: ${theme.royalBlueColor};
  }
  .rounded-corner {
    border-radius: 1.0625rem;
    margin: 2px;
    padding-right: 8px;
    padding-left: 8px;
  }
`;

const FormWrapper = styled.div`
  .select__placeholder,
  .wide__placeholder,
  .name__placeholder {
    font-size: 12px;
    color: ${theme.textMuted};
  }
  .select__indicator,
  .wide__indicator,
  .name__indicator {
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
    cursor: pointer;
  }
  .wide__control {
    min-width: 12rem;
    width: 12rem;
    cursor: pointer;
  }
  .name__control {
    min-width: 14rem;
    width: 14rem;
    cursor: pointer;
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
    .wide__control,
    .name__control {
      width: 100%;
      margin-bottom: 1rem;
    }
    .wide__menu,
    .name__menu {
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
    background: ${theme.dotBg};
    border-radius: 50%;
    margin: auto;
    margin-bottom: 6px;
  }
  .active {
    background: ${theme.green};
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

const CreateBidRadioOption = styled.div`
  min-height: 210px;
  padding: 1rem;
  border-radius: 6px;
  border: ${(props) => (props.active ? `1px solid ${theme.activeNavPillText}` : `1px solid ${theme.darkBorder}`)};
  background-color: ${(props) => (props.active ? `${theme.lightBlueBgRadio}` : `${theme.lightGrayBgRadio}`)};

  .form-check-input:not(:disabled):checked {
    box-shadow: 0px 2px 4px ${theme.checkboxShadow};
  }

  .form-check-input:checked {
    background-color: ${theme.activeNavPillText};
    border-color: ${theme.activeNavPillText};
  }

  .label {
    p {
      color: ${(props) => (props.active ? `${theme.activeNavPillText}` : `${theme.secondary}`)};
    }
  }
`;

const GrayBorderContainer = styled.div`
  border-bottom: 1px solid ${theme.cardHeaderBorderColor};

  .custom-header-margin {
    margin-top: -1.6rem;
  }

  .members-count-text {
    color: ${theme.headingTextColor};
  }
`;

const InviteHeadContainer = styled.div`
  border-bottom: 1px solid ${theme.cardHeaderBorderColor};

  .custom-header-margin {
    margin-top: -2.2rem;
  }
`;

export const BlueNavsContainer = styled.div`
  .nav {
    border-radius: 0;
  }

  .nav-link {
    font-weight: 400;
  }

  .nav-tabs .nav-link.active {
    border-bottom: 3px solid ${theme.activeNavPillText} !important;
    margin-bottom: -2px;
    color: ${theme.activeNavPillText};
    font-weight: 600;
  }

  .nav-tabs .nav-link:after {
    background: none !important;
  }
`;

const GrayCardWrapper = styled.div`
  .card-header {
    background-color: ${theme.headerBackground};
  }

  .card-body {
    background-color: ${theme.headerBackground};
  }

  .white-card-bg {
    .card-body {
      border-radius: 6px;
      background-color: ${theme.white};
      box-shadow: 0px 4px 24px 0px ${theme.cardShadowLight};
    }

    .text-blue {
      color: ${theme.activeNavPillText};
    }
  }
`;
const TeamCreatedModalImageWrapper = styled.section`
  width: ${(props) => (props.width ? '46px' : '60px')};
  height: ${(props) => (props.width ? '46px' : '60px')};

  border-radius: 50%;
  border: 1px solid ${theme.navPillText};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TeamCreatedModalLogoImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const Elevate = styled.div`
  transition: box-shadow 0.3s; /* Optional: Add a transition for a smoother effect on hover */
  border-radius: 0.375rem;
  box-shadow: ${(props) => (props.active === true ? `0px 0px 0px 1px ${theme.blueBorderColorv2}` : '')};
  &:hover {
    box-shadow: ${(props) => (props.active === false ? '' : `0px 0px 0px 1px ${theme.blueBorderColorv2}`)};
  }
`;
const ElevateShadow = styled(Elevate)`
  &:hover {
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.08); /* Second box shadow */
  }
`;

const CircularBackButtonContainer = styled.div`
  .back-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.activeNavPillText};
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
  p {
    color: ${theme.activeNavPillText};
  }
`;

const TooltipWrapper = styled.div`
  .tooltip-style {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
  }
  p {
    padding: 0;
    margin: 0;
  }
`;

export {
  ElevateShadow,
  CardWrapper,
  Header,
  CustomBadge,
  FormWrapper,
  SecondaryFiltersWrap,
  TimeWrapper,
  CreateBidRadioOption,
  GrayBorderContainer,
  InviteHeadContainer,
  GrayCardWrapper,
  TeamCreatedModalImageWrapper,
  TeamCreatedModalLogoImg,
  Elevate,
  CircularBackButtonContainer,
  TooltipWrapper,
};
