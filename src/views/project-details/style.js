import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const TableWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #ebe9f1;
  background: #fff;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
  .header {
    color: ${theme.headingTextColor};
    padding: 0.4rem;
    margin: 0;
    border-bottom: 1px solid #ebe9f1;
    letter-spacing: 1px;
    background: #f3f2f7;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
  }
  .tbody {
    padding: 1rem 0.4rem;
    margin: 0;
    .desc-input {
      resize: none;
      scrollbar-width: none;
      padding: 0.5rem 0.6rem !important;
    }
  }
  .border-bottom {
    border-bottom: 1px solid ${theme.darkGreyBorderColor};
  }
  .truncated-filename {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; /* Number of lines to show */
  }
`;

const SubmissionHistoryWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #ebe9f1;
  background: #fff;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
  .header {
    color: ${theme.headingTextColor};
    padding: 0.4rem;
    margin: 0;
    border-bottom: 1px solid #ebe9f1;
    letter-spacing: 1px;
    background: #f3f2f7;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
  }
  .tbody {
    padding: 1rem 0.4rem;
    margin: 0;
    .desc-input {
      resize: none;
      scrollbar-width: none;
      padding: 0.5rem 0.6rem !important;
    }
  }
  .border-bottom {
    border-bottom: 1px solid ${theme.darkGreyBorderColor};
  }
  .truncated-filename {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; /* Number of lines to show */
  }
  .table-row {
    padding: 0.2rem;
    .table-cell {
      padding: 0.4rem 0.8rem;
    }
    .table-cell-td {
      padding: 0.8rem;
      min-height: 4rem;
    }

    .cell-file-name {
      width: 20%;
    }

    .cell-description {
      width: 24%;
    }

    .cell-submitted-by {
      width: 16%;
    }

    .cell-submitted-on {
      width: 24%;
    }

    .cell-action {
      width: 14%;
    }
  }
`;
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
    font-weight: 400;
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
      font-weight: 400;
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
    font-weight: 400;
    margin-right: 1rem;
  }

  // Project-desc
  .project-desc {
    .project-desc-title {
      font-weight: 400;
    }
    .value {
      font-weight: 400;
    }
  }

  .attachments {
    color: ${theme.activeColor};
  }
`;

const BidDetailsWrap = styled.div`
  .content-header-left {
    margin-bottom: 0 !important;
  }
  .report-text {
    color: ${theme.red};
  }
  .top-head {
    position: relative;
    .fixed-header {
      top: 4rem;
      left: 0;
      position: fixed;
      z-index: 20;
      background-color: ${theme.bodyBgColor};
      width: 100%;
      padding: 1.8rem 2rem 0.8rem 2rem;
    }
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

    .symbol {
      color: ${theme.infoIcon};
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
    font-weight: 400;
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

  .white-card-bg {
    .card-body {
      border-radius: 6px;
      background-color: ${theme.white};
      box-shadow: 0px 4px 24px 0px ${theme.cardShadowLight} !important;
    }
  }

  .custom-milestone-accordion {
    .accordion-item:first-of-type {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    }

    .accordion-item:first-of-type .accordion-button {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    }
    .accordion-item {
      border-right: 1px solid ${theme.cardHeaderBorderColor};
      border-left: 1px solid ${theme.cardHeaderBorderColor};
    }
    .accordion-item:last-of-type {
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    }
  }

  .min-height-400 {
    min-height: 400px;
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
    font-weight: 500;
  }
  .card-cta-disabled {
    text-decoration: underline;
    color: ${theme.activeNavPillText}4f;
    font-weight: 500;
  }
  .indicator {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background: ${theme.red};
    align-self: flex-start;
  }
  .color-red {
    color: ${theme.red};
  }
  .meta-data {
    width: 20%;
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
  .timeline-single-item {
    width: 80%;
  }

  // Accordion
  .accordion-timeline,
  .accordion {
    border-radius: 0.3rem;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
    .accordion-body {
      color: ${theme.bodyColor};
      padding: 0;

      // Select
      .select__value-container {
        padding: 0;
        padding-left: 8px;
      }
      .select__indicator {
        padding: 0;
        padding-right: 8px;
      }
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
  .red-dot {
    width: 8px;
    height: 8px;
    background-color: ${theme.red};
    border-radius: 50%;
    outline: 2px solid white;
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

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
    font-weight: 500;
  }
  .view-card-cta {
    font-size: 1rem;
    color: ${theme.activeColor};
    text-decoration: underline;
    margin: auto 1rem auto auto;
    font-weight: 500;
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

  .contract-info {
    border-radius: 6px;
  }
  .error-banner {
    background: ${theme.errorBannerBg};

    p {
      color: ${theme.red};
    }
  }

  .info-banner {
    background: ${theme.infoBannerBg};

    p {
      color: ${theme.activeNavPillText};
    }
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

const RatingNavsContainer = styled.div`
  .nav {
    border-radius: 0;
  }

  .nav-link {
    font-weight: 400;
  }

  .nav-tabs .nav-link {
    padding-left: 0;
    padding-right: 0;
    font-size: 16px;
  }

  .nav-tabs .nav-link.active {
    border-bottom: 2px solid ${theme.activeNavPillText} !important;
    margin-bottom: -2px;
    color: ${theme.activeNavPillText};
    font-weight: 600;
    font-size: 16px;
  }

  .nav-tabs .nav-link:after {
    background: none !important;
  }
`;

const RatingsFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.red};
    margin-left: 4px;
  }
`;

const RatingTag = styled.div`
  border-radius: 12px;
  border: 1px solid ${theme.turquoiseColor};
  background: ${(props) => (props.active ? theme.turquoiseColor : theme.ratingTagBg)};
  width: fit-content;

  p {
    color: ${(props) => (props.active ? theme.white : theme.lightTurquoiseColor)};
    font-size: 12px;
    font-weight: 600;
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
  RatingNavsContainer,
  RatingsFormContainer,
  RatingTag,
  UserNameWrapper,
  TableWrapper,
  SubmissionHistoryWrapper,
};
