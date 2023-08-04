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
