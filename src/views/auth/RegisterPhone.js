// ** React Imports
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormGroup, FormFeedback } from 'reactstrap';

// ** Custom Components
import CountryDropdown from '../../@core/components/country-dropdown';
import { OnBoardWrap } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

const RegisterPhone = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState({
    label: 'Afghanistan',
    dial_code: '+93',
    code: 'AF',
  });

  const schema = yup.object().shape({
    mobile: yup.string().required('Mobile number is required'),
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    clearErrors();
  };

  const onSubmit = (values) => {
    if (!isValidPhoneNumber(values.mobile, selectedCountry.code)) {
      setError('mobile', { type: 'custom', message: 'Invalid phone number' });
    } else {
      navigate('/phone-verify');
    }
  };

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Sign up! 🔐
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label className="form-label" for="login-email">
              Mobile number
            </Label>
            <div className="d-flex">
              <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={handleCountryChange} />
              <div className="mobile-input">
                <Controller
                  type="phone"
                  id="mobile"
                  name="mobile"
                  placeholder="9090989080"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ''} // Set a default value for the input
                      placeholder="9090989080"
                      invalid={errors.mobile && true}
                    />
                  )}
                />
              </div>
            </div>

            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
          </FormGroup>

          <Button color="primary" block type="submit">
            Send OTP
          </Button>
        </Form>
        <div className="d-flex justify-content-center sign-info">
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

export default RegisterPhone;
