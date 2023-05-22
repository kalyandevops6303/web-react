import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { FormFeedback } from "reactstrap";

// ** Icons Imports
import Logo from "@src/assets/images/ic_trumio_logo.png";

// ** Custom Components

// ** Reactstrap Imports
import { CardTitle, CardText, Label, Form, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { OnBoardWrap } from "./style";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setCode(value);
    setOtpError(false);
  };
  const verifyOtp = () => {
    console.log(code);
    navigate("/set-password");
  };
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Two Step Verification 💬
        </CardTitle>
        <CardText className="mb-2 card-text">
          We sent a verification code to your email ID. Enter the code in the
          field below.
          <span className="auth-edit" onClick={() => navigate(-1)}>
            Edit
          </span>
        </CardText>
        <Form className="auth-login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Email
            </Label>
            <Input
              type="email"
              id="login-email"
              placeholder="john@example.com"
              autoFocus
              disabled
            />
          </div>

          <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={4}
            separator={<span style={{ width: "12px" }} />}
            isInputNum
            shouldAutoFocus
            inputStyle={{
              border: `1px solid #DCDBE2`,
              borderRadius: "8px",
              width: "50px",
              height: "50px",
              fontSize: "12px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
            focusStyle={{
              border: "1px solid #0065C1",
              outline: "none",
            }}
          />
          {otpError && (
            <FormFeedback className="mt-1">Invalid OTP</FormFeedback>
          )}
          <Button
            color="primary"
            block
            className="mt-4"
            disabled={code.length !== 4}
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
        </Form>

        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>Resend</small>
          </Label>
          <Label className="primary">
            <small>OTP</small>
          </Label>
        </div>
        <div className="d-flex justify-content-center sign-info last-row">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label tag={Link} to="/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default VerifyEmail;
