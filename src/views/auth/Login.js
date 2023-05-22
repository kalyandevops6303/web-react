// ** React Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icons Imports

// ** Custom Components
import { OnBoardWrap, UserTypeCard } from "./style";

// ** Reactstrap Imports
import { CardTitle, CardText, Label, Form, Input, Button } from "reactstrap";

// ** Illustrations Imports
import Logo from "@src/assets/images/ic_trumio_logo.png";
import GoogleIcon from "@src/assets/images/google.png";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const CreateOfferSchema = yup.object().shape({
    brandName: yup.string().required("Brand Name is required"),
    offerName: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    offerURL: yup.string().url("URL must be valid").required("URL is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date(),
    uploadKey: yup.string(),
  });

  const { register, errors, handleSubmit, control, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateOfferSchema),
  });
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Welcome back!
        </CardTitle>
        <Form
          className="auth-login-form mt-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Email
            </Label>
            <Input
              type="email"
              id="login-email"
              placeholder="john@example.com"
              autoFocus
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Password
            </Label>
            <Input
              type="email"
              id="login-email"
              placeholder="john@example.com"
              autoFocus
            />
          </div>

          <div className="form-check mb-1">
            <Input type="checkbox" id="remember-me" size="md" />
            <div className="d-flex justify-content-between">
              <Label
                color="primary"
                className="form-check-label"
                for="remember-me"
              >
                <small>forgot password</small>
              </Label>
            </div>
          </div>
          <Button
            size="btn-sm"
            tag={Link}
            to="/email-verify"
            color="primary"
            block
          >
            Sign in
          </Button>
        </Form>
        <div className="divider my-2">
          <div className="divider-text">Or</div>
        </div>

        <Button
          outline
          tag={Link}
          to="/"
          color="primary"
          block
          className="google-btn"
        >
          <img src={GoogleIcon} alt="google-img" className="google-img" /> Sign
          up with Google
        </Button>
        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default Login;
