import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const CustomStep = ({ onChangeStep, steps, currentStep }) => {
  const navigate = useNavigate();
  const param = useParams();
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);

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
    console.log(step);
    onChangeStep(step);
    if (step === 'milestone' && invitedByData) {
      navigate(`milestone/project-invitation/milestone`);
    } else if (step === 'project') {
      navigate(-1);
    } else {
      navigate(step);
    }
  };
  console.log(steps);

  return (
    <CustomStepWrap>
      {steps.map((item) => (
        <div
          onClick={item?.isDisabled ? () => {} : () => handleChangeStep(item.title.toLowerCase())}
          key={item.title}
          className={`stepper ${currentStep === item.title.toLowerCase() ? 'active' : 'cursor-pointer'}`}
        >
          {console.log(currentStep, item.title.toLowerCase())}
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
export default CustomStep;
