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

const DocumentsWrapper = styled.div`
  .truncated-filename {
    max-width: 9rem;
    display: inline-block;
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .truncate-1 {
      max-width: 2rem;
      display: inline-block;
      display: block;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { UserNameWrapper, DocumentsWrapper };
