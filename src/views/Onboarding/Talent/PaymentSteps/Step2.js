/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Card, CardBody, CardHeader, Input, Label, Row, FormFeedback, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
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

// eslint-disable-next-line react/prop-types
const Step2 = ({ setStep }) => {
  const [confirmSign, setConfirmSign] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const [isDocumentConfirmed, setIsDocumentConfirmed] = useState(false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(null);
  const [taxUserType, setTaxUserType] = useState('US');
  // eslint-disable-next-line no-unused-vars
  const [selectedTaxId, setSelectedTaxId] = useState('taxOption1');

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
    taxId: Yup.string().required('Tax Id is required'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(taxIdentitySchema),
    defaultValues: {
      taxName: '',
      taxId: '',
      taxClass: '',
    },
  });

  const onGetPaymentDetailsSuccess = (res) => {
    if (res) {
      if (res?.tax_user_type?.length > 0) {
        setTaxUserType(res?.tax_user_type);
      }
      if (res.tax_identification?.legal_name?.length > 0) {
        setValue('taxName', res.tax_identification?.legal_name);
      }
      if (res.tax_identification?.federal_tax_classification?.length > 0) {
        setValue('taxClass', {
          label: 'Individual',
          value: res.tax_identification?.federal_tax_classification,
        });
      }
      if (res.tax_identification?.social_security_number?.length > 0 && taxUserType === 'US') {
        setValue('taxId', res.tax_identification?.social_security_number);
      }
      if (res.tax_identification?.national_taxpayer_number?.length > 0 && taxUserType === 'NON_US') {
        setValue('taxId', res.tax_identification?.national_taxpayer_number);
      }
    }
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
    if (location?.state?.isEditing) {
      navigate('/dashboard');
    } else {
      setAccountCreatedModal(true);
    }
  };

  const onSuccess = () => {
    setStep(3);
  };

  const onSkipClick = () => {
    if (location?.state?.isEditing) {
      navigate('/dashboard');
    } else {
      dispatch(saveCheckpointComplete(onComplete, onComplete));
    }
  };
  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const onSubmit = (data) => {
    const taxDetails = {
      tax_identification: {
        is_us_person: taxUserType === 'US',
        legal_name: data?.taxName,
        federal_tax_classification: data?.taxClass?.value,
        social_security_number: selectedTaxId === 'taxOption1' ? data?.taxId : '',
        employee_identification_number: selectedTaxId === 'taxOption2' ? data?.taxId : '',
        national_taxpayer_number: taxUserType === 'NON_US' ? data?.taxId : '',
      },
    };

    const updatedData = {
      talent_info: {
        ...taxDetails,
      },
    };

    dispatch(updatePaymentDetails(updatedData, onSuccess));
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
              <Col className="d-flex gap-50">
                <Input
                  type="radio"
                  checked={taxUserType === 'NON_US'}
                  disabled={taxUserType === 'US'}
                  name="non_us_person"
                />
                <div>I am not a US person</div>
              </Col>
              <Col className="d-flex gap-50">
                <Input
                  type="radio"
                  checked={taxUserType === 'US'}
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
                      placeholder="Provide same name as shown on your tax return"
                      invalid={errors.taxName && true}
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
                      isLoading={false}
                      options={taxClassificationOptions}
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
            {/* {taxUserType === 'NON_US' ? (
              <div className="d-flex w-75">
                <Col className="d-flex gap-50">
                  <Input
                    type="radio"
                    checked={selectedTaxId === 'taxOption1'}
                    name="taxOption1"
                    onChange={handleTaxIdSelect}
                  />
                  <div className="w-75">
                    {taxUserType === 'NON_US' ? 'National Taxpayer number (NSN)' : 'Social Security number (SSN)'}
                  </div>
                </Col>
                <Col className="d-flex gap-50">
                  <Input
                    type="radio"
                    checked={selectedTaxId === 'taxOption2'}
                    name="taxOption2"
                    onChange={handleTaxIdSelect}
                  />
                  <div>Employee identification number (EIN)</div>
                </Col>
              </div>
            ) : null} */}
            <Row className="mt-1 mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="taxId">
                  {taxUserType === 'NON_US' ? 'NSN #' : 'SSN #'}
                  <span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="taxId"
                  name="taxId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={taxUserType === 'NON_US' ? 'Enter NSN #' : 'Enter SSN #'}
                      invalid={errors.taxId && true}
                    />
                  )}
                />
                {errors.taxId && <FormFeedback>{errors.taxId.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>

        {taxUserType === 'US' ? (
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
                <Label className="fs-5">Sign On :-</Label>
                <Col className="d-flex gap-50 mt-1 mb-1">
                  <Input type="checkbox" name="checkbox1" checked={confirmSign.checkbox1} onChange={handleSignCheck} />
                  <Label className="fs-6">
                    I consent to provide an electronic signature by clicking on the above ‘I confirm’ button.
                  </Label>
                </Col>
                <Col className="d-flex gap-50 mt-1 mb-1">
                  <Input type="checkbox" name="checkbox2" checked={confirmSign.checkbox2} onChange={handleSignCheck} />
                  <Label className="fs-6">I consent to receive tax documents digitaly.</Label>
                </Col>
                <Button
                  color="primary"
                  onClick={() => setIsDocumentConfirmed(true)}
                  className="mt-1 mb-1"
                  style={{ width: '120px' }}
                  disabled={isDocumentConfirmed}
                >
                  {isDocumentConfirmed ? 'Confirmed' : 'I Confirm'}
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
                taxUserType === 'NON_US'
                  ? false
                  : !confirmSign.checkbox1 || !confirmSign.checkbox2 || !isDocumentConfirmed
              }
            >
              {paymentDetailsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">
                    {taxUserType === 'US'
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
