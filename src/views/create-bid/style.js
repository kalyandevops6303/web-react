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

const ProgressBarWrapper = styled.div`
  .progress {
    background-color: ${theme.uploadIconBackground};

    .progress-bar {
      background-color: ${theme.activeNavPillText};
    }
  }
`;

const TeamSectionWrapper = styled.div`
  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
  }

  .active-role-pill {
    width: fit-content;
    padding: 0 0 0 16px;
    margin-bottom: 16px;

    .bg-secondary {
      background-color: ${theme.activeNavPillText} !important;
    }

    h6 {
      color: ${theme.white};
    }
  }

  .inactive-role-pill {
    width: fit-content;
    padding: 0 0 0 16px;
    margin-bottom: 16px;

    .bg-secondary {
      border: 1px solid ${theme.activeNavPillText};
      background-color: ${theme.white} !important;
    }

    h6 {
      color: ${theme.wizardStepSvgColor};
    }
  }

  .upload-button {
    width: fit-content;

    .add-icon-container {
      background: ${theme.uploadIconBackground};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: fit-content;
    }

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
  }

  .select__placeholder {
    font-size: 12px;
    color: ${theme.textMuted};
  }

  .select__control {
    border-color: ${theme.inputBorderColor};

    .select__indicator {
      svg {
        color: ${theme.textMuted};
        display: none;
      }
    }
  }

  .roles-list-header {
    color: ${theme.grayTitleColor};
  }

  .same-role-error {
    margin-top: -1.4rem;
  }
`;

const MilestoneSectionWrapper = styled.div`
  .gray-card-wrapper {
    .card-header {
      background-color: ${theme.headerBackground};
    }
    .card-body {
      background-color: ${theme.headerBackground};
    }
    .white-card-bg {
      .card-body {
        border-radius: 6px;
        background-color: ${theme.white};
        box-shadow: 0px 4px 24px 0px ${theme.cardShadowLight} !important;
      }
    }
  }

  .gray-border-container {
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }

  .label-asterisk {
    color: ${theme.red};
  }

  .upload-button {
    width: fit-content;

    .add-icon-container {
      background: ${theme.uploadIconBackground};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: fit-content;
    }

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
  }

  .form-control[readonly] {
    opacity: 1 !important;
  }

  .upload-button {
    width: fit-content;

    .add-icon-container {
      background: ${theme.uploadIconBackground};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: fit-content;
    }

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
  }

  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
  }

  .upload-btn {
    width: fit-content;

    h5 {
      color: ${theme.activeNavPillText};
    }
  }

  .fixed-cost-banner {
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

  .green-amount {
    color: ${theme.green};
  }

  .red-amount {
    color: ${theme.red};
  }

  .select__control {
    border-color: ${theme.inputBorderColor};

    svg {
      color: ${theme.textMuted};
    }

    .select__placeholder {
      color: ${theme.textMuted};
    }
  }

  .form-check-input:not(:disabled):checked {
    box-shadow: 0px 2px 4px ${theme.checkboxShadow};
  }

  .form-check-input:checked {
    background-color: ${theme.activeNavPillText};
    border-color: ${theme.activeNavPillText};
  }

  .custom-checkbox-border {
    .form-check-input {
      border: 1.5px solid ${theme.inputBorderColor};
    }
    .form-check-input:checked {
      border: 1.5px solid ${theme.activeNavPillText};
    }
  }

  .form-check-label.form-label {
    color: ${theme.checkboxLabel};
  }

  .checkbox-custom-margin {
    margin-right: 5px;
  }

  .overflow-wrap-anywhere {
    overflow-wrap: anywhere;
  }

  .custom-cost-margin {
    margin-top: 2px;
  }
`;

const PreviewSectionWrapper = styled.div`
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
    gap: 4rem;
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

  .milestone-table {
    border: 1px solid ${theme.cardHeaderBorderColor};

    th {
      padding: 1rem 1.7rem;
    }
    td {
      padding: 1rem 1.7rem;
    }
  }
  .milestone-title {
    font-weight: 300;
    font-size: 1.2rem;
  }

  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
  }

  .upload-button {
    width: fit-content;

    .add-icon-container {
      background: ${theme.uploadIconBackground};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: fit-content;
    }

    h5 {
      margin: 0 0 0 8px;
      color: ${theme.activeNavPillText};
    }
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
`;

const InfoContainer = styled.div`
  background-color: ${theme.infoBannerBg};
  color: ${theme.blueBorderColor};
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
`;

const AccordionTableHeader = styled.div`
  background-color: ${theme.tableHeaderColor};
  border: 1px solid ${theme.cardHeaderBorderColor};

  p {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
  }
`;

const AccordionBodyContent = styled.div`
  .content-header {
    color: ${theme.gray};
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .content-description {
    color: ${theme.checkboxLabel};
  }

  .to-be-assigned-text {
    color: ${theme.orangeColor};
  }
`;

const ChangeBidTypeConfirmationModalWrapper = styled.div`
  .modal-custom-heading {
    font-size: 24px;
    line-height: 30px;
  }

  .modal-custom-sub-heading {
    font-size: 18px;
    line-height: 29.124px;
  }

  .notepad-gif {
    margin-left: -10px;
    margin-top: -10px;
    margin-bottom: -20px;
  }
`;

const ChangeBidTypeButton = styled.div`
  .change-bid-type-icon {
    background: rgba(1, 133, 228, 0.12);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 16px;
    color: ${theme.activeNavPillText};
  }
`;

export {
  LeftSidebarProjectDetailsWrapper,
  ProgressBarWrapper,
  TeamSectionWrapper,
  MilestoneSectionWrapper,
  PreviewSectionWrapper,
  InfoContainer,
  AccordionTableHeader,
  AccordionBodyContent,
  ChangeBidTypeConfirmationModalWrapper,
  ChangeBidTypeButton,
};
