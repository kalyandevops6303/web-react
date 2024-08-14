// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormGroup, FormFeedback, Spinner } from 'reactstrap';

// ** Custom Components
import CountryDropdown from '../../@core/components/country-dropdown';
import { OnBoardWrap } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { registerPhone } from '../../redux/actions/authActions';
import { selectAuthLoading, selectMobile } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { filteredFormSchema } from '../../utility/Utils';
import { CITIZEN_TYPES } from '../../utility/constants/Constant';

const RegisterPhone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);

  const isLoading = useSelector(selectAuthLoading);
  const mobileData = useSelector(selectMobile);

  const [selectedCountry, setSelectedCountry] = useState(
    savedFormData?.selectCountry ||
    mobileData?.selectedCountry || {
      label: 'United States',
      dial_code: '+1',
      code: CITIZEN_TYPES.US,
      _id: '6479c2071183add75cda4e37',
    },
  );

  const schema = yup.object().shape({
    mobile: yup.string().required('Mobile number is required'),
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    clearErrors,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mobile:  savedFormData?.mobile || mobileData?.phone || '',
    },
  });
  const localFormData = useWatch({ control });
  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: {...schema.fields, selectedCountry},
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const handleCountryChange = (value) => {
    const allData = { ...savedFormData, selectCountry:value };
    dispatch(setFormData(allData));
    setSelectedCountry(value);
    clearErrors();
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    navigate('/auth/phone-verify');
  };

  const onSubmit = (values) => {
    if (!isValidPhoneNumber(values.mobile, selectedCountry.code)) {
      setError('mobile', { type: 'custom', message: 'Invalid phone number' });
    } else {
      dispatch(
        registerPhone({
          phone: values.mobile.replace(/[^\d]/g, ''),
          country_code: selectedCountry.dial_code,
          selectedCountry,
          onSuccess,
        }),
      );
    }
  };

  const mobileValue = watch('mobile');

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
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
                  placeholder="Enter phone number"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ''} // Set a default value for the input
                      placeholder="Enter phone number"
                      invalid={errors.mobile && true}
                    />
                  )}
                />
              </div>
            </div>

            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
          </FormGroup>

          <Button color="primary" block type="submit" disabled={!mobileValue || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </Form>
        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label tag={Link} to="/auth/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default RegisterPhone;
