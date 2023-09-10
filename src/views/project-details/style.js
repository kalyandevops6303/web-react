import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const LeftSidebarProjectDetailsWrapper = styled.div`
  // header
  .status-head {
    .days {
      color: ${theme.red};
      font-weight: 500;
    }
  }
  .title {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
    margin-top: 1.2rem;
  }

  // user details

  .project-details-card-photo {
    height: 2.5rem;
    border-radius: 50%;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }

  //stats
  .stats {
    .stat-avatar {
      padding: 0.3rem;
      height: fit-content;
    }
    .date {
      svg {
        color: ${theme.royalBlueColor};
      }
    }
    .stat-value {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.3rem; /* 164.286% */
      color: ${theme.headingTextColor};
    }
    .stat-key {
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1.125rem; /* 150% */
    }
  }

  // Project-details
  .project-details {
    .main-title {
      font-weight: 400 !important;
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
      padding-bottom: 0.2rem;
      font-size: 1.25rem;
    }
  }
  .info-key {
    font-weight: 300;
    margin-right: 1rem;
  }

  // Project-desc
  .project-desc {
    .project-desc-title {
      font-weight: 400;
    }
    .value {
      font-weight: 300;
    }
  }
`;

const BidDetailsWrap = styled.div`
  .report-text {
    color: ${theme.red};
  }

  .main-card-title {
    padding: 1.5rem 1.5rem 0.8rem 1.5rem !important;
    font-size: 1.25rem;
    margin-bottom: 0 !important;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }
  .bid-eta {
    display: flex;
    gap: 2rem;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    .value {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0;
    }
    .key {
    }
  }

  // milestone

  .milestone-table {
    border: 1px solid ${theme.cardHeaderBorderColor};
    th {
      padding: 1rem 1.7rem;
    }
    td {
      font-weight: 500;
      padding: 1rem 1.7rem;
    }
  }
  .milestone-title {
    font-weight: 300;
    font-size: 1.2rem;
  }

  // Back wrap
  .back-wrap {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
    .chevron-left-bg {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: ${theme.activeColor}1f;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .back-text {
      color: ${theme.activeColor};
    }
  }
  .edit-bid-btn {
    color: ${theme.activeNavPillText};
    font-size: 16px;
    font-weight: 500;
    text-decoration: underline;
  }
`;
const BidWrapper = styled.div`
  .basic-title {
    padding-left: 1.2rem;
  }

  .card .card {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    margin-bottom: 0;
  }
  .main-card-body {
    background: ${theme.headerBackground};
    padding: 2rem 1rem 2rem 0.67rem !important;
  }
  .main-card-title {
    padding: 1.2rem;
    font-size: 1.25rem;
    margin-bottom: 0 !important;
    background: ${theme.headerBackground};
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }

  // Timeline
  .timeline-item {
    padding-left: 1.6rem !important;
    border-left: 1px solid ${theme.cardHeaderBorderColor} !important;
    &:last-of-type {
      border-color: transparent !important;
    }
  }
  .disabled-color {
    color: ${theme.infoIcon};
  }
  .card-cta {
    text-decoration: underline;
    color: ${theme.activeNavPillText};
    cursor: pointer;
  }
  .indicator {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background: ${theme.red};
    align-self: flex-start;
  }

  .meta-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .time {
      color: ${theme.gray};
      font-size: 0.8rem;
    }
    .card-cta {
      text-align: right;
    }
  }

  // Accordion
  .accordion-timeline,
  .accordion {
    border-radius: 0.3rem;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    .accordion-body {
      color: ${theme.bodyColor};
      padding: 0;
    }
    .accordion-body-desc {
      padding: 0 0 0 1.6rem;
      font-size: 0.9rem;
      .desc {
        width: 70%;
      }
    }
    .accordion-item {
      border-radius: 0.3rem;
      .accordion-header {
        button {
          font-size: 1rem;
          padding: 0.8rem 0.8rem 0.8rem 0 !important;
          font-size: 1rem !important;
        }
      }
    }
  }

  // Nested timeline css
  .accordion-status-body {
    padding: 1.4rem 2rem 1rem 1rem;
    .timeline-item {
      padding-left: 2.5rem !important;
      border-left: 1px solid ${theme.cardHeaderBorderColor} !important;
      &:last-of-type {
        border-color: transparent !important;
        margin-bottom: 5rem;
      }
    }
  }

  // Table
  .hide {
    visibility: hidden;
  }
  .rdt_TableRow {
    padding: 0.8rem 0;
  }
  .rdt_TableHeadRow {
    background: ${theme.tableHeaderColor};
  }

  .table-user-photo {
    height: 2.2rem;
    border-radius: 50%;
  }
  .table-user-name {
    font-size: 0.9rem;
    font-weight: 600;
  }
  .table-user-sub {
    font-size: 0.775rem;
    color: ${theme.textMuted};
  }
  .almamator-badge {
    border-radius: 50%;
    background: ${theme.yellowColor} !important;
    height: 1.6rem;
    width: 1.7rem;
    padding: 0.3rem;
  }
  .invited-badge {
    border-radius: 50%;
    background: ${theme.activeNavPillText}1f !important;
    height: 1.7rem;
    width: 1.7rem;
    padding: 0.3rem;
  }
`;
const TeamVieWrapper = styled.div`
  .basic-title {
    padding-left: 1.2rem;
  }
  .team-member-row {
    margin-bottom: 3rem;
  }

  .card .card {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    margin-bottom: 1rem;
    padding: 1rem 1.6rem;
    .card-body {
      padding: 0;
    }
  }
  .main-card-body {
    background: ${theme.headerBackground};
    padding: 2rem 1.6rem 2rem 1.6rem !important;
  }
  .main-card-title {
    padding: 1.6rem 1.6rem 0.8rem 1.6rem !important;
    font-size: 1.25rem;
    margin-bottom: 0 !important;
    background: ${theme.headerBackground};
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }
`;
const AccordionHeadStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.2rem;
  .title-head {
    margin: auto 0;
  }
  .view-all-cta {
    font-size: 0.875rem;
    color: ${theme.activeColor};
    text-decoration: underline;
    margin: auto 1rem auto auto;
    font-weight: 400;
  }
  .key {
    color: ${theme.bodyColor};
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
const ContractDetailsWrap = styled.div`
  .gray-bg {
    background-color: ${theme.headerBackground};
  }
  .card .card {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    margin-bottom: 0;
  }

  .report-text {
    color: ${theme.red};
  }

  .main-card-title {
    padding: 1.5rem 1.5rem 0.8rem 1.5rem !important;
    font-size: 1.25rem;
    margin-bottom: 0 !important;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }

  .contract-card-body {
    padding: 2rem;
  }
  .checkbox-wrap {
    margin-top: 1.2rem;
    .checkbox-label {
      font-size: 1rem;
    }
  }
  .icon-bg {
    background: ${theme.activeColor}1f;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      stroke-width: 2.5;
    }
  }
  .terminate {
    color: ${theme.red};
    cursor: pointer;
    font-weight: 500;
    margin: auto;
  }
  .contract-text-container {
    max-height: 40rem;
    overflow-y: auto;
  }
`;

const MemberRowWrapper = styled.div`
  input {
    width: 18rem;
  }
  .indicator {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background: ${theme.red};
    align-self: flex-start;
  }
  .key {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
  }
  .value {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
  }
  .name-info {
    width: 15rem;
  }
  .role,
  .project-count {
    color: ${theme.textMuted};
  }
  .delete-icon {
    margin: auto 0;
  }
  .mail-bg {
    background-color: ${theme.activeColor}1f;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    .mail-icon {
      margin: auto;
    }
  }
`;

export {
  BidWrapper,
  TeamVieWrapper,
  LeftSidebarProjectDetailsWrapper,
  ContractDetailsWrap,
  BidDetailsWrap,
  AccordionHeadStyle,
  MemberRowWrapper,
};
