import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const BackIconContainer = styled.div`
  background: ${theme.activeNavPillText};
  border-radius: 50%;
  padding: 4px 5px 4px 5px;
  width: fit-content;
`;

export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  .blue-text {
    color: ${theme.activeNavPillText};
  }
`;

export const FormWizardContainer = styled.div`
  .bs-stepper-header {
    padding: 1.5rem 0 !important;

    .line {
      svg {
        display: none;
      }
    }

    .step {
      margin-right: 30px;

      .step-trigger:disabled {
        opacity: 1 !important;
      }

      .step-trigger {
        .bs-stepper-box {
          svg {
            color: ${theme.wizardStepSvgColor};
          }
        }
        .bs-stepper-label {
          .bs-stepper-subtitle {
            color: ${theme.navPillText};
          }
        }
      }
    }

    .active,
    .crossed {
      .step-trigger {
        .bs-stepper-box {
          background-color: ${theme.wizardStepActiveBg} !important;
          box-shadow: none !important;

          svg {
            color: ${theme.activeNavPillText};
          }
        }
        .bs-stepper-label {
          .bs-stepper-title {
            color: ${theme.activeNavPillText} !important;
          }
          .bs-stepper-subtitle {
            color: ${theme.wizardStepSubtitleColor} !important;
          }
        }
      }
    }
  }

  .custom-wizard-progress {
    .progress {
      background-color: ${theme.uploadIconBackground};

      .progress-bar {
        background-color: ${theme.activeNavPillText};
      }
    }
  }

  .bs-stepper-content {
    padding: 0 !important;
    background-color: ${theme.bodyBg} !important;
    box-shadow: none !important;
  }

  .upload-btn {
    width: fit-content;

    h5 {
      color: ${theme.activeNavPillText};
    }
  }
`;

export const RequirementsFormContainer = styled.div`
  .label-asterisk {
    color: ${theme.red};
    margin-left: 4px;
  }

  .card-header-border {
    border: 1px solid ${theme.cardHeaderBorderColor};
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

  .custom-card {
    background-color: ${theme.white} !important;
    box-shadow: 0 4px 24px 0 ${theme.cardShadow} !important;

    .card {
      margin: 0;
      padding: 8px 16px;
    }

    .btn-left-margin {
      margin-left: 30px;
    }
  }

  .select__multi-value__remove {
    svg {
      color: ${theme.white};
    }
  }

  .time-zone-border {
    border-bottom: 2px solid ${theme.infoIcon};
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
    margin-right: 50px;
    margin-top: 10px;
  }

  .custom-multiselect {
    .select__value-container--has-value {
      .select__multi-value {
        display: none;
      }
    }

    .select__indicators {
      .select__clear-indicator {
        display: none;
      }
    }
  }

  .countries-pills {
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

  .form-control[readonly] {
    opacity: 1 !important;
  }
`;

export const DropzoneContainer = styled.div`
  border: 2px dashed ${theme.inputBorder};
  margin-top: 4px;

  h4 {
    color: ${theme.inputBorder};
  }

  p {
    color: ${theme.inputBorder} !important;
  }
`;

export const TimeWrapper = styled.section`
  display: flex;
  .weekdays,
  .weekends {
    width: 50%;

    ul {
      font-size: 11px;
      display: flex;
      margin: 0;
      padding: 0;
      padding-top: 7px;
      list-style-type: none;
    }
  }
  .weekdays {
    padding-right: 20px;
    border-right: 1px solid ${theme.borderInputColor};

    ul {
      justify-content: space-between;
    }
  }
  .weekends {
    padding-left: 20px;

    ul {
      gap: 14px;
    }
  }
  .dot {
    height: 8px;
    width: 8px;
    display: block;
    background: ${theme.dotBg};
    border-radius: 50%;
    margin: auto;
    margin-bottom: 6px;
  }
  .active {
    background: ${theme.green};
  }

  @media only screen and (min-device-width: 990px) and (max-device-width: 1160px) {
    flex-direction: column;
    gap: 16px;
    .weekends {
      ul {
        gap: 32px;
      }
    }
  }
  @media only screen and (max-device-width: 450px) {
    flex-direction: column;
    gap: 16px;
    .weekends {
      ul {
        gap: 32px;
      }
    }
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .bg-secondary {
    background-color: ${theme.lightBlueBgColor} !important;
    color: ${theme.lightBlueColor} !important;
  }
`;

export const YouDidItGifContainer = styled.div`
  margin-bottom: -70px;
  margin-top: -30px;
`;

export const BlueBgIconContainer = styled.div`
  background: ${theme.uploadIconBackground};
  border-radius: 50%;
`;

export const NavsContainer = styled.div`
  .nav {
    border-radius: 0;
  }

  .nav-link {
    font-weight: 400;
  }

  .nav-tabs .nav-link.active {
    border-bottom: 3px solid ${theme.bodyColor} !important;
    margin-bottom: -2px;
    color: ${theme.bodyColor};
    font-weight: 600;
  }

  .nav-tabs .nav-link:after {
    background: none !important;
  }
`;

export const TableContainer = styled.div`
  .user-pic {
    border-radius: 50%;
    border: 1px solid ${theme.bodyColor};
    width: fit-content;
  }

  .badge {
    padding: 0 8px 0 8px;
  }

  .bg-secondary {
    background-color: ${theme.ratingBadgeBg} !important;
  }

  .rating-text {
    color: ${theme.wizardStepSvgColor};
  }

  .circular-progressbar-container {
    width: 46px;
    height: 46px;

    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }

  .invited-icon-container {
    background: ${theme.greenBtnBg};
    border-radius: 50%;
    width: fit-content;
    padding: 5px;
  }

  .no-data-found-container {
    .no-data-found-gif {
      margin: -20px 0 -10px 0;
    }

    p {
      color: ${theme.noDataFoundTextColor};
    }
  }
`;

export const InviteUsersListContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;

  .user-pic {
    border-radius: 50%;
    border: 1px solid ${theme.bodyColor};
    width: fit-content;
  }

  .badge {
    padding: 0 8px 0 8px;
  }

  .bg-secondary {
    background-color: ${theme.ratingBadgeBg} !important;
  }

  .rating-text {
    color: ${theme.wizardStepSvgColor};
  }
`;

export const TextEditorContainer = styled.div`
  .ql-toolbar.ql-snow {
    border: 1px solid ${theme.inputBorderColor} !important;
    border-radius: 4px 4px 0 0;
  }

  .ql-container.ql-snow {
    border-left: 1px solid ${theme.inputBorderColor} !important;
    border-right: 1px solid ${theme.inputBorderColor} !important;
    border-bottom: 1px solid ${theme.inputBorderColor} !important;
    border-radius: 0 0 4px 4px;
  }

  .ql-editor.ql-blank::before {
    color: ${theme.gray};
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
  }

  .ql-container {
    font-family: inherit;
    font-size: 15px;
  }

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    min-height: 150px;
  }
`;

export const PreviewTextEditorContainer = styled.div`
  .ql-toolbar.ql-snow {
    display: none;
  }

  .ql-container.ql-snow {
    border: none !important;
    border-radius: 0;
  }

  .ql-editor.ql-blank::before {
    color: ${theme.gray};
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
  }

  .ql-container {
    font-family: inherit;
    font-size: 15px;
  }

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    min-height: 100px;
  }
`;
