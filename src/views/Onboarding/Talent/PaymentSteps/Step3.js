import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Card, CardBody, CardHeader, Input, Label, FormFeedback, Row } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import classNames from 'classnames';
import Select from 'react-select';
import * as Yup from 'yup';
import Flatpickr from 'react-flatpickr';

import { selectThemeColors } from '@utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { returnFilteredDropdownOptions } from '../../../../utility/Utils';
import { countriesService } from '../../../../services/staticServices';
import { getStates, getCities } from '../../../../redux/actions/staticActions';
import { updatePaymentDetails } from '../../../../redux/actions/paymentActions';
import { states, statesLoading, cities, citiesLoading } from '../../../../redux/selectors/staticSelectors';
import CertificationUS from './CertificationUs';
import CertificationNonUs from './CertificationNonUs';

const Step3 = ({ setStep }) => {
  const { userType } = useSelector((state) => state.PaymentDetails);

  const isUsPerson = false;

  const dispatch = useDispatch();

  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const [copyAddress, setCopyAddress] = useState(false);
  const [taxPayer, setTaxPayer] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(!isUsPerson);
  const [isAgreed, setIsAgreed] = useState(false);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);

  // const onSuccess = () => {
  //   if (location?.state?.isEditing) {
  //     navigate('/dashboard');
  //   } else {
  //     setAccountCreatedModal(true);
  //   }
  // };

  const usWFormsSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'name must be at least 3 characters')
      .max(25, 'name must be at most 25 characters')
      .matches(/^[a-zA-Z0-9 _]+$/, 'name should not contain special characters')
      .required('name is required'),
    citizen: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    pAddress: Yup.string(),
    pHouseNo: Yup.string(),
    pCountry: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    pState: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    pCity: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    pZipCode: Yup.string().required('This is required'),

    mAddress: Yup.string(),
    mHouseNo: Yup.string(),
    mCountry: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    mState: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    mCity: Yup.object()
      .shape({
        label: Yup.string().required('This is required'),
        value: Yup.string().required('This is required'),
      })
      .required('This is required'),
    mZipCode: Yup.string().required('This is required'),
    refNo: Yup.string().required('This is required'),
    dob: Yup.string(),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(usWFormsSchema),
    defaultValues: {
      fullName: '',
      citizen: '',
      pAddress: '',
      pHouseNo: '',
      pState: '',
      pCountry: '',
      pCity: '',
      pZipCode: '',
      mAddress: '',
      mHouseNo: '',
      mState: '',
      mCountry: '',
      mCity: '',
      mZipCode: '',
    },
  });

  useEffect(() => {
    if (watch('country')) {
      dispatch(getStates(watch('country').value));
    }
  }, [watch('country')]);

  useEffect(() => {
    if (watch('state')) {
      dispatch(getCities(watch('state').value));
    }
  }, [watch('state')]);

  useEffect(() => {
    const requiredData = statesData?.map((state) => ({ label: state.name, value: state._id }));
    setStatesOptions(requiredData);
  }, [statesData]);

  useEffect(() => {
    const requiredData = citiesData?.map((city) => ({ label: city.name, value: city._id }));
    setCitiesOptions(requiredData);
  }, [citiesData]);

  const loadCountriesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, countriesOptions),
      };
    }
    try {
      const response = await countriesService();

      const options = response?.data?.data?.map((country) => ({ label: country.name, value: country._id }));

      setCountriesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const handleTaxPayerNoOption = (e) => {
    setTaxPayer(e.target.name);
  };

  const onBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const handleCopyAddress = () => {
    setCopyAddress((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ProfileFormContainer>
      <h4>{userType === 'non_us_person' ? 'STEP 3 - US Form W8BEN' : 'STEP 3 - US W-9 Form'}</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">{userType === 'us_person' ? 'US W-9 Form' : 'US Form W8BEN'}</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <h5>
              Your Taxpayer information will be included in a Trumio W-8 substitute form. Complete this form if you are
              a non US person resident outside the US.
            </h5>
            <div className="w-50 mt-1">
              <h4 className="mt-3 mb-1 text-muted">PART I INFORMATION COLLECTION</h4>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="fullName">
                    Full Name<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="fullName"
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="John Doe" invalid={errors.fullName && true} />
                    )}
                  />
                  {errors.fullName ? (
                    <FormFeedback>{errors.fullName.message}</FormFeedback>
                  ) : (
                    <Label>Name of individual who is the beneficial owner</Label>
                  )}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="citizen">
                    Country of citizenship<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="citizen"
                    name="citizen"
                    control={control}
                    invalid={errors.citizen && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadCountriesOptions}
                        classNamePrefix="select"
                        placeholder="Select your country"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.citizen,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.citizen && <FormFeedback>{errors.citizen?.label?.message}</FormFeedback>}
                </Col>
              </Row>

              <h4 className="mt-3">
                Permanent residence Address<span className="label-asterisk me-50">*</span>
              </h4>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="pAddress">
                    Street Address
                  </Label>
                  <Controller
                    id="pAddress"
                    name="pAddress"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter street address" invalid={errors.pAddress && true} />
                    )}
                  />
                  {errors.pAddress && <FormFeedback>{errors.pAddress?.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="pHouseNo">
                    House Number
                  </Label>
                  <Controller
                    id="pHouseNo"
                    name="pHouseNo"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter house number" invalid={errors.pHouseNo && true} />
                    )}
                  />
                  {errors.pHouseNo && <FormFeedback>{errors.pHouseNo?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="pCountry">
                    Country<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="pCountry"
                    name="pCountry"
                    control={control}
                    invalid={errors.pCountry && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadCountriesOptions}
                        classNamePrefix="select"
                        placeholder="Select your country"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.pCountry,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.pCountry && <FormFeedback>{errors.pCountry.label?.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="pState">
                    State<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="pState"
                    name="pState"
                    control={control}
                    invalid={errors.pState && true}
                    value={watch('pState')}
                    render={({ field }) => (
                      <Select
                        isLoading={statesIsLoading}
                        options={statesOptions}
                        menuPosition="fixed"
                        classNamePrefix="select"
                        placeholder="Select your state"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.pState,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.pState && <FormFeedback>{errors.pState.label?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="pCity">
                    City<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="pCity"
                    name="pCity"
                    control={control}
                    invalid={errors.pCity && true}
                    value={watch('pCity')}
                    render={({ field }) => (
                      <Select
                        isLoading={citiesIsLoading}
                        menuPosition="fixed"
                        minMenuHeight={200}
                        options={citiesOptions}
                        classNamePrefix="select"
                        placeholder="Select your city"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.pCity,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.pCity && <FormFeedback>{errors.pCity.label?.message}</FormFeedback>}
                  <Label>NOTE : Do not use a P.O. box or in-care-of address</Label>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <Label className="form-label" for="pZipCode">
                    Postal Code<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="pZipCode"
                    name="pZipCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter zip code"
                        invalid={errors.pZipCode && true}
                        autoComplete="none"
                      />
                    )}
                  />
                  {errors.pZipCode && <FormFeedback>{errors.pZipCode?.message}</FormFeedback>}
                </Col>
              </Row>

              <h4 className="mt-4 mb-1">
                Mailing Address<span className="label-asterisk me-50">*</span>
              </h4>
              <Col className="d-flex gap-50">
                <Input type="checkbox" checked={copyAddress} onChange={handleCopyAddress} />
                <Label className="fs-5">Same as permanent residence address</Label>
              </Col>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mAddress">
                    Street Address
                  </Label>
                  <Controller
                    id="mAddress"
                    name="mAddress"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter street address" invalid={errors.mAddress && true} />
                    )}
                  />
                  {errors.mAddress && <FormFeedback>{errors.mAddress?.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mHouseNo">
                    House Number
                  </Label>
                  <Controller
                    id="mHouseNo"
                    name="mHouseNo"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter house number" invalid={errors.mHouseNo && true} />
                    )}
                  />
                  {errors.mHouseNo && <FormFeedback>{errors.mHouseNo?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mCountry">
                    Country<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="mCountry"
                    name="mCountry"
                    control={control}
                    invalid={errors.mCountry && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadCountriesOptions}
                        classNamePrefix="select"
                        placeholder="Select your country"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.mCountry,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.mCountry && <FormFeedback>{errors.mCountry.label?.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mState">
                    State<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="mState"
                    name="mState"
                    control={control}
                    invalid={errors.mState && true}
                    value={watch('mState')}
                    render={({ field }) => (
                      <Select
                        isLoading={statesIsLoading}
                        options={statesOptions}
                        menuPosition="fixed"
                        classNamePrefix="select"
                        placeholder="Select your state"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.mState,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.mState && <FormFeedback>{errors.mState.label?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mCity">
                    City<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="mCity"
                    name="mCity"
                    control={control}
                    invalid={errors.mCity && true}
                    value={watch('mCity')}
                    render={({ field }) => (
                      <Select
                        isLoading={citiesIsLoading}
                        menuPosition="fixed"
                        minMenuHeight={200}
                        options={citiesOptions}
                        classNamePrefix="select"
                        placeholder="Select your city"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.mCity,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.mCity && <FormFeedback>{errors.mCity.label?.message}</FormFeedback>}
                  <Label>NOTE : Do not use a P.O. box or in-care-of address</Label>
                </Col>
                <Col sm="6" md="6" lg="6">
                  <Label className="form-label" for="mZipCode">
                    Postal Code<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="mZipCode"
                    name="mZipCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter zip code"
                        invalid={errors.mZipCode && true}
                        autoComplete="none"
                      />
                    )}
                  />
                  {errors.mZipCode && <FormFeedback>{errors.mZipCode?.message}</FormFeedback>}
                </Col>
              </Row>

              <h4 className="mt-3 mb-2">Do you have a US Taxpayer Identification number?</h4>
              <div className="d-flex gap-3">
                <div className="d-flex gap-50">
                  <Input
                    type="radio"
                    name="option1"
                    checked={taxPayer === 'option1'}
                    onChange={handleTaxPayerNoOption}
                  />
                  <Label className="fs-6">Yes</Label>
                </div>
                <div className="d-flex gap-50">
                  <Input
                    type="radio"
                    name="option2"
                    checked={taxPayer === 'option2'}
                    onChange={handleTaxPayerNoOption}
                  />
                  <Label className="fs-6">No</Label>
                </div>
              </div>

              {taxPayer === 'option1' ? (
                <Row className="mb-1 mt-1">
                  <Col sm="6" md="6" lg="6">
                    <Label className="form-label" for="refNo">
                      Reference number(s) (see instructions)<span className="label-asterisk me-50">*</span>
                    </Label>
                    <Controller
                      id="refNo"
                      name="refNo"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter you Reference number(s)"
                          invalid={errors.refNo && true}
                          autoComplete="none"
                        />
                      )}
                    />
                    {errors.refNo && <FormFeedback>{errors.refNo?.message}</FormFeedback>}
                  </Col>
                  <Col>
                    <Label className="form-label" for="startDate">
                      Date of birth (see instructions)<span className="label-asterisk">*</span>
                    </Label>
                    <Controller
                      control={control}
                      id="dob"
                      name="dob"
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          placeholder="Enter MM-DD-YYYY"
                          options={{
                            minDate: 'today',
                            dateFormat: 'm-d-Y',
                          }}
                          className={classNames('form-control', {
                            'is-invalid': errors && errors.dob,
                          })}
                        />
                      )}
                    />
                    {errors.dob && <FormFeedback>{errors.dob?.message}</FormFeedback>}
                  </Col>
                </Row>
              ) : null}
            </div>
          </CardBody>
        </Card>

        {isUsPerson ? (
          <CertificationUS onConfirm={() => setIsConfirmed(true)} />
        ) : (
          <CertificationNonUs isAgreed={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
        )}
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" outline className="me-2" onClick={() => {}}>
              <span className="me-50">Skip stripe setup</span>
              <ChevronRight size={14} />
            </Button>
            <Button color="primary" type="submit" disabled={!isConfirmed || !isAgreed}>
              <>
                <span className="me-50">Set Up Stripe</span>
                <ChevronRight size={14} />
              </>
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Step3;
