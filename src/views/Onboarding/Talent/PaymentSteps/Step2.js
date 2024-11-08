/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Row,
  FormFeedback,
  Spinner,
  UncontrolledTooltip,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Eye, EyeOff } from 'react-feather';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as Yup from 'yup';
import classNames from 'classnames';

import { yupResolver } from '@hookform/resolvers/yup';
import { selectThemeColors } from '@utils';

import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileFormContainer, UploadIconContainer } from '../../style';
import theme from '../../../../configs/themeVariables';
import { getPaymentDetails, updatePaymentDetails } from '../../../../redux/actions/paymentActions';
import { saveCheckpointComplete } from '../../../../redux/actions/talentOnboardingActions';
import AccountCreatedModal from '../../AccountCreatedModal';
import { filteredFormSchema, formatDate } from '../../../../utility/Utils';
import { TooltipWrapper } from '../../../styled';
import { formData } from '../../../../redux/selectors/formDataSelectors';
import { setFormData } from '../../../../redux/reducers/formData';
import { CITIZEN_TYPES } from '../../../../utility/constants/Constant';

// eslint-disable-next-line react/prop-types
const Step2 = ({ setStep, step }) => {
  const savedFormData = useSelector(formData);
  const [confirmSign, setConfirmSign] = useState({
    checkbox1: savedFormData?.confirmSign?.checkbox1 || false,
    checkbox2: savedFormData?.confirmSign?.checkbox2 || false,
  });

  const [isDocumentConfirmed, setIsDocumentConfirmed] = useState(savedFormData?.isDocumentConfirmed || false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [taxUserType, setTaxUserType] = useState(savedFormData?.taxUserType || CITIZEN_TYPES.US);
  const [selectedTaxId] = useState('taxOption1');
  const [isPaymentOnboardingDone, setIsPaymentOnboardingDone] = useState(
    savedFormData?.isPaymentOnboardingDone || false,
  );

  const paymentDetailsLoading = useSelector((state) => state.PaymentDetails?.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const taxIdentitySchema = Yup.object().shape({
    taxName: Yup.string()
      .min(3, 'name must be at least 3 characters')
      .max(25, 'name must be at most 25 characters')
      .matches(/^[a-zA-Z0-9 _]+$/, 'name should not contain special characters')
      .required('name is required'),
    taxClass: Yup.object()
      .shape({
        label: Yup.string().required('Tax classification is required'),
        value: Yup.string().required('This is required'),
      })
      .transform((value) => (value === null ? undefined : value))
      .required('This is required'),
    taxType: Yup.string(),
    ssnTaxId: Yup.number().when('taxType', {
      is: (taxType) => taxType === CITIZEN_TYPES.US,
      then: () =>
        Yup.number()
          .required('Tax Id is required')
          .min(100000000, 'Tax Id must be 9 digits without any special characters')
          .max(999999999, 'Tax Id must be 9 digits without any special characters')
          .integer('Tax Id must be a number')
          .typeError('Tax Id Must be a number'),
      otherwise: () => Yup.number().nullable(),
    }),
    nsnTaxId: Yup.string().when('taxType', {
      is: (taxType) => taxType === 'NON_US',
      then: () => Yup.string().required('Tax Id is required'),
      otherwise: () => Yup.string().nullable(),
    }),
  });

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, step }));
  }, [step]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(taxIdentitySchema),
    defaultValues: {
      taxName: savedFormData?.taxName || '',
      taxClass: savedFormData?.taxClass || '',
      taxType: '',
      ssnTaxId: savedFormData?.ssnTaxId || null,
      nsnTaxId: savedFormData?.nsnTaxId || null,
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
        formSchemaFields: taxIdentitySchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);
  useEffect(() => {
    const signs = {
      checkbox1: confirmSign?.checkbox1,
      checkbox2: confirmSign?.checkbox2,
    };
    const allData = { ...savedFormData, confirmSign: signs, isDocumentConfirmed, isPaymentOnboardingDone };
    dispatch(setFormData(allData));
  }, [confirmSign, isDocumentConfirmed, isPaymentOnboardingDone]);

  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      if (res?.is_payment_gateway_onboarded) setIsPaymentOnboardingDone(res?.is_payment_gateway_onboarded);
      if (res?.tax_user_type?.length > 0) {
        setTaxUserType(res?.tax_user_type);
      }
      if (res.tax_identification?.legal_name?.length > 0) {
        setValue('taxName', savedFormData?.taxName || res.tax_identification?.legal_name);
      }
      if (res.tax_identification?.federal_tax_classification?.length > 0) {
        setValue('taxClass', {
          label: 'Individual',
          value: savedFormData?.taxClass?.value || res.tax_identification?.federal_tax_classification,
        });
      }
      if (res.tax_identification?.social_security_number?.length > 0 && res?.tax_user_type === CITIZEN_TYPES.US) {
        setValue('ssnTaxId', savedFormData?.ssnTaxId || res.tax_identification?.social_security_number, {
          shouldValidate: true,
        });
      }
      if (res.tax_identification?.national_taxpayer_number?.length > 0 && res?.tax_user_type === 'NON_US') {
        setValue('nsnTaxId', savedFormData?.nsnTaxId || res.tax_identification?.national_taxpayer_number, {
          shouldValidate: true,
        });
      }
      if (res?.tax_user_type) {
        setValue('taxType', res?.tax_user_type);
      }
    }
  };

  const [currentDate, setCurrentDate] = useState(null);

  const handleConfirmed = () => {
    setIsDocumentConfirmed(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    setCurrentDate(formatDate(formattedDate));
  };

  useEffect(() => {
    dispatch(getPaymentDetails(onGetPaymentDetailsSuccess));
  }, []);

  const taxClassificationOptions = [{ label: 'Individual', value: 'INDIVIDUAL' }];

  const handleSignCheck = (e) => {
    setConfirmSign((prev) => ({
      ...prev,
      [e.target.name]: !prev[`${e.target.name}`],
    }));
  };

  const onBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const onComplete = () => {
    if (location.pathname.includes('profile-edit')) {
      navigate('/dashboard');
    } else {
      setAccountCreatedModal(true);
    }
  };

  const onSuccess = () => {
    setStep(3);
  };

  const onSkipClick = () => {
    if (location.pathname.includes('profile-edit')) {
      navigate('/dashboard');
    } else {
      dispatch(saveCheckpointComplete(onComplete, onComplete));
    }
  };
  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);
  const onSubmit = (data) => {
    if (isPaymentOnboardingDone) {
      setStep(3);
    } else {
      const taxDetails = {
        tax_identification: {
          legal_name: data?.taxName,
          federal_tax_classification: data?.taxClass?.value,
          social_security_number: data?.ssnTaxId || '',
          national_taxpayer_number: data?.nsnTaxId || '',
          tax_payer_identification_type:
            taxUserType === CITIZEN_TYPES.US ? 'SOCIAL_SECURITY_NUMBER' : 'NATIONAL_TAXPAYER_NUMBER',
        },
      };

      const updatedData = {
        ...taxDetails,
      };

      dispatch(updatePaymentDetails(updatedData, onSuccess));
    }
  };
  const [inputVisibility, setInputVisibility] = useState(false);

  const renderIcon = () => {
    const size = 18;

    if (inputVisibility === false) {
      return <Eye color="#E3E6EF" size={size} />;
    }
    return <EyeOff color="#E3E6EF" size={size} />;
  };

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}

      <h4>STEP 2 - Taxpayer Identification</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">
              Tax Identification<span className="label-asterisk me-50">*</span>
            </h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <h5 className="mb-1 w-75">
              Your taxpayer identification information will be included as Trumio W-9 or W-8 series substitute from.
            </h5>
            <div className="d-flex w-75 mb-2">
              <Col className="d-flex gap-50 form-check">
                <Input
                  type="radio"
                  checked={taxUserType === 'NON_US'}
                  disabled={taxUserType === CITIZEN_TYPES.US}
                  name="non_us_person"
                />
                <div>I am not a US person</div>
              </Col>
              <Col className="d-flex gap-50 form-check">
                <Input
                  type="radio"
                  checked={taxUserType === CITIZEN_TYPES.US}
                  disabled={taxUserType === 'NON_US'}
                  name="us_person"
                />
                <div>I am a US person</div>
              </Col>
            </div>

            <Row className="mb-1 mt-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="taxName">
                  Legal name of taxpayer<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="taxName"
                  name="taxName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled={isPaymentOnboardingDone}
                      placeholder="Provide same name as shown on your tax return"
                      invalid={errors.taxName && true}
                      className="payment-form-control"
                    />
                  )}
                />
                {errors.taxName && <FormFeedback>{errors.taxName.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="taxClass">
                  Federal tax classification<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="taxClass"
                  name="taxClass"
                  control={control}
                  invalid={errors.taxClass && true}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      isLoading={false}
                      options={taxClassificationOptions}
                      isDisabled={isPaymentOnboardingDone}
                      menuPosition="fixed"
                      minMenuHeight={200}
                      classNamePrefix="select"
                      placeholder="Individual"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.taxClass?.value,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.taxClass && <FormFeedback>{errors.taxClass?.label?.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mt-1 mb-1">
              {taxUserType === CITIZEN_TYPES.US && (
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="ssnTaxId">
                    SSN #<span className="label-asterisk me-25">*</span>
                  </Label>
                  <Info size={18} color={theme.infoIcon} id="security-number" />
                  <UncontrolledTooltip placement="right" target="security-number">
                    <div className="d-flex flex-column align-items-start">
                      <p className="m-0 text-start">Enter Social Security Number (SSN) eg gov ID#</p>
                    </div>
                  </UncontrolledTooltip>
                  <Controller
                    id="ssnTaxId"
                    name="ssnTaxId"
                    control={control}
                    render={({ field }) => (
                      <InputGroup
                        className={`payment-form-control input-group-merge ${errors.ssnTaxId && 'is-invalid'}`}
                      >
                        <Input
                          type={inputVisibility === false ? 'password' : 'text'}
                          {...field}
                          invalid={errors.ssnTaxId && true}
                          placeholder="Enter SSN #"
                        />
                        <InputGroupText className="cursor-pointer" onClick={() => setInputVisibility(!inputVisibility)}>
                          {renderIcon()}
                        </InputGroupText>
                      </InputGroup>
                    )}
                  />
                  {errors.ssnTaxId && <FormFeedback>{errors.ssnTaxId.message}</FormFeedback>}
                </Col>
              )}
              {taxUserType === 'NON_US' && (
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="nsnTaxId">
                    NSN #<span className="label-asterisk me-25">*</span>
                  </Label>
                  <Info size={18} color={theme.infoIcon} id="security-number" />
                  <UncontrolledTooltip placement="right" target="security-number">
                    <TooltipWrapper>
                      <div className="d-flex flex-column align-items-start tooltip-style">
                        <p>Government recognized unique national security number. E.g. PAN Card, Aadhar Card, etc.</p>
                      </div>
                    </TooltipWrapper>
                  </UncontrolledTooltip>
                  <Controller
                    id="nsnTaxId"
                    name="nsnTaxId"
                    control={control}
                    render={({ field }) => (
                      <InputGroup
                        className={`payment-form-control input-group-merge ${errors.nsnTaxId && 'is-invalid'}`}
                      >
                        <Input
                          type={inputVisibility === false ? 'password' : 'text'}
                          {...field}
                          invalid={errors.nsnTaxId && true}
                          placeholder="Enter NSN #"
                          autoComplete="none"
                        />
                        <InputGroupText className="cursor-pointer" onClick={() => setInputVisibility(!inputVisibility)}>
                          {renderIcon()}
                        </InputGroupText>
                      </InputGroup>
                    )}
                  />
                  {errors.nsnTaxId && <FormFeedback>{errors.nsnTaxId.message}</FormFeedback>}
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>

        {taxUserType === CITIZEN_TYPES.US ? (
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">Tax certifications and confirmation of unchanged status</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <h5 className="w-75">
                Please read and scroll to the bottom of W-9 certification, and consent to be able to confirm electronic
                delivery of the document.
              </h5>

              <div className="w-50 shadow p-2 rounded mt-2 mb-50 w-100">
                <h4 className="mb-2">Electronic Consent</h4>
                <ol className="order-list">
                  <li>
                    I am not subject to backup withholding because:
                    <br />
                    (a) I am exempt from backup withholding , or
                    <br />
                    (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup
                    withholding as a result a failure to report all interest or dividends, or <br />
                    (c) the IRS has notified me that i am no longer subject to backup withholding; and
                  </li>
                  <li>I am a U.S. citizen or other U.S. person (defined below); and</li>
                  <li>
                    The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is
                    correct.
                  </li>
                </ol>
              </div>
              <div className="d-flex flex-column mt-2">
                <Label className="fs-5">Signed On : {currentDate || ''}</Label>
                <Col className="d-flex gap-50 mt-1 mb-1 form-check">
                  <Input
                    type="checkbox"
                    name="checkbox1"
                    checked={confirmSign.checkbox1 || isPaymentOnboardingDone}
                    disabled={isPaymentOnboardingDone || isDocumentConfirmed}
                    onChange={handleSignCheck}
                  />
                  <Label className="fs-6">
                    I consent to provide an electronic signature by clicking on the above ‘I confirm’ button.
                  </Label>
                </Col>
                <Col className="d-flex gap-50 mt-1 mb-1 form-check">
                  <Input
                    type="checkbox"
                    name="checkbox2"
                    checked={confirmSign.checkbox2 || isPaymentOnboardingDone}
                    disabled={isPaymentOnboardingDone || isDocumentConfirmed}
                    onChange={handleSignCheck}
                  />
                  <Label className="fs-6">I consent to receive tax documents digitally.</Label>
                </Col>
                <Button
                  color="primary"
                  onClick={handleConfirmed}
                  className="mt-1 mb-1"
                  style={{ width: '120px' }}
                  disabled={
                    !confirmSign.checkbox1 || !confirmSign.checkbox2 || isDocumentConfirmed || isPaymentOnboardingDone
                  }
                >
                  {isDocumentConfirmed || isPaymentOnboardingDone ? 'Confirmed' : 'I Confirm'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : null}

        <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip</span>
              <ChevronRight size={14} />
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={
                taxUserType === 'NON_US' || isPaymentOnboardingDone
                  ? false
                  : !confirmSign.checkbox1 || !confirmSign.checkbox2 || !isDocumentConfirmed
              }
            >
              {paymentDetailsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">
                    {taxUserType === CITIZEN_TYPES.US
                      ? 'STEP 3 - US-W-9 form'
                      : taxUserType === 'NON_US' && selectedTaxId === 'taxOption2'
                      ? 'Email Customer Support'
                      : 'STEP 3 - US-W-8 form'}
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

export default Step2;
