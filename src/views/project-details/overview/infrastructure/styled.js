import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .bg-secondary {
    background-color: ${theme.lightBlueBgColor} !important;
    color: ${theme.lightBlueColor} !important;
  }
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ebe9f1;
  background: #fff;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
  }
`;
