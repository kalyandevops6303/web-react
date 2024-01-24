import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

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

const TabWrapper = styled.div`
  /* Style the tab */
  .tab {
    overflow: hidden;
    display: flex;
    gap: 2rem;
    margin-bottom: 26px;
    border-bottom: 1px solid #ccc;
  }

  .gap-5 {
    gap: 5rem;
  }

  /* Style the buttons inside the tab */
  .tablink {
    cursor: pointer;
    padding: 16px 8px;
    font-size: 16px;
  }

  .active-tablink {
    border-bottom: 2px solid ${theme.activeNavPillText};
    color: ${theme.activeNavPillText};
    font-weight: 600;
  }

  .color-primary {
    color: ${theme.primary} !important;
  }
  .color-danger {
    color: ${theme.errorColor} !important;
  }

  .tabcontent {
    display: none;
    padding: 6px 12px;
  }

  .active-tabcontent {
    display: block !important;
  }

  .gray-card {
    padding: 36px;
    background: #fafafa !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .white-card {
    background: #fff;
    padding: 26px;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06) !important;
  }

  .medium-shadow {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06) !important;
  }

  .py-16 {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .role-text {
    color: ${theme.gray};
    font-size: 12px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .table {
    background: #fff;
    border: solid 1px #e9ecef;
  }

  hr {
    width: 100%;
  }

  .raise-dispute-btn {
    color: ${theme.errorColor} !important;
    border: none !important;
    background: none !important;
    padding: 11px 20px !important;
  }
  .raise-dispute-btn:hover {
    box-shadow: none !important;
  }
  .raise-dispute-btn:active,
  .raise-dispute-btn:focus {
    background: none !important;
  }
`;

export { UserNameWrapper, DocumentsWrapper, TabWrapper };
