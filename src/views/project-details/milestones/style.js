import styled from 'styled-components';

const UserNameWrapper = styled.div`
  .table-user-name {
    @media (min-width: 992px) and (max-width: 1200px) {
      max-width: 3rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 890px) {
      max-width: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
`;
// eslint-disable-next-line import/prefer-default-export
export { UserNameWrapper };
