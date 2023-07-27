import styled from 'styled-components';

export const BadgeGroupWrap = styled.div`
  .badge-box-wrap {
    .info-key {
      font-weight: 400;
      margin-right: 1rem;
      font-size: 0.8rem;
    }

    .bg-light-success-2 {
      background: ${(props) => props.theme.darkGreenBgColor};
      color: ${(props) => props.theme.darkGreenColor};
    }

    .badge-box {
      max-height: 2rem;
      overflow: hidden;
      width: 100%;

      .info-key {
        font-weight: 400;
        margin-right: 1rem;
        font-size: 0.75rem;
      }

      .badge {
        margin: 0 0.5rem 0.5rem 0;
        font-size: 0.75rem;
      }
    }
  }

  .truncate-1 {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
