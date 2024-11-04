import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';

export const NotificationIconContainer = styled.div`
  position: relative;
  border-right: 1px solid ${theme.cardHeaderBorderColor};
  margin-right: 8px;
  padding-right: 16px;
  .notification-dot {
    position: absolute;
    top: 0px;
    left: 6px;
    display: block;
    margin: auto;
    border-radius: 50%;
    height: 8px;
    width: 8px;
    background-color: ${theme.red};
  }
`;

export const MessageIconContainer = styled.div`
  position: relative;
  margin-right: 8px;
  padding-left: 16px;
  padding-right: 14px;
  cursor: pointer;
  .msg-notification-dot {
    font-weight: 500;
    position: absolute;
    top: -5px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    background-color: ${theme.red};
    color: ${theme.white};
    font-size: 10px;
  }
`;

export const DeclinedButton = styled.button`
  background-color: ${theme.red} !important;
  color: ${theme.white} !important;
  border-radius: 12px !important;
  font-size: 10px;
  padding: 4px 10px !important;
  align-self: flex-end !important;
  margin-bottom: 3px;
  border: none;
  outline: none;
`;

export const InreviewButton = styled.button`
  background-color: ${theme.orange} !important;
  color: ${theme.white} !important;
  border-radius: 12px !important;
  font-size: 10px;
  padding: 4px 10px !important;
  align-self: flex-end !important;
  margin-bottom: 3px;
  border: none;
  outline: none;
`;

export const UserDropDownWrapper = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
  .isActive {
    background: ${theme.primary}1f;
    color: ${theme.primary};
  }
  .customer-support {
    padding: 1rem 1.2rem;
    display: block;
    border-top: 1px solid ${theme.cardHeaderBorderColor};
    margin-top: 1rem;
  }
  .logout {
    color: ${theme.red};
    padding: 1rem 1.2rem;
    display: block;
    border-top: 1px solid ${theme.cardHeaderBorderColor};
  }
  .edit {
    color: ${theme.primary};
    padding: 1rem 1.2rem;
    display: block;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    &:active {
      color: white;
    }
  }

  .dropdown-item {
    width: 100%;
  }
  .edit-accordion {
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }
  .accordion-button {
    font-size: 14px !important;
    font-weight: normal !important;
  }
  .accordion-body {
    padding: 0;
    margin-bottom: 1rem;
  }
  .edit-link {
    padding: 1rem 1.2rem;
  }
`;

export const TextWrapper = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #6e6b7b;
`;
