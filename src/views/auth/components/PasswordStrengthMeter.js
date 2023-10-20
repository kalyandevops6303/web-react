import React from 'react';
import zxcvbn from 'zxcvbn';
import { PasswordStrengthBarContainer } from '../style';

const PasswordStrengthMeter = ({ password }) => {
  const getPasswordStrength = (password) => {
    const passwordLength = password.length;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);

    let strength = 0;

    // Define your custom password strength criteria here
    if (passwordLength >= 8) {
      strength += 1;
    }

    if (passwordLength >= 12) {
      strength += 1;
    }

    if (hasLowerCase && hasUpperCase) {
      strength += 1;
    }

    if (hasNumbers) {
      strength += 1;
    }

    if (hasSymbols) {
      strength += 1;
    }

    return Math.min(strength, 4); // Ensure strength is capped at 4
  };
  const testResult = getPasswordStrength(password);
  const num = (testResult * 100) / 4;

  const createPassLabel = () => {
    switch (testResult) {
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
    switch (testResult) {
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
