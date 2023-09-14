import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';

export const NotificationIconContainer = styled.div`
  position: relative;
  border-right: 1px solid ${theme.cardHeaderBorderColor};
  margin-right: 8px;
  padding-right: 14px;
  .notification-dot {
    position: absolute;
    top: -10px;
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
  border-right: 1px solid ${theme.cardHeaderBorderColor};
  margin-right: 8px;
  padding-right: 14px;
  cursor: pointer;
  .msg-notification-dot {
    position: absolute;
    top: -5px;
    left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    border-radius: 50%;
    height: 12px;
    width: 12px;
    background-color: ${theme.red};
    color: ${theme.white};
    font-size: 10px;
  }
`;
