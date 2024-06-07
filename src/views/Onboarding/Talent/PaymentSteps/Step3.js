import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  FormFeedback,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info } from 'react-feather';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import InputPasswordToggle from '@components/input-password-toggle';
import classNames from 'classnames';
import Select from 'react-select';
import { PropTypes } from 'prop-types';

import { selectThemeColors } from '@utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { filteredFormSchema, returnFilteredDropdownOptions } from '../../../../utility/Utils';
import { countriesService } from '../../../../services/staticServices';
import { getStates, getCities, getCountries } from '../../../../redux/actions/staticActions';
import { getPaymentDetails, setupStripeAccount, updatePaymentDetails } from '../../../../redux/actions/paymentActions';
import { states, statesLoading, cities, citiesLoading, countries } from '../../../../redux/selectors/staticSelectors';
import CertificationUS from './CertificationUs';
import CertificationNonUs from './CertificationNonUs';
import AccountCreatedModal from '../../AccountCreatedModal';
import { saveCheckpointComplete } from '../../../../redux/actions/talentOnboardingActions';

import { usWFormsSchema } from '../Schema';
import { TooltipWrapper } from '../../../styled';
import { formData } from '../../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../../../redux/reducers/formData';

const Step3 = ({ setStep, step }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [pStatesOptions, setPStatesOptions] = useState(null);
  const [mStatesOptions, setMStatesOptions] = useState(null);
  const [pCitiesOptions, setPCitiesOptions] = useState(null);
  const [mCitiesOptions, setMCitiesOptions] = useState(null);
  const [copyAddress, setCopyAddress] = useState(savedFormData?.copyAddress || false);
  const [isConfirmed, setIsConfirmed] = useState(savedFormData?.isConfirmed || false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [paymentDetailsRes, setPaymentDetailsRes] = useState(null);
  const [taxPayer, setTaxPayer] = useState(savedFormData?.taxPayer || 'option1');

  const isUsPerson = paymentDetailsRes?.tax_user_type === 'US';
  const [isAgreed, setIsAgreed] = useState(savedFormData?.isAgreed || !!isUsPerson);
  const [isPaymentOnboardingDone, setIsPaymentOnboardingDone] = useState(false);

  const countriesData = useSelector(countries);
  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);
  const paymentDetailsLoading = useSelector((state) => state.PaymentDetails?.loading);
  const stripeDetailsLoading = useSelector((state) => state?.stripeDetails?.loading);

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, step }));
  }, [step]);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(usWFormsSchema),
    defaultValues: {
      fullName: savedFormData?.fullName || '',
      citizen: savedFormData?.citizen || '',
      pAddress: savedFormData?.pAddress || '',
      pHouseNo: savedFormData?.pHouseNo || '',
      pState: savedFormData?.pState || '',
      pCountry: savedFormData?.pCountry || '',
      pCity: savedFormData?.pCity || '',
      pZipCode: savedFormData?.pZipCode || '',
      mAddress: savedFormData?.mAddress || '',
      mHouseNo: savedFormData?.mHouseNo || '',
      mState: savedFormData?.mState || '',
      mCountry: savedFormData?.mCountry || '',
      mCity: savedFormData?.mCity || '',
      mZipCode: savedFormData?.mZipCode || '',
    },
  });
  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, taxPayer }));
  }, [taxPayer]);

  useEffect(() => {
    const allData = {
      ...savedFormData,
      copyAddress,
      mAddress: copyAddress ? savedFormData?.pAddress : savedFormData?.mAddress,
      mHouseNo: copyAddress ? savedFormData?.pHouseNo : savedFormData?.mHouseNo,
      mCountry: copyAddress ? savedFormData?.pCountry : savedFormData?.mCountry,
      mState: copyAddress ? savedFormData?.pState : savedFormData?.mState,
      mCity: copyAddress ? savedFormData?.pCity : savedFormData?.mCity,
      mZipCode: copyAddress ? savedFormData?.pZipCode : savedFormData?.mZipCode,
    };
    dispatch(setFormData(allData));
  }, [copyAddress]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: usWFormsSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (dataLoaded && watch('pCountry')) {
      setValue(
        'pState',
        savedFormData?.pCountry && savedFormData?.pCountry.label === watch('pCountry').label
          ? savedFormData?.pState
          : '',
      );
      setValue(
        'pCity',
        savedFormData?.pState && savedFormData?.pState.label === watch('pState').label ? savedFormData?.pCity : '',
      );
      if (copyAddress) {
        setValue(
          'mState',
          savedFormData?.pCountry && savedFormData?.pCountry.label === watch('pCountry').label
            ? savedFormData?.mState
            : '',
        );
        setValue(
          'mCity',
          savedFormData?.pState && savedFormData?.pCountry.label === watch('pCountry').label
            ? savedFormData?.mCity
            : '',
        );
      }
      if (copyAddress) setValue('mCountry', watch('pCountry'));
      dispatch(getStates(watch('pCountry').value));
    }
  }, [watch('pCountry')]);

  useEffect(() => {
    if (dataLoaded && watch('pState')) {
      setValue('pCity', savedFormData?.pState.value === watch('pState').value ? savedFormData?.mCity : '');
      if (copyAddress) setValue('mState', watch('pState'));
      dispatch(getCities(watch('pState').value));
    }
  }, [watch('pState')]);

  useEffect(() => {
    if (copyAddress) setValue('mCity', watch('pCity'));
  }, [watch('pCity')]);

  useEffect(() => {
    if (dataLoaded && watch('mCountry')) {
      setValue(
        'mState',
        savedFormData?.mCountry && savedFormData?.mCountry.label === watch('mCountry').label
          ? savedFormData?.mState
          : '',
      );
      setValue(
        'mCity',
        savedFormData?.mCountry && savedFormData?.mCountry.label === watch('mCountry').label
          ? savedFormData?.mCity
          : '',
      );
      dispatch(getStates(watch('mCountry').value));
    }
  }, [watch('mCountry')]);

  useEffect(() => {
    if (dataLoaded && watch('mState')) {
      setValue(
        'mCity',
        savedFormData?.mState && savedFormData?.mState.label === watch('mState').label ? savedFormData?.mCity : '',
      );
      dispatch(getCities(watch('mState').value));
    }
  }, [watch('mState')]);

  useEffect(() => {
    const allData = {
      ...savedFormData,
      pAddress: watch('pAddress'),
      pHouseNo: watch('pHouseNo'),
      mAddress: copyAddress ? watch('pAddress') : watch('mAddress'),
      mHouseNo: copyAddress ? watch('pHouseNo') : watch('mHouseNo'),
      mZipCode: copyAddress ? watch('pZipCode') : watch('mZipCode'),
    };
    if (copyAddress) {
      setValue('mAddress', watch('pAddress'));
      setValue('mHouseNo', watch('pHouseNo'));
      setValue('mZipCode', watch('pZipCode'));
    }
    dispatch(setFormData(allData));
  }, [watch('pAddress'), watch('pHouseNo'), watch('pZipCode')]);

  useEffect(() => {
    if (location.pathname.includes('/talent-profile-edit')) {
      if (watch('pCountry')) {
        dispatch(getStates(watch('pCountry').value));
      }
    }
  }, [watch('pCountry')]);

  useEffect(() => {
    if (location.pathname.includes('/talent-profile-edit')) {
      if (watch('pState')) {
        dispatch(getCities(watch('pState').value));
      }
    }
  }, [watch('pState')]);

  useEffect(() => {
    if (location.pathname.includes('/talent-profile-edit')) {
      if (watch('mCountry')) {
        dispatch(getStates(watch('mCountry').value));
      }
    }
  }, [watch('mCountry')]);

  useEffect(() => {
    if (location.pathname.includes('/talent-profile-edit')) {
      if (watch('mState')) {
        dispatch(getCities(watch('mState').value));
      }
    }
  }, [watch('mState')]);

  useEffect(() => {
    const requiredData = statesData?.map((state) => ({ label: state.name, value: state._id }));
    setPStatesOptions(requiredData);
    setMStatesOptions(requiredData);
  }, [statesData]);

  useEffect(() => {
    const requiredData = citiesData?.map((city) => ({ label: city.name, value: city._id }));
    setPCitiesOptions(requiredData);
    setMCitiesOptions(requiredData);
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

  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      setPaymentDetailsRes(res);
      if (res?.is_payment_gateway_onboarded) setIsPaymentOnboardingDone(res?.is_payment_gateway_onboarded);
      if (res?.w8bendetails && Object.keys(res?.w8bendetails)?.length > 0) {
        setValue('citizen', {
          label: savedFormData?.citizen?.label || res?.w8bendetails?.country_of_citizenship,
          value: savedFormData?.citizen?.value || res?.w8bendetails?.country_of_citizenship?.toUpperCase(),
        });
        setValue('fullName', savedFormData?.fullName || res.w8bendetails.full_name);
        setValue('refNo', savedFormData?.refNo || res?.w8bendetails?.us_tax_id_reference_number);
        setValue('dob', savedFormData?.dob || res?.w8bendetails?.dob);
        setTaxPayer(res?.w8bendetails?.has_us_tax_id ? 'option1' : 'option2');
      }
      if (res?.w9details && Object.keys(res?.w9details)?.length > 0) {
        setValue('citizen', {
          label: savedFormData?.citizen?.label || res?.w9details?.country_of_citizenship,
          value: savedFormData?.citizen?.value || res?.w9details?.country_of_citizenship?.toUpperCase(),
        });
        setValue('fullName', savedFormData?.fullName || res.w9details.full_name);
        setValue('refNo', savedFormData?.refNo || res?.w9details?.us_tax_id_reference_number);
        setValue('dob', savedFormData?.dob || res?.w9details?.dob);
        setTaxPayer(res?.w9details?.has_us_tax_id ? 'option1' : 'option2');
      }
      if (res?.w9details?.permanent_residence) {
        const countryData = {
          label: savedFormData?.pCountry?.label || res?.w9details?.permanent_residence?.country,
          value: savedFormData?.pCountry?.value || res?.w9details?.permanent_residence?.country?.toUpperCase(),
        };
        setValue('pCountry', countryData);
        dispatch(setFormData({ ...savedFormData, pCountry: countryData }));
        const stateData = {
          label: savedFormData?.pState?.label || res?.w9details?.permanent_residence?.state,
          value: savedFormData?.pState?.value || res?.w9details?.permanent_residence?.state?.toUpperCase(),
        };
        setValue('pState', stateData);
        dispatch(setFormData({ ...savedFormData, pState: stateData }));
        const cityData = {
          label: savedFormData?.pCity?.label || res?.w9details?.permanent_residence?.city,
          value: savedFormData?.pCity?.value || res?.w9details?.permanent_residence?.city?.toUpperCase(),
        };

        setValue('pCity', cityData);
        dispatch(setFormData({ ...savedFormData, pCity: cityData }));
        setValue('pAddress', savedFormData?.pAddress || res?.w9details?.permanent_residence?.street_address);
        setValue('pHouseNo', savedFormData?.pHouseNo || res?.w9details?.permanent_residence?.house_number);
        setValue('pZipCode', savedFormData?.pZipCode || res?.w9details?.permanent_residence?.zip_code);
      }
      if (res?.w8bendetails?.permanent_residence) {
        setValue('pCountry', {
          label: savedFormData?.pCountry?.label || res?.w8bendetails?.permanent_residence?.country,
          value: savedFormData?.pCountry?.value || res?.w8bendetails?.permanent_residence?.country?.toUpperCase(),
        });
        setValue('pState', {
          label: savedFormData?.pState?.label || res?.w8bendetails?.permanent_residence?.state,
          value: savedFormData?.pState?.value || res?.w8bendetails?.permanent_residence?.state?.toUpperCase(),
        });
        setValue('pCity', {
          label: savedFormData?.pCity?.label || res?.w8bendetails?.permanent_residence?.city,
          value: savedFormData?.pCity?.value || res?.w8bendetails?.permanent_residence?.city?.toUpperCase(),
        });
        setValue('pAddress', savedFormData?.pAddress || res?.w8bendetails?.permanent_residence?.street_address);
        setValue('pHouseNo', savedFormData?.pHouseNo || res?.w8bendetails?.permanent_residence?.house_number);
        setValue('pZipCode', savedFormData?.pZipCode || res?.w8bendetails?.permanent_residence?.zip_code);
      }
      if (res?.w9details?.mailing_address) {
        setValue('mCountry', {
          label: savedFormData?.mCountry?.label || res?.w9details?.mailing_address?.country,
          value: savedFormData?.mCountry?.value || res?.w9details?.mailing_address?.country?.toUpperCase(),
        });
        setValue('mState', {
          label: savedFormData?.mState?.label || res?.w9details?.mailing_address?.state,
          value: savedFormData?.mState?.value || res?.w9details?.mailing_address?.state?.toUpperCase(),
        });
        setValue('mCity', {
          label: savedFormData?.mCity?.label || res?.w9details?.mailing_address?.city,
          value: savedFormData?.mCity?.value || res?.w9details?.mailing_address?.city?.toUpperCase(),
        });
        setValue('mAddress', savedFormData?.mAddress || res?.w9details?.mailing_address?.street_address);
        setValue('mHouseNo', savedFormData?.mHouseNo || res?.w9details?.mailing_address?.house_number);
        setValue('mZipCode', savedFormData?.mZipCode || res?.w9details?.mailing_address?.zip_code);
      }
      if (res?.w8bendetails?.mailing_address) {
        setValue('mCountry', {
          label: savedFormData?.mCountry?.label || res?.w8bendetails?.mailing_address?.country,
          value: savedFormData?.mCountry?.value || res?.w8bendetails?.mailing_address?.country?.toUpperCase(),
        });
        setValue('mState', {
          label: savedFormData?.mState?.label || res?.w8bendetails?.mailing_address?.state,
          value: savedFormData?.mState?.value || res?.w8bendetails?.mailing_address?.state?.toUpperCase(),
        });
        setValue('mCity', {
          label: savedFormData?.mCity?.label || res?.w8bendetails?.mailing_address?.city,
          value: savedFormData?.mCity?.value || res?.w8bendetails?.mailing_address?.city?.toUpperCase(),
        });
        setValue('mAddress', savedFormData?.mAddress || res?.w8bendetails?.mailing_address?.street_address);
        setValue('mHouseNo', savedFormData?.mHouseNo || res?.w8bendetails?.mailing_address?.house_number);
        setValue('mZipCode', savedFormData?.mZipCode || res?.w8bendetails?.mailing_address?.zip_code);
      }
    }
    setDataLoaded(true);
  };

  useEffect(() => {
    if (countriesData?.length > 0 && paymentDetailsRes && paymentDetailsRes?.tax_user_type === 'US') {
      const unitedStates = countriesData.find((country) => country.name === 'United States');

      setValue('citizen', {
        label: unitedStates?.name,
        value: unitedStates?._id,
      });
    }
  }, [countriesData, paymentDetailsRes]);

  useEffect(() => {
    dispatch(getPaymentDetails(onGetPaymentDetailsSuccess));
    dispatch(getCountries());
  }, []);

  const handleTaxPayerNoOption = (e) => {
    setTaxPayer(e.target.name);
  };

  const onBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const handleCopyAddress = () => {
    setCopyAddress((prev) => !prev);
  };

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const onAccountCreationSuccess = (res) => {
    if (res?.url?.length > 0) {
      // eslint-disable-next-line no-undef
      window.open(res.url, '_self');
    }
  };

  // eslint-disable-next-line no-undef
  const currentURL = window.location.href;

  const onSuccess = () => {
    dispatch(clearAllFormData());
    const stripeAccountData = {
      refresh_url: currentURL,
      return_url: currentURL,
    };
    dispatch(setupStripeAccount(stripeAccountData, onAccountCreationSuccess));
  };

  useEffect(() => {
    const {
      pAddress,
      pHouseNo,
      pCountry,
      pCity,
      pState,
      pZipCode,
      mAddress,
      mHouseNo,
      mCountry,
      mState,
      mCity,
      mZipCode,
    } = getValues();
    if (copyAddress) {
      setValue('mAddress', pAddress);
      setValue('mHouseNo', pHouseNo);
      setValue('mCountry', pCountry);
      setValue('mCity', pCity);
      setValue('mState', pState);
      setValue('mZipCode', pZipCode);
    } else {
      setValue('mAddress', mAddress);
      setValue('mHouseNo', mHouseNo);
      setValue('mCountry', mCountry);
      setValue('mCity', mCity);
      setValue('mState', mState);
      setValue('mZipCode', mZipCode);
    }
  }, [copyAddress]);

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate('/dashboard');
    } else {
      dispatch(saveCheckpointComplete(onSuccess));
    }
  };

  const onSubmit = (data) => {
    const wDetails = {
      [isUsPerson ? 'w9details' : 'w8bendetails']: {
        full_name: data?.fullName,
        country_of_citizenship: data?.citizen?.label,
        permanent_residence: {
          country: data?.pCountry?.label,
          state: data?.pState?.label,
          city: data?.pCity?.label,
          street_address: data?.pAddress,
          house_number: data?.pHouseNo,
          zip_code: data?.pZipCode,
        },
        mailing_address: {
          country: data?.mCountry?.label,
          state: data?.mState?.label,
          city: data?.mCity?.label,
          street_address: data?.mAddress,
          house_number: data?.mHouseNo,
          zip_code: data?.mZipCode,
        },
        has_us_tax_id: taxPayer === 'option1',
        us_tax_id_reference_number: data?.refNo ?? '',
        dob: data?.dob ?? '',
      },
    };
    const newData = {
      ...wDetails,
    };

    dispatch(updatePaymentDetails(newData, onSuccess));
  };

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
      <h4>{!isUsPerson ? 'STEP 3 - US Form W8BEN' : 'STEP 3 - US W-9 Form'}</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">{isUsPerson ? 'US W-9 Form' : 'US Form W8BEN'}</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <h5>
              Your Taxpayer information will be included in a Trumio W-8 substitute form. Complete this form if you are
              a non US person resident outside the US.
            </h5>
            <div className="mt-1">
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
                    <Label className="font-small-1">Name of individual who is the beneficial owner</Label>
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
                        {...field}
                        isDisabled={isUsPerson}
                        loadOptions={loadCountriesOptions}
                        classNamePrefix="select"
                        placeholder="Select your country"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.citizen,
                        })}
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
                        options={pStatesOptions}
                        isDisabled={!watch('pCountry')}
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
                        isDisabled={!watch('pState') || !watch('pCountry')}
                        menuPosition="fixed"
                        minMenuHeight={200}
                        options={pCitiesOptions}
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
                  <Label className="mt-50 font-small-1">NOTE : Do not use a P.O. box or in-care-of address</Label>
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
              <Col className="d-flex gap-50 form-check">
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
                      <Input
                        {...field}
                        disabled={copyAddress}
                        placeholder="Enter street address"
                        invalid={!copyAddress && errors.mAddress && true}
                        className="payment-form-control"
                      />
                    )}
                  />
                  {!copyAddress && errors.mAddress && <FormFeedback>{errors.mAddress?.message}</FormFeedback>}
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
                      <Input
                        {...field}
                        placeholder="Enter house number"
                        disabled={copyAddress}
                        invalid={errors.mHouseNo && true}
                        className="payment-form-control"
                      />
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
                        isDisabled={copyAddress}
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
                        isDisabled={copyAddress || !watch('mCountry')}
                        options={mStatesOptions}
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
                        isDisabled={copyAddress || !watch('mCountry') || !watch('mState')}
                        options={mCitiesOptions}
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
                  <Label className="mt-50 font-small-1">NOTE : Do not use a P.O. box or in-care-of address</Label>
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
                        disabled={copyAddress}
                        autoComplete="none"
                        className="payment-form-control"
                      />
                    )}
                  />
                  {errors.mZipCode && <FormFeedback>{errors.mZipCode?.message}</FormFeedback>}
                </Col>
              </Row>

              <h4 className="mt-3 mb-2">Do you have a US Taxpayer Identification number?</h4>
              <div className="d-flex gap-3">
                <div className="d-flex gap-50 form-check">
                  <Input
                    type="radio"
                    name="option2"
                    checked={!isUsPerson}
                    disabled={isUsPerson}
                    onChange={handleTaxPayerNoOption}
                  />
                  <Label className="fs-6">No</Label>
                </div>
                <div className="d-flex gap-50 form-check">
                  <Input
                    type="radio"
                    name="option1"
                    disabled={!isUsPerson}
                    checked={isUsPerson}
                    onChange={handleTaxPayerNoOption}
                  />
                  <Label className="fs-6">Yes</Label>
                </div>
              </div>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="taxId">
                    {!isUsPerson ? 'NSN #' : 'SSN #'}
                    <span className="label-asterisk me-25">*</span>
                  </Label>
                  <Info size={18} color={theme.infoIcon} id="security-number" />
                  <UncontrolledTooltip placement="right" target="security-number">
                    <TooltipWrapper>
                      <div className="d-flex flex-column align-items-start">
                        <p className="m-0 text-start tooltip-style">
                          {!isUsPerson
                            ? 'Government recognized unique national security number. E.g. PAN Card, Aadhar Card, etc.'
                            : 'Enter Social Security Number (SSN) eg gov ID#'}
                        </p>
                      </div>
                    </TooltipWrapper>
                  </UncontrolledTooltip>
                  <InputPasswordToggle
                    className="no-right-border"
                    placeholder={!isUsPerson ? 'Enter NSN #' : 'Enter SSN #'}
                    id="taxId"
                    name="taxId"
                    value={
                      isUsPerson
                        ? paymentDetailsRes?.tax_identification?.social_security_number
                        : paymentDetailsRes?.tax_identification?.national_taxpayer_number
                    }
                    disabled
                  />
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>

        {isUsPerson ? (
          <CertificationUS
            isConfirmed={isConfirmed}
            onConfirm={() => {
              setIsConfirmed(true);
              dispatch(setFormData({ ...savedFormData, isConfirmed: true }));
            }}
          />
        ) : (
          <CertificationNonUs
            isAgreed={isAgreed}
            onChange={() => {
              setIsAgreed(!isAgreed);
              dispatch(setFormData({ ...savedFormData, isAgreed: !isAgreed }));
            }}
          />
        )}
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip stripe setup</span>
              <ChevronRight size={14} />
            </Button>
            <Button color="primary" type="submit" disabled={isUsPerson ? !isConfirmed : !isAgreed}>
              {paymentDetailsLoading || stripeDetailsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">
                    {isPaymentOnboardingDone ? 'Stripe Link Account' : 'Stripe Setup Account'}
                  </span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

Step3.propTypes = {
  setStep: PropTypes.func,
  step: PropTypes.number,
};

Step3.defaultProps = {
  setStep: () => {},
  step: 3,
};

export default Step3;
