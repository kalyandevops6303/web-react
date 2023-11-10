import styled from 'styled-components';
import theme from '../../configs/themeVariables';

export const PasswordStrengthBarWrap = styled.div`
  .red {
    p {
      color: #ea5455 !important;
    }
  }
  .orange {
    p {
      color: #fd7e14 !important;
    }
  }
  .blue {
    p {
      color: #2b90ef !important;
    }
  }
  .green {
    p {
      color: #28c76f !important;
    }
  }
  .password-meter {
    margin-top: 6px !important;
    p {
      text-align: left !important;
      font-size: 12px !important;
      margin: 2px 2px !important;
    }
  }
`;

export const PasswordStrengthBarContainer = styled.div`
  div {
    height: 2.5px;
    div {
      height: 2.5px;
    }
  }

  .progress {
    position: relative;
    .bg {
      width: 100%;
      display: flex;
      position: absolute;
      .vertical-line {
        display: block;
        height: 2.5px;
        width: 25%;
        border-right: 5px solid #f1faff;
      }
    }
  }
  p {
    text-align: left !important;
    font-size: 12px !important;
    margin: 2px 2px !important;
  }
`;

export const OnBoardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // bg pic css
  .user-type-pic {
    height: 78vh;
  }
  .create-pw-pic {
    margin-left: 7rem;
    height: 62vh;
  }
  .login-pic {
    margin-top: 2rem;
    height: 84vh;
  }
  .verification-pic {
    margin-left: 7rem;
    height: 62vh;
  }
  .client-pic {
    margin-left: 2rem;
    margin-top: 4rem;
    height: 78vh;
  }
  .talent-pic {
    height: 94vh;
  }

  .logo-wrap {
    display: flex;
    font-size: 14px;
  }
  .auth-edit {
    color: ${theme.primary};
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.3rem;
  }
  .mobile-input {
    margin-left: 1rem;
  }
  .btn.disabled {
    opacity: 0.4 !important;
  }
  .select-class {
    cursor: pointer;
  }
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
  .btn {
    font-weight: 500 !important;
  }

  .privacy-terms-label {
    color: ${theme.primary};
  }

  height: 100vh;
  width: 100%;
  background-color: white;
  background-size: cover;
  .card-onboard {
    filter: drop-shadow(4px 8px 8px rgba(1, 133, 228, 0.12));
    box-shadow: 4px 8px 8px 0px rgba(1, 133, 228, 0.11999999731779099);
    background: ${theme.cardBgBlue};
    border-radius: 32px;
    width: fit-content;
    left: 12%;
    position: absolute;
    top: ${(props) => (props.isLoginPage ? '3' : '5')}%;
    height: ${(props) => (props.isLoginPage ? '94' : '90')}%;
    width: 29%;
    padding: ${(props) => (props.isLoginPage ? '3rem 1.8rem' : ' 3.5rem 1.8rem')};
    .card-logo {
      margin-bottom: ${(props) => (props.isLoginPage ? '1' : '2')}rem;
      height: 2.5rem;
      width: fit-content;
    }
    .card-title-onboard {
      font-weight: bold;
      margin-bottom: 0.3rem;
      font-size: 1.6vw;
    }
    .card-text {
      font-size: 1vw;
      line-height: 1.5vw;
    }
  }

  .google-btn {
    display: flex !important;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    color: ${theme.primary};
    font-weight: 600 !important;
    .google-img {
      height: 1.2rem;
    }
  }
  .sign-info {
    margin-top: 0.8rem;
    gap: 0.5rem;
    .primary {
      color: ${theme.primary};
    }
  }
  .last-row {
    margin-top: 0.3rem;
  }
  .otp-input {
    &:focus {
      border: 1px solid blue;
      outline: none;
    }
  }
  @media screen and (max-width: 1100px) {
    .card-onboard {
      width: 75%;
    }
  }
  @media screen and (max-width: 1000px) {
    .card-title-onboard {
      font-size: 22px !important;
    }
    .card-text {
      font-size: 14px !important;
      line-height: 1.5rem !important;
    }
  }
  @media screen and (max-width: 500px) {
    .card-onboard {
      width: 92%;
      left: 4%;
    }
  }

  .checkbox-custom-label {
    .form-check-label {
      color: ${theme.headingTextColor};
    }
  }

  .custom-divider {
    .divider-text {
      color: ${theme.headingTextColor};
    }
  }
`;
export const UserTypeCard = styled.div`
  box-shadow: 0px 4px 14px rgba(0, 101, 193, 0.15);
  background: white;
  border-radius: 6px;
  padding: 1.8rem 2.8rem;
  min-height: 8rem;
  cursor: pointer;
  margin-top: 2rem;
  &:hover {
    border: 1px solid ${theme.blueBorderColor};
  }
  .select-card-title {
    color: ${theme.primary};
    font-weight: 500 !important;
    margin-bottom: 0.5rem;
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    padding: 2.5rem 2rem;
  }
`;
