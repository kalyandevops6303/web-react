import styled from 'styled-components';

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
export { CardWrapper, Header };
