import React from 'react';
import zxcvbn from 'zxcvbn';
import { PasswordStrengthBarContainer } from '../style';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return 'Password strength: Weak';
      case 1:
        return 'Password strength: Weak';
      case 2:
        return 'Password strength: Fair';
      case 3:
        return 'Password strength: Good';
      case 4:
        return 'Password strength: Strong';
      default:
        return '';
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#ea5455';
      case 1:
        return '#ea5455';
      case 2:
        return '#fd7e14';
      case 3:
        return '#2b90ef';
      case 4:
        return '#28c76f';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
  });

  return (
    <PasswordStrengthBarContainer>
      <div className="progress">
        <div className="bg">
          <span className="vertical-line" />
          <span className="vertical-line" />
          <span className="vertical-line" />
        </div>

        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>

      <p className="password-strength" style={{ color: funcProgressColor() }}>
        {createPassLabel()}
      </p>
    </PasswordStrengthBarContainer>
  );
};

export default PasswordStrengthMeter;
