/* eslint-disable consistent-return */
import styled from 'styled-components';
import Proptypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import { bidDetails } from '../../../redux/selectors/createBidSelectors';

const FormStepper = ({ onChangeStep, steps, currentStep }) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const bidDetailsData = useSelector(bidDetails);

  const CustomStepWrap = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    gap: 2rem;
    .stepper {
      display: flex;
      align-items: center;
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

  const handleChangeStep = (step) => {
    if (step === currentStep) return;

    if (step === 'team') {
      if (bidDetailsData?.workers?.length > 0) {
        onChangeStep(step);
        navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/team`, {
          state: { entity: location.state.entity },
        });
      }
    } else if (step === 'milestone') {
      if (bidDetailsData?.milestones?.length > 0) {
        onChangeStep(step);
        navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/milestone`, {
          state: { entity: location.state.entity },
        });
      }
    } else if (step === 'preview') {
      if (bidDetailsData?.workers?.length > 0 && bidDetailsData?.milestones?.length > 0) {
        onChangeStep(step);
        navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/preview`, {
          state: { entity: location.state.entity },
        });
      }
    }
  };

  const getCursorClassname = (step) => {
    if (step === currentStep) return;
    if (step === 'team') {
      if (bidDetailsData?.workers?.length > 0) {
        return 'cursor-pointer';
      }
    } else if (step === 'milestone') {
      if (bidDetailsData?.milestones?.length > 0) {
        return 'cursor-pointer';
      }
    } else if (step === 'preview') {
      if (bidDetailsData?.workers?.length > 0 && bidDetailsData?.milestones?.length > 0) {
        return 'cursor-pointer';
      }
    }
  };

  const getStepperActiveState = (title) => {
    if (params['*'] === 'team') {
      if (title === currentStep) {
        return true;
      }
    } else if (params['*'] === 'milestone') {
      if (title === currentStep || title === 'team') {
        return true;
      }
    } else if (params['*'] === 'preview') {
      return true;
    }
  };

  return (
    <CustomStepWrap>
      {steps.map((item) => (
        <div
          onClick={() => handleChangeStep(item.title.toLowerCase())}
          key={item.title}
          className={`stepper ${getCursorClassname(item.title.toLowerCase())} ${
            getStepperActiveState(item.title.toLowerCase()) ? 'active' : ''
          }`}
        >
          <span className="stepper-box">{item.icon}</span>
          <span className="stepper-label">
            <span className="stepper-title">{item.title}</span>
            <span className="stepper-subtitle">{item.subtitle}</span>
          </span>
        </div>
      ))}
    </CustomStepWrap>
  );
};
export default FormStepper;

FormStepper.propTypes = {
  onChangeStep: Proptypes.func,
  steps: Proptypes.array,
  currentStep: Proptypes.string,
};

FormStepper.defaultProps = {
  onChangeStep: () => {},
  steps: [],
  currentStep: '',
};
