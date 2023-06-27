import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const BorderCardContainer = styled.div`
  .card {
    border-left: ${(props) => `2px solid ${theme[props.priorityColor]}`};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .notification-title {
    color: ${(props) => theme[props.priorityColor]};
  }
`;

export const NotificationBadgeContainer = styled.div`
  background: ${(props) => theme[props.priorityColor]};
  border-radius: 50%;
  padding: 5px 6px;

  .badge {
    right: -8px !important;
  }

  .badge-up {
    min-width: 8px !important;
    min-height: 8px !important;
    top: -3px !important;
    border: 0.1px solid ${theme.white};
  }
`;
