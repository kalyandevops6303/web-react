import styled from 'styled-components';
import Proptypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';
import theme from '../../../configs/themeVariables';

export const CustomStepWrap = styled.div`
  max-width: fit-content;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.white};
  border-radius: 6px 6px 0px 0px;
  margin-bottom: 1.5rem;
  display: flex;
  .stepper:not(.active) {
    border-bottom: 2.5px solid #e0e0e0;
  }
  .stepper:not(.disabled):not(.active):hover {
    .stepper-box {
      background-color: ${theme.activeNavPillText}1f;
      svg {
        color: ${theme.activeNavPillText};
      }
    }
    .stepper-label {
      .stepper-title,
      .stepper-subtitle {
        color: ${theme.activeNavPillText};
      }
    }
  }
  .stepper.active {
    background-color: ${theme.activeNavPillText}1f;
    border-bottom: 2.5px solid ${theme.activeNavPillText};

    .stepper-box {
      background-color: ${theme.white};
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
    }
  }
  .stepper.disabled {
    opacity: 0.4;
  }
  .stepper:first-child {
    border-radius: 6px 0px 0px 0px;
  }
  .stepper:last-child {
    border-radius: 0px 6px 0px 0px;
  }
  .stepper {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    .stepper-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      padding: 0.5em 0;
      font-weight: 500;
      color: black;
      background-color: ${theme.grayTitleColor}1f;
      border-radius: 0.35rem;
      svg {
        color: ${theme.wizardStepSvgColor};
      }
    }
    .stepper-label {
      margin: 0.5rem 0 0 1rem;
      align-items: center;
      .stepper-title,
      .stepper-subtitle {
        display: block;
      }
      .stepper-title {
        font-weight: 600;
        color: ${theme.wizardStepSvgColor};
      }
      .stepper-subtitle {
        font-size: 0.75rem;
        font-weight: 400;
      }
    }
  }
  .active {
    color: ${theme.activeNavPillText};
    .stepper-box {
      background: ${theme.activeNavPillText}1f;
      svg {
        color: ${theme.activeNavPillText};
      }
    }
    .stepper-label {
      .stepper-title,
      .stepper-subtitle {
        color: ${theme.activeNavPillText};
      }
    }
  }
`;

const ProjectDetailsNavbar = ({ onChangeStep, steps, currentStep }) => {
  const navigate = useNavigate();
  const param = useParams();

  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);

  const handleChangeStep = (step) => {
    onChangeStep(step);
    if (currentStep !== step) {
      // eslint-disable-next-line no-unneeded-ternary
      if (step === 'milestone' && invitedByData ? true : false) {
        navigate(`milestone/project-invitation/${invitedByData?.request_id}`);
      } else if (step === 'project') {
        navigate(`/project-details/${param?.projectId}/project/project-invitation/${invitedByData?.request_id}`);
      } else {
        navigate(step);
      }
    }
  };

  const getTooltipText = (title) => {
    switch (title) {
      case 'milestone':
        return 'You can view milestone details once the project starts.';
      case 'payment':
        return 'You can view payment details once the project starts.';
      case 'rating':
        return 'You can give and view your ratings after project completion.';
      case 'infrastructure':
        return 'Contact your project admin to access the infrastructure.';
      default:
        return '';
    }
  };

  return (
    <CustomStepWrap>
      {steps.map((item) => (
        <div
          onClick={item?.isDisabled ? () => {} : () => handleChangeStep(item.title.toLowerCase())}
          key={item.title}
          className={`stepper ${
            currentStep === item.title.toLowerCase() ? 'active' : `cursor-pointer ${item.isDisabled ? 'disabled' : ''}`
          }`}
          id={`${item.title.toLowerCase()}`}
        >
          <span className="stepper-box">{item.icon}</span>
          <span className="stepper-label">
            <span className="stepper-title">{item.title}</span>
            <span className="stepper-subtitle">{item.subtitle}</span>
          </span>
          {item.isDisabled && (
            <UncontrolledTooltip target={`${item.title.toLowerCase()}`} placement="bottom">
              {getTooltipText(item.title.toLowerCase())}
            </UncontrolledTooltip>
          )}
        </div>
      ))}
    </CustomStepWrap>
  );
};
export default ProjectDetailsNavbar;

ProjectDetailsNavbar.propTypes = {
  onChangeStep: Proptypes.func,
  steps: Proptypes.array,

  currentStep: Proptypes.string,
};

ProjectDetailsNavbar.defaultProps = {
  onChangeStep: () => {},
  steps: [],

  currentStep: '',
};
